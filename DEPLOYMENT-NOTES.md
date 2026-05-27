# Azure Deployment Notes

## Deployment Information

**Deployed:** May 21, 2026  
**Environment:** Azure Linux App Service  
**URL:** https://techportfolio-app.azurewebsites.net

## Azure Resources

- **Resource Group:** `portfoliowebapp-rg`
- **App Service Plan:** `portfoliowebapp-linux-plan` (B1 tier, South India)
- **Web App:** `techportfolio-app`
- **Runtime:** NODE|22-lts (Node.js 22.22.2)

## Key Configuration

### Startup Command
```bash
PORT=8080 node server.js
```

**Why PORT=8080?** Azure App Service expects Node.js apps to listen on port 8080. The startup command explicitly sets this environment variable before starting the server.

### Build Process
The deployment uses **Azure Oryx build system** which automatically:
1. Detects Node.js application from `package.json`
2. Runs `npm install` to install dependencies (2 minutes)
3. Compresses `node_modules` for faster container startup
4. Copies files to `/home/site/wwwroot`

**Important:** Do NOT include `npm install` or `npm ci` in the startup command when using ZIP deployment - Oryx handles this during the build phase.

### Managed Identity & Security

**System-Assigned Managed Identity:**
- **Principal ID:** `a1811fb1-f7dc-48dd-ba7c-caa08ed85e25`
- **Tenant ID:** `19f975b7-59ac-4487-baad-c52496d31d91`

**Key Vault Access:**
```bash
az keyvault set-policy \
  --name jenilkeyvault \
  --object-id a1811fb1-f7dc-48dd-ba7c-caa08ed85e25 \
  --secret-permissions get list
```

**Secrets in Key Vault:**
- `CosmosDbEndpoint` - Cosmos DB account endpoint URL
- `CosmosDbKey` - Cosmos DB master key

### Application Settings

The following environment variables are set:
```
NODE_ENV=production
```

**Note:** App settings like `WEBSITES_PORT`, `SCM_DO_BUILD_DURING_DEPLOYMENT`, etc. were returning `null` when set via Azure CLI. The PORT configuration via startup command works reliably.

## Deployment Process

### Method: ZIP Deployment

```bash
# 1. Build React frontend
npm run build

# 2. Create deployment package (without node_modules - Oryx will install)
Compress-Archive -Path deploy-package\* -DestinationPath techportfolio-deploy.zip

# 3. Deploy to Azure
az webapp deploy \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app \
  --src-path techportfolio-deploy.zip \
  --type zip
```

### What Gets Deployed

```
/home/site/wwwroot/
├── package.json          # Dependencies manifest
├── package-lock.json     # Lock file for deterministic installs
├── server.js             # Express server (unified frontend + API)
├── dist/                 # Vite build output (React SPA)
│   ├── index.html
│   └── assets/
│       ├── index-*.css   # Compiled CSS with hash
│       └── index-*.js    # JavaScript bundle (606 KB)
└── node_modules/         # Installed by Oryx during build (126 packages)
```

## Application Architecture

### Backend (Express.js)
- **Port:** 8080 (required by Azure)
- **Static Files:** Serves React SPA from `/dist` folder
- **API Endpoints:**
  - `GET /api/health` - Health check with Cosmos DB status
  - `GET /api/availability/status` - Current availability status
  - `GET /api/availability/rules` - Working hours configuration
  - `PATCH /api/availability` - Update manual override
- **Catch-All Route:** `GET /*` → Serves `index.html` for client-side routing

### Frontend (React + Vite)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5.4.8
- **Bundle Size:** 606 KB (JavaScript), 6.33 KB (CSS)
- **Routing:** Client-side (SPA pattern)

### Database (Cosmos DB)
- **Connection:** Via managed identity + Key Vault secrets
- **Authentication:** `DefaultAzureCredential` (no hardcoded keys)
- **Database:** `portfoliodb`
- **Container:** `availability`
- **Initialization:** Background process after HTTP server starts (non-blocking)

