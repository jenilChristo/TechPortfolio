# Microsoft Teams Presence Integration Setup

This guide explains how to set up Microsoft Graph API integration to show your real Teams presence status on your portfolio.

## Prerequisites

- Microsoft 365 account (jenilchristo@outlook.com)
- Access to Azure Portal

## Step 1: Create Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **+ New registration**
4. Fill in the details:
   - **Name**: `Portfolio Website - Presence`
   - **Supported account types**: Select **"Accounts in any organizational directory and personal Microsoft accounts"**
   - **Redirect URI**: 
     - Platform: **Single-page application (SPA)**
     - URI: `http://localhost:5173` (for local development)
5. Click **Register**

## Step 2: Configure Redirect URIs

After registration:

1. Go to **Authentication** in the left menu
2. Under **Single-page application** section, add these redirect URIs:
   - `http://localhost:5173`
   - `https://jenilchristo.com`
   - `https://www.jenilchristo.com`
   - `https://portfoliowebapp-cbfkbjfvd5dgh0cs.azurewebsites.net`
3. Under **Implicit grant and hybrid flows**, ensure nothing is checked (SPA uses PKCE flow)
4. Click **Save**

## Step 3: Configure API Permissions

1. Go to **API permissions** in the left menu
2. Click **+ Add a permission**
3. Select **Microsoft Graph** → **Delegated permissions**
4. Add these permissions:
   - `User.Read` (should already be added)
   - `Presence.Read`
5. Click **Add permissions**
6. **Optional**: Click **Grant admin consent** (if you have admin rights) - this will prevent the consent prompt for users

## Step 4: Get Your Application (Client) ID

1. Go to **Overview** in the left menu
2. Copy the **Application (client) ID** (it's a GUID like `12345678-1234-1234-1234-123456789abc`)

## Step 5: Update Your Environment Variables

1. Open the `.env` file in your project root
2. Replace `your-client-id-here` with your actual client ID:

```env
VITE_AZURE_CLIENT_ID=12345678-1234-1234-1234-123456789abc
```

3. Save the file

## Step 6: Restart Development Server

```bash
# Stop the current dev server (Ctrl+C)
# Start it again to load the new environment variable
npm run dev
```

## How It Works

Once configured:

1. **First Visit**: The app will try to silently authenticate in the background
2. **If Needed**: A popup may appear asking you to sign in with your Microsoft account
3. **Automatic Updates**: Your presence status will update every 60 seconds
4. **Status Colors**:
   - 🟢 **Green**: Available
   - 🟡 **Yellow**: Away / Be Right Back
   - 🔴 **Red**: Busy / Do Not Disturb
   - ⚪ **Gray**: Offline / Unknown

## Testing

1. Open your portfolio in the browser
2. Sign in to Microsoft Teams on another device/browser
3. Change your Teams status
4. Wait up to 60 seconds and refresh your portfolio to see the status update

## Privacy & Security

- **Authentication**: Uses Microsoft's secure OAuth 2.0 flow with PKCE
- **Permissions**: Only reads your presence status, not messages or other data
- **Token Storage**: Access tokens are stored in browser's localStorage
- **No Server**: All authentication happens client-side (no backend needed)

## Troubleshooting

### Issue: "AADSTS700016: Application not found"
- **Solution**: Make sure you copied the correct Client ID from Azure Portal

### Issue: "AADSTS50011: The reply URL does not match"
- **Solution**: Ensure all redirect URIs are added in Azure AD app registration

### Issue: Status shows "Offline"
- **Solution**: 
  - Make sure you're signed in to Teams
  - Check that API permissions include `Presence.Read`
  - Open browser console (F12) to check for errors
  - Try signing in manually by clicking the profile photo

### Issue: Silent authentication not working
- **Solution**: This is normal for first-time users. The app won't force a popup on page load to avoid disrupting the user experience.

## Deployment

When deploying to Azure:

1. Make sure to add the Azure Web App URL to the redirect URIs in Azure AD
2. Set the environment variable in Azure App Service:
   ```bash
   az webapp config appsettings set \
     --resource-group portfoliowebapp-rg \
     --name portfoliowebapp-cbfkbjfvd5dgh0cs \
     --settings VITE_AZURE_CLIENT_ID=your-client-id-here
   ```
3. Rebuild and redeploy the app (environment variables are baked into the build)

## Manual Sign-In (Optional)

If you want to add a manual "Connect to Teams" button later, you can import and use the `login()` function from `graphService.ts`.
