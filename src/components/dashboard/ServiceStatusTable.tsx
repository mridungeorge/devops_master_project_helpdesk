
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  lastDeployment: string;
  version: string;
  uptime: number;
}

interface ServiceStatusTableProps {
  services: ServiceStatus[];
}

const ServiceStatusTable: React.FC<ServiceStatusTableProps> = ({ services }) => {
  const getStatusBadge = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle2 size={14} />
            Healthy
          </Badge>
        );
      case 'degraded':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <AlertCircle size={14} />
            Degraded
          </Badge>
        );
      case 'down':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle size={14} />
            Down
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Response Time</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Uptime</TableHead>
          <TableHead>Last Deployed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.name}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{getStatusBadge(service.status)}</TableCell>
            <TableCell>{service.responseTime} ms</TableCell>
            <TableCell>v{service.version}</TableCell>
            <TableCell>{service.uptime}%</TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(service.lastDeployment), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceStatusTable;