## Startup Flow

1. **Container Start** - Azure pulls Node.js 22-lts image
2. **Oryx Build** - Installs dependencies (if not cached, ~2 minutes)
3. **Node.js Start** - Runs `PORT=8080 node server.js`
4. **HTTP Server** - Binds to port 8080 immediately
5. **Warmup Probe** - Azure pings the app (succeeds in ~42 seconds)
6. **Cosmos DB Init** - Background initialization after server is ready
7. **Site Running** - Application becomes available

**Critical:** The server starts immediately and responds to health checks even if Cosmos DB initialization fails. This prevents startup timeouts.

## Troubleshooting

### Deployment Failures

**Issue:** Container timeout after 230 seconds  
**Cause:** App not binding to port 8080 or taking too long to start  
**Fix:** Ensure `PORT=8080` is set in startup command

**Issue:** `npm install` timeout during startup  
**Cause:** Running npm in startup command conflicts with Oryx build  
**Fix:** Remove npm commands from startup - let Oryx handle dependencies

**Issue:** ES module import errors  
**Cause:** Missing node_modules directory  
**Fix:** Use ZIP deployment which triggers Oryx build automatically

### Viewing Logs

```bash
# Download logs
az webapp log download \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app \
  --log-file app-logs.zip

# Stream logs (real-time)
az webapp log tail \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app
```

### Restart Application

```bash
az webapp restart \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app
```

## Testing Endpoints

```bash
# Health check
curl https://techportfolio-app.azurewebsites.net/api/health

# Availability status
curl https://techportfolio-app.azurewebsites.net/api/availability/status

# Frontend
curl https://techportfolio-app.azurewebsites.net/
```

## Known Issues & Solutions

### 1. App Settings Returning Null
When using `az webapp config appsettings set`, some settings return `"value": null`. This appears to be an Azure CLI issue. **Workaround:** Set critical configs via startup command instead.

### 2. Large Bundle Size Warning
Vite warns about 606 KB JavaScript bundle exceeding 500 KB recommendation. **Solution:** Consider code-splitting with dynamic imports for better performance (not blocking).

### 3. Startup Command Persistence
Startup command must be set via `az webapp config set --startup-file` NOT via app settings. The command persists across restarts.

## Performance Notes

- **Build Time:** ~3 minutes (Oryx build + npm install)
- **Startup Time:** ~42 seconds (warmup probe success)
- **First Request:** May take 2-3 seconds due to cold start
- **Subsequent Requests:** < 100ms

## Security Best Practices

✅ **Managed Identity** - No credentials in code or environment variables  
✅ **Key Vault** - Secrets stored securely and rotated independently  
✅ **HTTPS Only** - Azure enforces TLS 1.2+ for all connections  
✅ **CORS Configured** - Express server has CORS middleware enabled  
✅ **No Direct Key Access** - Cosmos DB key retrieved at runtime via Key Vault

## Future Improvements

1. **GitHub Actions CI/CD** - Automate deployments on git push
2. **Application Insights** - Add telemetry and monitoring
3. **Custom Domain** - Configure custom domain with SSL
4. **Scaling** - Configure auto-scaling rules for traffic spikes
5. **Code Splitting** - Reduce bundle size with dynamic imports
6. **Health Check Path** - Configure explicit health check endpoint in Azure settings

## Useful Commands

```bash
# View current configuration
az webapp config show \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app

# List app settings
az webapp config appsettings list \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app

# Check deployment history
az webapp deployment list \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app

# View managed identity details
az webapp identity show \
  --resource-group portfoliowebapp-rg \
  --name techportfolio-app
```

## Support Resources

- **Azure App Service Docs:** https://docs.microsoft.com/azure/app-service/
- **Oryx Build System:** https://github.com/Microsoft/Oryx
- **Node.js on Azure:** https://docs.microsoft.com/azure/app-service/configure-language-nodejs

---

**Last Updated:** May 21, 2026  
**Deployment Version:** 58506c6b-d09e-4006-a53e-2934c7912168
