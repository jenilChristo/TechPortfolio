import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID || 'YOUR_CLIENT_ID', // Will be set in .env
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const loginRequest = {
  scopes: ['User.Read', 'Presence.Read'],
};

let msalInstance: PublicClientApplication | null = null;

// Initialize MSAL instance
const getMsalInstance = async (): Promise<PublicClientApplication> => {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
    await msalInstance.initialize();
  }
  return msalInstance;
};

// Get access token
const getAccessToken = async (): Promise<string | null> => {
  try {
    const msal = await getMsalInstance();
    const accounts = msal.getAllAccounts();

    if (accounts.length === 0) {
      // No accounts, try silent login first
      try {
        const response = await msal.ssoSilent(loginRequest);
        return response.accessToken;
      } catch (ssoError) {
        // Silent SSO failed, return null (don't force popup on page load)
        console.log('Silent SSO not available');
        return null;
      }
    }

    // Account exists, try to get token silently
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    try {
      const response = await msal.acquireTokenSilent(request);
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // Token expired, try to refresh silently
        try {
          const response = await msal.acquireTokenPopup(request);
          return response.accessToken;
        } catch (popupError) {
          console.error('Token acquisition failed:', popupError);
          return null;
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Login (can be called manually if needed)
export const login = async (): Promise<boolean> => {
  try {
    const msal = await getMsalInstance();
    await msal.loginPopup(loginRequest);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

// Get user presence from Microsoft Graph
export const getUserPresence = async (): Promise<{
  availability: string;
  activity: string;
} | null> => {
  try {
    const accessToken = await getAccessToken();
    
    if (!accessToken) {
      console.log('No access token available for presence');
      return null;
    }

    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const presence = await client.api('/me/presence').get();
    
    return {
      availability: presence.availability,
      activity: presence.activity,
    };
  } catch (error) {
    console.error('Error fetching presence:', error);
    return null;
  }
};

// Map Microsoft Graph presence to status and color
export const mapPresenceToStatus = (
  availability?: string,
  activity?: string
): { color: string; status: string } => {
  if (!availability) {
    return { color: '#6b7280', status: 'Offline' }; // Gray
  }

  switch (availability.toLowerCase()) {
    case 'available':
      return { color: '#22c55e', status: 'Available' }; // Green
    case 'availableidle':
      return { color: '#eab308', status: 'Away' }; // Yellow
    case 'away':
    case 'beright back':
      return { color: '#eab308', status: 'Away' }; // Yellow
    case 'busy':
    case 'donotdisturb':
      return { color: '#ef4444', status: 'Busy' }; // Red
    case 'busyidle':
      return { color: '#f97316', status: 'Busy (Idle)' }; // Orange
    case 'offline':
    case 'presenceunknown':
      return { color: '#6b7280', status: 'Offline' }; // Gray
    default:
      return { color: '#6b7280', status: 'Unknown' }; // Gray
  }
};
