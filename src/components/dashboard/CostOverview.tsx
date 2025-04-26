
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface CostMetric {
  service: string;
  daily: number;
  weekly: number;
  monthly: number;
  trend: 'up' | 'down' | 'stable';
}

interface CostOverviewProps {
  costMetrics: CostMetric[];
  className?: string;
}

// Generate some fake time series data for the chart
const generateTimeSeriesData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cost: 35 + Math.random() * 15 + (i > 15 ? 0 : i > 7 ? 5 : 10), // Trending upward
    });
  }
  
  return data;
};

const timeSeriesData = generateTimeSeriesData();

// Format data for the service breakdown chart
const prepareServiceBreakdown = (metrics: CostMetric[]) => {
  return metrics.map(metric => ({
    name: metric.service,
    cost: metric.daily
  }));
};

const CostOverview: React.FC<CostOverviewProps> = ({ costMetrics, className }) => {
  const totalDailyCost = costMetrics.reduce((sum, metric) => sum + metric.daily, 0).toFixed(2);
  const totalMonthlyCost = costMetrics.reduce((sum, metric) => sum + metric.monthly, 0).toFixed(2);
  
  const getTrendIcon = (trend: CostMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={14} className="text-red-500" />;
      case 'down':
        return <ArrowDown size={14} className="text-green-500" />;
      case 'stable':
        return <Minus size={14} className="text-amber-500" />;
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Cost Overview</CardTitle>
        <CardDescription>Cloud infrastructure cost monitoring</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-1">Daily Cost</div>
              <div className="text-2xl font-bold">${totalDailyCost}</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm font-medium text-muted-foreground mb-1">Monthly Projection</div>
              <div className="text-2xl font-bold">${totalMonthlyCost}</div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm font-medium mb-3">Cost Trend (Last 30 Days)</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    interval="preserveStartEnd"
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(value) => `$${value}`}
                    width={35}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Cost']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#2563eb" 
                    fillOpacity={1} 
                    fill="url(#costGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm font-medium mb-3">Service Breakdown</div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={prepareServiceBreakdown(costMetrics)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Daily Cost']} />
                  <Bar dataKey="cost" fill="#0d9488" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="text-sm font-medium mb-3">Service Cost Details</div>
            <div className="space-y-3">
              {costMetrics.map((metric) => (
                <div key={metric.service} className="flex items-center justify-between text-sm">
                  <div>{metric.service}</div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="font-medium">${metric.daily.toFixed(2)}/day</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostOverview;
