import { CosmosClient } from '@azure/cosmos';

// Cosmos DB configuration
const cosmosConfig = {
  endpoint: import.meta.env.VITE_COSMOS_ENDPOINT || '',
  key: import.meta.env.VITE_COSMOS_KEY || '',
  databaseId: import.meta.env.VITE_COSMOS_DATABASE || 'portfoliodb',
  containerId: import.meta.env.VITE_COSMOS_CONTAINER || 'availability',
};

// Availability rules interface
export interface AvailabilityRules {
  id: string;
  timezone: string;
  workingHours: {
    start: number; // Hour in 24h format (e.g., 6 for 6 AM)
    end: number;   // Hour in 24h format (e.g., 20 for 8 PM)
  };
  workingDays: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  manualOverride?: {
    enabled: boolean;
    status: 'online' | 'offline';
    until?: string; // ISO date string
  };
}

// Default availability rules
const defaultRules: AvailabilityRules = {
  id: 'availability-config',
  timezone: 'Asia/Kolkata', // IST
  workingHours: {
    start: 6,  // 6 AM
    end: 20,   // 8 PM
  },
  workingDays: [0, 1, 2, 3, 4, 5, 6], // Monday to Sunday (all days)
  manualOverride: {
    enabled: false,
    status: 'online',
  },
};

// Cosmos DB client (singleton)
let cosmosClient: CosmosClient | null = null;

const getCosmosClient = (): CosmosClient => {
  if (!cosmosClient && cosmosConfig.endpoint && cosmosConfig.key) {
    cosmosClient = new CosmosClient({
      endpoint: cosmosConfig.endpoint,
      key: cosmosConfig.key,
    });
  }
  return cosmosClient!;
};

// Fetch availability rules from Cosmos DB
export const getAvailabilityRules = async (): Promise<AvailabilityRules> => {
  try {
    if (!cosmosConfig.endpoint || !cosmosConfig.key) {
      console.log('Cosmos DB not configured, using default rules');
      return defaultRules;
    }

    const client = getCosmosClient();
    const container = client
      .database(cosmosConfig.databaseId)
      .container(cosmosConfig.containerId);

    const { resource } = await container.item('availability-config', 'availability-config').read<AvailabilityRules>();
    
    if (resource) {
      return resource;
    }

    // If no rules exist, create default rules
    await container.items.create(defaultRules);
    return defaultRules;
  } catch (error) {
    console.error('Error fetching availability rules:', error);
    return defaultRules;
  }
};

// Update availability rules in Cosmos DB
export const updateAvailabilityRules = async (
  rules: Partial<AvailabilityRules>
): Promise<AvailabilityRules> => {
  try {
    if (!cosmosConfig.endpoint || !cosmosConfig.key) {
      throw new Error('Cosmos DB not configured');
    }

    const client = getCosmosClient();
    const container = client
      .database(cosmosConfig.databaseId)
      .container(cosmosConfig.containerId);

    const currentRules = await getAvailabilityRules();
    const updatedRules = { ...currentRules, ...rules };

    const { resource } = await container
      .item('availability-config', 'availability-config')
      .replace(updatedRules);

    return resource!;
  } catch (error) {
    console.error('Error updating availability rules:', error);
    throw error;
  }
};

// Check if currently available based on rules
export const checkAvailability = async (): Promise<{
  isAvailable: boolean;
  status: string;
  color: string;
}> => {
  try {
    const rules = await getAvailabilityRules();

    // Check manual override first
    if (rules.manualOverride?.enabled) {
      const until = rules.manualOverride.until ? new Date(rules.manualOverride.until) : null;
      const now = new Date();

      // If override is still active
      if (!until || now < until) {
        const isOnline = rules.manualOverride.status === 'online';
        return {
          isAvailable: isOnline,
          status: isOnline ? 'Available' : 'Offline',
          color: isOnline ? '#22c55e' : '#6b7280',
        };
      }
    }

    // Get current time in IST
    const now = new Date();
    const istTime = new Date(
      now.toLocaleString('en-US', { timeZone: rules.timezone })
    );

    const currentHour = istTime.getHours();
    const currentDay = istTime.getDay();

    // Check if within working hours and working days
    const isWorkingDay = rules.workingDays.includes(currentDay);
    const isWorkingHour =
      currentHour >= rules.workingHours.start &&
      currentHour < rules.workingHours.end;

    const isAvailable = isWorkingDay && isWorkingHour;

    return {
      isAvailable,
      status: isAvailable ? 'Available' : 'Offline',
      color: isAvailable ? '#22c55e' : '#6b7280',
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    // Default to offline on error
    return {
      isAvailable: false,
      status: 'Offline',
      color: '#6b7280',
    };
  }
};

// Client-side time-based check (lightweight, no Cosmos DB call)
export const checkAvailabilityLocal = (): {
  isAvailable: boolean;
  status: string;
  color: string;
} => {
  try {
    // Get current time in IST (Asia/Kolkata)
    const now = new Date();
    const istTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    );

    const currentHour = istTime.getHours();
    const currentDay = istTime.getDay();

    // Working hours: 6 AM to 8 PM (Mon-Sun)
    const isWorkingDay = true; // All days (0-6)
    const isWorkingHour = currentHour >= 6 && currentHour < 20;

    const isAvailable = isWorkingDay && isWorkingHour;

    return {
      isAvailable,
      status: isAvailable ? 'Available' : 'Offline',
      color: isAvailable ? '#22c55e' : '#6b7280',
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    return {
      isAvailable: false,
      status: 'Offline',
      color: '#6b7280',
    };
  }
};
