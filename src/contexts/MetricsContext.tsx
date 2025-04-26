
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number; // in ms
  lastDeployment: string; // ISO date string
  version: string;
  uptime: number; // percentage
}

interface DeploymentEvent {
  id: string;
  service: string;
  version: string;
  timestamp: string; // ISO date string
  status: 'success' | 'failed' | 'in-progress';
  duration: number; // in seconds
}

interface CostMetric {
  service: string;
  daily: number;
  weekly: number;
  monthly: number;
  trend: 'up' | 'down' | 'stable';
}

interface MetricsContextType {
  serviceStatuses: ServiceStatus[];
  deployments: DeploymentEvent[];
  costMetrics: CostMetric[];
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

// Mock data
const mockServiceStatuses: ServiceStatus[] = [
  {
    name: 'Auth Service',
    status: 'healthy',
    responseTime: 45,
    lastDeployment: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    version: '1.2.0',
    uptime: 99.98,
  },
  {
    name: 'Ticket Service',
    status: 'healthy',
    responseTime: 62,
    lastDeployment: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    version: '2.1.5',
    uptime: 99.95,
  },
  {
    name: 'AI Engine',
    status: 'degraded',
    responseTime: 235,
    lastDeployment: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
    version: '0.9.2',
    uptime: 98.76,
  },
  {
    name: 'Notifier Service',
    status: 'healthy',
    responseTime: 38,
    lastDeployment: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    version: '1.0.4',
    uptime: 99.99,
  },
  {
    name: 'Kafka Broker',
    status: 'healthy',
    responseTime: 15,
    lastDeployment: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    version: '3.2.1',
    uptime: 99.995,
  },
];

const mockDeployments: DeploymentEvent[] = [
  {
    id: 'd1',
    service: 'AI Engine',
    version: '0.9.2',
    timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
    status: 'success',
    duration: 145,
  },
  {
    id: 'd2',
    service: 'Ticket Service',
    version: '2.1.5',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: 'success',
    duration: 112,
  },
  {
    id: 'd3',
    service: 'Auth Service',
    version: '1.2.0',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    status: 'success',
    duration: 98,
  },
  {
    id: 'd4',
    service: 'CI Pipeline',
    version: '1.1.0',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    status: 'failed',
    duration: 67,
  },
  {
    id: 'd5',
    service: 'AI Engine',
    version: '0.9.1',
    timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
    status: 'success',
    duration: 132,
  },
];

const mockCostMetrics: CostMetric[] = [
  {
    service: 'Auth Service',
    daily: 4.23,
    weekly: 29.61,
    monthly: 127.45,
    trend: 'stable',
  },
  {
    service: 'Ticket Service',
    daily: 5.87,
    weekly: 41.09,
    monthly: 176.10,
    trend: 'up',
  },
  {
    service: 'AI Engine',
    daily: 12.45,
    weekly: 87.15,
    monthly: 373.50,
    trend: 'up',
  },
  {
    service: 'Notifier Service',
    daily: 1.98,
    weekly: 13.86,
    monthly: 59.40,
    trend: 'down',
  },
  {
    service: 'Infrastructure',
    daily: 15.32,
    weekly: 107.24,
    monthly: 459.60,
    trend: 'stable',
  },
];

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([]);
  const [deployments, setDeployments] = useState<DeploymentEvent[]>([]);
  const [costMetrics, setCostMetrics] = useState<CostMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setServiceStatuses(mockServiceStatuses);
    setDeployments(mockDeployments);
    setCostMetrics(mockCostMetrics);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    await fetchData();
  };

  return (
    <MetricsContext.Provider 
      value={{ 
        serviceStatuses, 
        deployments, 
        costMetrics, 
        refreshData, 
        isLoading 
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (context === undefined) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};
