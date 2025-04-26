
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import TicketList from '@/components/tickets/TicketList';
import TicketForm, { TicketFormData } from '@/components/tickets/TicketForm';
import { useTickets, Ticket } from '@/contexts/TicketContext';
import { useAuth, User } from '@/contexts/AuthContext';

const Tickets: React.FC = () => {
  const { tickets, createTicket, isLoading } = useTickets();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  // Mock users for the form
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

  const handleCreateTicket = (formData: TicketFormData) => {
    // Find the assignee user object based on the ID
    const assignee = formData.assigneeId 
      ? mockUsers.find(u => u.id === formData.assigneeId) || null 
      : null;
    
    createTicket({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      assignee: assignee,
      reporter: formData.reporter,
    });
    
    setIsFormOpen(false);
  };

  const handleViewTicket = (ticket: Ticket) => {
    navigate(`/tickets/${ticket.id}`);
  };

  return (
    <Layout title="Tickets">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Tickets</h1>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <PlusCircle size={16} /> New Ticket
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="text-muted-foreground">Loading tickets...</div>
        </div>
      ) : (
        <TicketList tickets={tickets} onView={handleViewTicket} />
      )}
      
      {user && (
        <TicketForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleCreateTicket}
          users={mockUsers}
          currentUser={user}
        />
      )}
    </Layout>
  );
};

export default Tickets;
