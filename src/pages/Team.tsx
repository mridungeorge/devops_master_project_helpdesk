
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  department: string;
  ticketsAssigned: number;
  ticketsCompleted: number;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Admin User',
    role: 'Admin',
    email: 'admin@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    department: 'Engineering',
    ticketsAssigned: 12,
    ticketsCompleted: 8,
  },
  {
    id: '2',
    name: 'Dev User',
    role: 'Developer',
    email: 'dev@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Developer',
    department: 'Engineering',
    ticketsAssigned: 24,
    ticketsCompleted: 21,
  },
  {
    id: '3',
    name: 'Test User',
    role: 'Tester',
    email: 'test@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tester',
    department: 'QA',
    ticketsAssigned: 18,
    ticketsCompleted: 15,
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    role: 'Developer',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    department: 'Engineering',
    ticketsAssigned: 31,
    ticketsCompleted: 27,
  },
  {
    id: '5',
    name: 'Michael Chen',
    role: 'DevOps',
    email: 'michael@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    department: 'Infrastructure',
    ticketsAssigned: 15,
    ticketsCompleted: 13,
  },
  {
    id: '6',
    name: 'Emily Rodriguez',
    role: 'Tester',
    email: 'emily@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    department: 'QA',
    ticketsAssigned: 22,
    ticketsCompleted: 19,
  },
];

const Team: React.FC = () => {
  return (
    <Layout title="Team">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Team</h1>
        <p className="text-muted-foreground mt-2">
          Manage your team and their access to the platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{member.role}</Badge>
                <Badge variant="secondary">{member.department}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col items-center py-3">
                <div className="relative mb-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.email}</p>
              </div>
            </CardContent>
            
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <div className="w-full flex justify-between">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Assigned</p>
                  <p className="text-lg font-semibold">{member.ticketsAssigned}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-lg font-semibold">{member.ticketsCompleted}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Rate</p>
                  <p className="text-lg font-semibold">
                    {Math.round((member.ticketsCompleted / member.ticketsAssigned) * 100)}%
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Team;
