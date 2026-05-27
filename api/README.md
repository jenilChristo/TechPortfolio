# Portfolio Backend API

Backend Node.js service for the portfolio website that handles availability status and secure access to Cosmos DB.

## Features

- ✅ **Secure Key Management**: Uses Azure Key Vault with Managed Identity
- ✅ **Availability API**: Returns online/offline status based on working hours
- ✅ **Cosmos DB Integration**: Reads availability rules from Cosmos DB
- ✅ **Manual Override**: Supports temporary status overrides
- ✅ **CORS Enabled**: Allows frontend access from any origin

## API Endpoints

### GET `/api/health`
Health check endpoint to verify service status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-21T14:00:00.000Z",
  "cosmosInitialized": true
}
```

### GET `/api/availability/status`
Get current availability status based on working hours.

**Response:**
```json
{
  "isAvailable": true,
  "status": "Available",
  "color": "#22c55e",
  "source": "working-hours",
  "workingHours": {
    "start": 6,
    "end": 20
  },
  "timezone": "Asia/Kolkata",
  "timestamp": "2026-05-21T14:00:00.000Z"
}
```

### GET `/api/availability/rules`
Get availability configuration rules from Cosmos DB.

**Response:**
```json
{
  "id": "availability-config",
  "timezone": "Asia/Kolkata",
  "workingHours": {
    "start": 6,
    "end": 20
  },
  "workingDays": [0, 1, 2, 3, 4, 5, 6],
  "manualOverride": {
    "enabled": false,
    "status": "online",
    "until": null
  }
}
```

### POST `/api/availability/override`
Update manual override settings (admin only).

**Request Body:**
```json
{
  "enabled": true,
  "status": "offline",
  "until": "2026-05-22T00:00:00.000Z"
}
```

## Local Development

1. **Install Dependencies:**
   ```bash
   cd api
   npm install
   ```

2. **Configure Environment:**
   Create `.env` file:
   ```env
   KEY_VAULT_NAME=jenilkeyvault
   NODE_ENV=development
   COSMOS_ENDPOINT=your-cosmos-endpoint
   COSMOS_KEY=your-cosmos-key
   PORT=3001
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```

4. **Test Endpoints:**
   ```bash
   curl http://localhost:3001/api/health
   curl http://localhost:3001/api/availability/status
   ```

## Azure Deployment

### Prerequisites
- ✅ Azure Key Vault with secrets: `CosmosDbKey`, `CosmosDbEndpoint`, `AzureClientId`
- ✅ App Service with System-Assigned Managed Identity enabled
- ✅ Key Vault access policy granted to App Service

### App Service Configuration

Set these application settings:
```bash
az webapp config appsettings set \
  --resource-group portfoliowebapp-rg \
  --name portfoliowebapp-cbfkbjfvd5dgh0cs \
  --settings KEY_VAULT_NAME=jenilkeyvault \
             NODE_ENV=production
```

### Deploy
```bash
cd api
zip -r ../api-deploy.zip .
az webapp deploy \
  --resource-group portfoliowebapp-rg \
  --name portfoliowebapp-cbfkbjfvd5dgh0cs \
  --src-path ../api-deploy.zip \
  --type zip
```

## Architecture

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────┐
│  Portfolio Website  │
│   (React/Vite)      │
└──────┬──────────────┘
       │ API Calls
       ▼
┌─────────────────────┐       ┌──────────────┐
│   Node.js API       │◄──────┤  Key Vault   │
│   (Express)         │       │  (Secrets)   │
└──────┬──────────────┘       └──────────────┘
       │
       │ SDK
       ▼
┌─────────────────────┐
│   Cosmos DB         │
│   (availability)    │
└─────────────────────┘
```

## Security

- **No Secrets in Frontend**: All sensitive keys stored in Azure Key Vault
- **Managed Identity**: App Service uses system-assigned identity
- **CORS**: Configure allowed origins for production
- **HTTPS Only**: All traffic encrypted

## Working Hours

Default configuration:
- **Days**: Monday - Sunday (all days)
- **Hours**: 6:00 AM - 8:00 PM IST
- **Timezone**: Asia/Kolkata

## Status Colors

- 🟢 **Available** (#22c55e): Within working hours
- ⚪ **Offline** (#6b7280): Outside working hours

## License

MIT
