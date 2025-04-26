
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ISO date string
  type: 'deployment' | 'ticket' | 'alert' | 'system';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'Deployment Failed',
    description: 'The deployment of Auth Service v1.3.0 has failed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    type: 'deployment',
    read: false,
  },
  {
    id: 'n2',
    title: 'New Ticket Assigned',
    description: 'You have been assigned to ticket #4: "CI Pipeline Failing on Tests".',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    type: 'ticket',
    read: false,
  },
  {
    id: 'n3',
    title: 'Infrastructure Cost Alert',
    description: 'AI Engine service cost has increased by 15% in the last 24 hours.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    type: 'alert',
    read: false,
  },
  {
    id: 'n4',
    title: 'Comment on Your Ticket',
    description: 'Dev User commented on "API Integration Error": "I\'ve investigated this..."',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    type: 'ticket',
    read: true,
  },
  {
    id: 'n5',
    title: 'Successful Deployment',
    description: 'Notifier Service v1.0.4 was successfully deployed to production.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(), // 1.5 days ago
    type: 'deployment',
    read: true,
  },
  {
    id: 'n6',
    title: 'System Maintenance',
    description: 'System maintenance scheduled for Sunday, 2am-4am UTC.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    type: 'system',
    read: true,
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deployment':
        return <div className="p-2 rounded-full bg-blue-100 text-blue-600"><Clock size={16} /></div>;
      case 'ticket':
        return <div className="p-2 rounded-full bg-purple-100 text-purple-600"><Bell size={16} /></div>;
      case 'alert':
        return <div className="p-2 rounded-full bg-red-100 text-red-600"><Bell size={16} /></div>;
      case 'system':
        return <div className="p-2 rounded-full bg-amber-100 text-amber-600"><Bell size={16} /></div>;
      default:
        return <div className="p-2 rounded-full bg-gray-100 text-gray-600"><Bell size={16} /></div>;
    }
  };
  
  const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    return (
      <div className={cn("flex gap-4 p-4 border-b", notification.read ? "opacity-75" : "")}>
        {getTypeIcon(notification.type)}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className={cn("font-medium", !notification.read && "font-semibold")}>{notification.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
            </div>
            <div className="flex gap-2">
              {!notification.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-2"
                  onClick={() => markAsRead(notification.id)}
                >
                  <Check size={16} />
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-red-500 hover:text-red-600"
                onClick={() => deleteNotification(notification.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Layout title="Notifications">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader className="pb-0">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="deployment">Deployments</TabsTrigger>
                <TabsTrigger value="ticket">Tickets</TabsTrigger>
                <TabsTrigger value="alert">Alerts</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <div className="divide-y">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No notifications found.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="unread">
              <div className="divide-y">
                {notifications.filter(n => !n.read).length > 0 ? (
                  notifications.filter(n => !n.read).map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No unread notifications.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="deployment">
              <div className="divide-y">
                {notifications.filter(n => n.type === 'deployment').length > 0 ? (
                  notifications.filter(n => n.type === 'deployment').map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No deployment notifications.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="ticket">
              <div className="divide-y">
                {notifications.filter(n => n.type === 'ticket').length > 0 ? (
                  notifications.filter(n => n.type === 'ticket').map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No ticket notifications.
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="alert">
              <div className="divide-y">
                {notifications.filter(n => n.type === 'alert').length > 0 ? (
                  notifications.filter(n => n.type === 'alert').map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    No alert notifications.
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default NotificationsPage;
