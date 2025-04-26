
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from './AuthContext';

export type TicketStatus = 'Open' | 'In Progress' | 'Review' | 'Done';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Comment {
  id: string;
  ticketId: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: User | null;
  reporter: User;
  createdAt: string;
  updatedAt: string;
  aiSuggestion?: string;
  comments: Comment[];
}

interface TicketContextType {
  tickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  addComment: (ticketId: string, content: string, author: User) => void;
  isLoading: boolean;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Mock data for initial state
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
  {
    id: '2',
    name: 'Dev User',
    email: 'dev@example.com',
    role: 'Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Developer',
  },
  {
    id: '3',
    name: 'Test User',
    email: 'test@example.com',
    role: 'Tester',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tester',
  },
];

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'API Integration Error',
    description: 'The authentication service is failing to connect with the API gateway.',
    status: 'Open',
    priority: 'High',
    assignee: mockUsers[1],
    reporter: mockUsers[2],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    aiSuggestion: 'This appears to be a critical infrastructure issue. Consider elevating priority.',
    comments: [
      {
        id: 'c1',
        ticketId: '1',
        content: 'I\'ve investigated this and it seems to be a configuration issue with the API gateway.',
        author: mockUsers[1],
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      },
    ],
  },
  {
    id: '2',
    title: 'Dashboard Rendering Bug',
    description: 'The metrics on the DevOps dashboard are not rendering correctly on Firefox.',
    status: 'In Progress',
    priority: 'Medium',
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    comments: [
      {
        id: 'c2',
        ticketId: '2',
        content: 'I can reproduce this issue. Working on a fix now.',
        author: mockUsers[1],
        createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      },
    ],
  },
  {
    id: '3',
    title: 'Add Role-Based Access Controls',
    description: 'Implement RBAC for the ticket management system.',
    status: 'Review',
    priority: 'Medium',
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    comments: [
      {
        id: 'c3',
        ticketId: '3',
        content: 'PR is ready for review. I\'ve implemented the role-based access controls using JWT claims.',
        author: mockUsers[1],
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
    ],
  },
  {
    id: '4',
    title: 'CI Pipeline Failing on Tests',
    description: 'The CI pipeline is failing when running integration tests.',
    status: 'Open',
    priority: 'Critical',
    assignee: null,
    reporter: mockUsers[2],
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    aiSuggestion: 'This is blocking deployments. Recommend immediate attention.',
    comments: [],
  },
];

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with delay
    const fetchTickets = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTickets(mockTickets);
      setIsLoading(false);
    };

    fetchTickets();
  }, []);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    const now = new Date().toISOString();
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
      comments: [],
      // Simulate AI suggestion based on title and description
      aiSuggestion: ticketData.title.toLowerCase().includes('error') || 
                   ticketData.description.toLowerCase().includes('failing') ? 
                   'AI suggests this may be a high priority issue based on keywords.' : undefined
    };

    setTickets(prev => [newTicket, ...prev]);
    toast.success('Ticket created successfully');
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === id) {
        return { 
          ...ticket, 
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    }));
    toast.success('Ticket updated');
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
    toast.success('Ticket deleted');
  };

  const addComment = (ticketId: string, content: string, author: User) => {
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      ticketId,
      content,
      author,
      createdAt: new Date().toISOString()
    };
    
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          updatedAt: new Date().toISOString(),
          comments: [...ticket.comments, comment]
        };
      }
      return ticket;
    }));
    
    toast.success('Comment added');
  };

  return (
    <TicketContext.Provider 
      value={{ 
        tickets, 
        createTicket, 
        updateTicket, 
        deleteTicket, 
        addComment, 
        isLoading 
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
