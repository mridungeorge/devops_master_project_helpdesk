
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User } from './AuthContext';
import { mockTickets } from './mockData';
import { Ticket, TicketContextType } from './types';

export * from './types';

const TicketContext = createContext<TicketContextType | undefined>(undefined);

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
