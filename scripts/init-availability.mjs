// Script to initialize availability configuration in Cosmos DB
import { CosmosClient } from '@azure/cosmos';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const cosmosConfig = {
  endpoint: process.env.VITE_COSMOS_ENDPOINT || '',
  key: process.env.VITE_COSMOS_KEY || '',
  databaseId: process.env.VITE_COSMOS_DATABASE || 'portfoliodb',
  containerId: process.env.VITE_COSMOS_CONTAINER || 'availability',
};

const defaultAvailabilityConfig = {
  id: 'availability-config',
  timezone: 'Asia/Kolkata', // IST
  workingHours: {
    start: 6,  // 6 AM
    end: 20,   // 8 PM
  },
  workingDays: [0, 1, 2, 3, 4, 5, 6], // All days (Sunday to Saturday)
  manualOverride: {
    enabled: false,
    status: 'online',
    until: null,
  },
  description: 'Availability: Monday to Sunday, 6 AM - 8 PM IST',
  lastUpdated: new Date().toISOString(),
};

async function initializeAvailability() {
  try {
    console.log('Connecting to Cosmos DB...');
    const client = new CosmosClient({
      endpoint: cosmosConfig.endpoint,
      key: cosmosConfig.key,
    });

    const container = client
      .database(cosmosConfig.databaseId)
      .container(cosmosConfig.containerId);

    console.log('Checking if availability config exists...');
    
    try {
      // Try to read existing config
      const { resource } = await container
        .item('availability-config', 'availability-config')
        .read();

      if (resource) {
        console.log('✓ Availability config already exists:');
        console.log(JSON.stringify(resource, null, 2));
        return;
      }
    } catch (error) {
      if (error.code === 404) {
        console.log('Config not found, creating new one...');
      } else {
        throw error;
      }
    }

    // Create new config
    console.log('Creating availability configuration...');
    const { resource: newConfig } = await container.items.create(
      defaultAvailabilityConfig
    );

    console.log('✓ Successfully created availability configuration:');
    console.log(JSON.stringify(newConfig, null, 2));
    console.log('\n✓ Setup complete!');
    console.log(`Working hours: ${defaultAvailabilityConfig.workingHours.start}:00 - ${defaultAvailabilityConfig.workingHours.end}:00 IST`);
    console.log('Working days: Monday - Sunday (all days)');
    console.log('\nStatus will show:');
    console.log('  🟢 Available - During working hours (6 AM - 8 PM IST)');
    console.log('  ⚪ Offline - Outside working hours');
  } catch (error) {
    console.error('✗ Error initializing availability:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeAvailability()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
