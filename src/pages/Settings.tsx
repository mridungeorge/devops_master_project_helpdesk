
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';

const Settings: React.FC = () => {
  return (
    <Layout title="Settings">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue="Admin User" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@example.com" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for the application.
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Compact View</h3>
                  <p className="text-sm text-muted-foreground">
                    Use a more compact UI layout.
                  </p>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about different events.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-tickets" className="flex-1">
                      Ticket assignments
                    </Label>
                    <Switch id="email-tickets" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-comments" className="flex-1">
                      Comments on your tickets
                    </Label>
                    <Switch id="email-comments" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-deployments" className="flex-1">
                      Deployment status changes
                    </Label>
                    <Switch id="email-deployments" defaultChecked={true} />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">System Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-tickets" className="flex-1">
                      Ticket status changes
                    </Label>
                    <Switch id="system-tickets" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-alerts" className="flex-1">
                      System alerts and warnings
                    </Label>
                    <Switch id="system-alerts" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-costs" className="flex-1">
                      Cost threshold alerts
                    </Label>
                    <Switch id="system-costs" defaultChecked={false} />
                  </div>
                </div>
              </div>
              
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
              <CardDescription>
                Connect with external services and tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">GitHub Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with GitHub repositories.
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">AWS CloudWatch</h3>
                    <p className="text-sm text-muted-foreground">
                      Import metrics from AWS CloudWatch.
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Slack Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Send notifications to Slack channels.
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Jenkins CI</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with Jenkins for CI/CD information.
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>
                Manage API keys for integrating with the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Read-Only API Key</h3>
                    <p className="text-sm text-muted-foreground">
                      For retrieving data from the platform.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input value="••••••••••••••••" readOnly className="max-w-[200px]" />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Full Access API Key</h3>
                    <p className="text-sm text-muted-foreground">
                      For complete platform access (use with caution).
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Input value="••••••••••••••••" readOnly className="max-w-[200px]" />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                
                <Separator />
                
                <Button>Generate New API Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Settings;
