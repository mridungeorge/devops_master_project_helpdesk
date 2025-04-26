
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

export interface TicketContextType {
  tickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  addComment: (ticketId: string, content: string, author: User) => void;
  isLoading: boolean;
}
