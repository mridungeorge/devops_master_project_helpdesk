
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTickets } from '@/contexts/TicketContext';
import { useAuth, User } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import TicketDetails from '@/components/tickets/TicketDetails';
import TicketForm, { TicketFormData } from '@/components/tickets/TicketForm';

const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets, updateTicket, addComment } = useTickets();
  const { user } = useAuth();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Find the ticket with the matching ID
  const ticket = tickets.find(t => t.id === id);

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

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleEditTicket = (formData: TicketFormData) => {
    if (!ticket || !user) return;
    
    // Find the assignee user object based on the ID
    const assignee = formData.assigneeId 
      ? mockUsers.find(u => u.id === formData.assigneeId) || null 
      : null;
    
    updateTicket(ticket.id, {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      assignee: assignee,
    });
    
    setIsEditFormOpen(false);
  };

  const handleBack = () => {
    navigate('/tickets');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center py-10">
          <div className="text-muted-foreground">Loading ticket details...</div>
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-10">
          <div className="text-xl font-medium mb-4">Ticket not found</div>
          <Button variant="outline" onClick={handleBack} className="gap-2">
            <ArrowLeft size={16} /> Back to Tickets
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Ticket: ${ticket.title}`}>
      <div className="mb-8">
        <Button variant="outline" onClick={handleBack} className="gap-2">
          <ArrowLeft size={16} /> Back to Tickets
        </Button>
      </div>
      
      <TicketDetails
        ticket={ticket}
        currentUser={user!}
        onAddComment={addComment}
        onEditClick={() => setIsEditFormOpen(true)}
      />
      
      {user && (
        <TicketForm
          open={isEditFormOpen}
          onOpenChange={setIsEditFormOpen}
          onSubmit={handleEditTicket}
          users={mockUsers}
          currentUser={user}
          initialValues={{
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            assigneeId: ticket.assignee?.id || null,
            reporter: ticket.reporter,
          }}
          isEdit={true}
        />
      )}
    </Layout>
  );
};

export default TicketDetailPage;
