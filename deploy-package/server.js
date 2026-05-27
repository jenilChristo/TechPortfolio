import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { CosmosClient } from '@azure/cosmos';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Azure Key Vault configuration
const keyVaultName = process.env.KEY_VAULT_NAME || 'jenilkeyvault';
const keyVaultUrl = `https://${keyVaultName}.vault.azure.net`;

// Initialize Azure clients
let cosmosClient = null;
let container = null;

// Initialize Key Vault client with managed identity
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUrl, credential);

// Initialize Cosmos DB client
async function initializeCosmosClient() {
  try {
    // Get secrets from Key Vault
    const cosmosEndpointSecret = await secretClient.getSecret('CosmosDbEndpoint');
    const cosmosKeySecret = await secretClient.getSecret('CosmosDbKey');

    const cosmosEndpoint = cosmosEndpointSecret.value;
    const cosmosKey = cosmosKeySecret.value;

    console.log('✓ Retrieved secrets from Key Vault');

    // Initialize Cosmos DB client
    cosmosClient = new CosmosClient({
      endpoint: cosmosEndpoint,
      key: cosmosKey,
    });

    const database = cosmosClient.database('portfoliodb');
    container = database.container('availability');

    console.log('✓ Cosmos DB client initialized');
  } catch (error) {
    console.error('Error initializing Cosmos DB client:', error.message);
    // In development, fallback to environment variables
    if (process.env.NODE_ENV === 'development') {
      console.log('Falling back to environment variables for development...');
      cosmosClient = new CosmosClient({
        endpoint: process.env.COSMOS_ENDPOINT,
        key: process.env.COSMOS_KEY,
      });
      const database = cosmosClient.database('portfoliodb');
      container = database.container('availability');
      console.log('✓ Cosmos DB client initialized (development mode)');
    }
  }
}

// Check if currently within working hours
function checkWorkingHours(rules) {
  const now = new Date();
  const istTime = new Date(
    now.toLocaleString('en-US', { timeZone: rules.timezone || 'Asia/Kolkata' })
  );

  const currentHour = istTime.getHours();
  const currentDay = istTime.getDay();

  // Check if within working hours and working days
  const isWorkingDay = rules.workingDays.includes(currentDay);
  const isWorkingHour =
    currentHour >= rules.workingHours.start &&
    currentHour < rules.workingHours.end;

  return isWorkingDay && isWorkingHour;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    cosmosInitialized: container !== null,
  });
});

// Get availability status endpoint
app.get('/api/availability/status', async (req, res) => {
  try {
    if (!container) {
      // Fallback: return based on time calculation only
      const now = new Date();
      const istTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );
      const currentHour = istTime.getHours();
      const isAvailable = currentHour >= 6 && currentHour < 20;

      return res.json({
        isAvailable,
        status: isAvailable ? 'Available' : 'Offline',
        color: isAvailable ? '#22c55e' : '#6b7280',
        source: 'time-based-fallback',
        timestamp: new Date().toISOString(),
      });
    }

    // Get availability rules from Cosmos DB
    const { resource: rules } = await container
      .item('availability-config', 'availability-config')
      .read();

    if (!rules) {
      return res.status(404).json({ error: 'Availability rules not found' });
    }

    // Check manual override first
    if (rules.manualOverride?.enabled) {
      const until = rules.manualOverride.until
        ? new Date(rules.manualOverride.until)
        : null;
      const now = new Date();

      // If override is still active
      if (!until || now < until) {
        const isOnline = rules.manualOverride.status === 'online';
        return res.json({
          isAvailable: isOnline,
          status: isOnline ? 'Available' : 'Offline',
          color: isOnline ? '#22c55e' : '#6b7280',
          source: 'manual-override',
          overrideUntil: until ? until.toISOString() : null,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Check working hours
    const isAvailable = checkWorkingHours(rules);

    res.json({
      isAvailable,
      status: isAvailable ? 'Available' : 'Offline',
      color: isAvailable ? '#22c55e' : '#6b7280',
      source: 'working-hours',
      workingHours: rules.workingHours,
      timezone: rules.timezone,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error getting availability status:', error);
    res.status(500).json({ error: 'Failed to get availability status' });
  }
});

// Get availability rules endpoint
app.get('/api/availability/rules', async (req, res) => {
  try {
    if (!container) {
      return res.status(503).json({ error: 'Cosmos DB not initialized' });
    }

    const { resource: rules } = await container
      .item('availability-config', 'availability-config')
      .read();

    if (!rules) {
      return res.status(404).json({ error: 'Availability rules not found' });
    }

    res.json(rules);
  } catch (error) {
    console.error('Error getting availability rules:', error);
    res.status(500).json({ error: 'Failed to get availability rules' });
  }
});

// Update manual override endpoint (optional - for admin use)
app.post('/api/availability/override', async (req, res) => {
  try {
    if (!container) {
      return res.status(503).json({ error: 'Cosmos DB not initialized' });
    }

    const { enabled, status, until } = req.body;

    // Get current rules
    const { resource: currentRules } = await container
      .item('availability-config', 'availability-config')
      .read();

    if (!currentRules) {
      return res.status(404).json({ error: 'Availability rules not found' });
    }

    // Update manual override
    currentRules.manualOverride = {
      enabled: enabled !== undefined ? enabled : currentRules.manualOverride.enabled,
      status: status || currentRules.manualOverride.status,
      until: until || null,
    };
    currentRules.lastUpdated = new Date().toISOString();

    // Replace in Cosmos DB
    const { resource: updatedRules } = await container
      .item('availability-config', 'availability-config')
      .replace(currentRules);

    res.json({
      message: 'Manual override updated',
      rules: updatedRules,
    });
  } catch (error) {
    console.error('Error updating manual override:', error);
    res.status(500).json({ error: 'Failed to update manual override' });
  }
});

// Serve static files from React build (production only)
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, 'dist');
  app.use(express.static(distPath));
  
  // Serve index.html for all non-API routes (SPA routing)
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

// Start server immediately, initialize Cosmos DB in background
app.listen(PORT, () => {
  console.log(`\n✓ Portfolio API server running on port ${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health`);
  console.log(`  Status: http://localhost:${PORT}/api/availability/status`);
  console.log(`  Rules:  http://localhost:${PORT}/api/availability/rules\n`);
  
  // Initialize Cosmos DB in background after server is ready
  initializeCosmosClient().catch(error => {
    console.error('⚠ Warning: Cosmos DB initialization failed:', error.message);
    console.error('   API will continue running but database operations will fail');
  });
});
