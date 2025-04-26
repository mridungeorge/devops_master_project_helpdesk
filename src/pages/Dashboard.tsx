
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import { useMetrics } from '@/contexts/MetricsContext';
import { useTickets } from '@/contexts/TicketContext';
import Layout from '@/components/layout/Layout';
import StatusCard from '@/components/dashboard/StatusCard';
import ServiceStatusTable from '@/components/dashboard/ServiceStatusTable';
import DeploymentHistory from '@/components/dashboard/DeploymentHistory';
import CostOverview from '@/components/dashboard/CostOverview';
import TicketList from '@/components/tickets/TicketList';

const Dashboard: React.FC = () => {
  const { serviceStatuses, deployments, costMetrics, refreshData, isLoading } = useMetrics();
  const { tickets } = useTickets();
  
  const totalServices = serviceStatuses.length;
  const healthyServices = serviceStatuses.filter(s => s.status === 'healthy').length;
  const averageResponseTime = Math.round(
    serviceStatuses.reduce((sum, service) => sum + service.responseTime, 0) / totalServices
  );
  const averageUptime = (
    serviceStatuses.reduce((sum, service) => sum + service.uptime, 0) / totalServices
  ).toFixed(2);
  
  const recentTickets = tickets.slice(0, 5);
  
  return (
    <Layout title="Dashboard">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => refreshData()}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Service Health"
          value={`${healthyServices}/${totalServices}`}
          description={`${(healthyServices / totalServices * 100).toFixed(0)}% services healthy`}
          trend={healthyServices === totalServices ? 'up' : 'down'}
          trendValue={healthyServices === totalServices ? 'All Healthy' : 'Issues Detected'}
        />
        <StatusCard
          title="Avg. Response Time"
          value={`${averageResponseTime}ms`}
          description="Across all services"
          trend={averageResponseTime < 100 ? 'up' : averageResponseTime < 200 ? 'stable' : 'down'}
          trendValue={averageResponseTime < 100 ? 'Excellent' : averageResponseTime < 200 ? 'Good' : 'Slow'}
        />
        <StatusCard
          title="System Uptime"
          value={`${averageUptime}%`}
          description="Last 30 days"
          trend={Number(averageUptime) > 99.9 ? 'up' : Number(averageUptime) > 99 ? 'stable' : 'down'}
          trendValue={Number(averageUptime) > 99.9 ? 'Excellent' : Number(averageUptime) > 99 ? 'Good' : 'Needs Attention'}
        />
        <StatusCard
          title="Open Issues"
          value={tickets.filter(t => t.status === 'Open').length}
          description="Active tickets"
          trend={tickets.filter(t => t.status === 'Open').length < 3 ? 'up' : 'down'}
          trendValue={tickets.filter(t => t.status === 'Open').length < 3 ? 'Low' : 'High'}
        />
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Service Status</CardTitle>
                  <CardDescription>Current status of microservices</CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceStatusTable services={serviceStatuses} />
                </CardContent>
              </Card>
              
              <DeploymentHistory deployments={deployments} />
            </div>
            
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tickets</CardTitle>
                  <CardDescription>Latest issues and feature requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <TicketList tickets={recentTickets} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Service Health Dashboard</CardTitle>
                <CardDescription>Detailed status of all microservices</CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceStatusTable services={serviceStatuses} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="costs">
            <CostOverview costMetrics={costMetrics} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
