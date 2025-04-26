
import React from 'react';
import { 
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DeploymentEvent {
  id: string;
  service: string;
  version: string;
  timestamp: string; // ISO date string
  status: 'success' | 'failed' | 'in-progress';
  duration: number; // in seconds
}

interface DeploymentHistoryProps {
  deployments: DeploymentEvent[];
  className?: string;
}

const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ deployments, className }) => {
  const getStatusIcon = (status: DeploymentEvent['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="text-green-500" size={18} />;
      case 'failed':
        return <XCircle className="text-red-500" size={18} />;
      case 'in-progress':
        return <Clock className="text-amber-500" size={18} />;
      default:
        return null;
    }
  };
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Recent Deployments</CardTitle>
        <CardDescription>Latest service deployments across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="flex items-start">
              <div className="mt-1 mr-4">{getStatusIcon(deployment.status)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">
                    {deployment.service} <span className="text-muted-foreground">v{deployment.version}</span>
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(deployment.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Deployment took {deployment.duration} seconds
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentHistory;
