
import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}) => {
  const renderTrendIndicator = () => {
    if (!trend) return null;

    const colors = {
      up: 'text-green-500',
      down: 'text-red-500',
      stable: 'text-amber-500',
    };

    const icons = {
      up: <ArrowUp size={14} />,
      down: <ArrowDown size={14} />,
      stable: <Minus size={14} />,
    };

    return (
      <div className={cn('flex items-center text-sm font-medium', colors[trend])}>
        <span className="mr-1">{icons[trend]}</span>
        <span>{trendValue}</span>
      </div>
    );
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-2">
          {description && (
            <CardDescription className="truncate">{description}</CardDescription>
          )}
          {renderTrendIndicator()}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
