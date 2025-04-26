
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { Ticket } from '@/contexts/TicketContext';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TicketTableRowProps {
  ticket: Ticket;
  onView: (ticket: Ticket) => void;
}

const TicketTableRow: React.FC<TicketTableRowProps> = ({ ticket, onView }) => {
  const getPriorityBadgeVariant = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'Low': return 'outline';
      case 'Medium': return 'secondary';
      case 'High': return 'default';
      case 'Critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: Ticket['status']) => {
    switch (status) {
      case 'Open': return 'outline';
      case 'In Progress': return 'secondary';
      case 'Review': return 'default';
      case 'Done': return 'default';
      default: return 'outline';
    }
  };

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onView(ticket)}
    >
      <TableCell>
        <div className="font-medium">{ticket.title}</div>
        <div className="text-sm text-muted-foreground truncate max-w-xs">
          {ticket.description}
        </div>
        {ticket.aiSuggestion && (
          <div className="mt-1">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              AI Suggestion
            </Badge>
          </div>
        )}
      </TableCell>
      <TableCell>
        <Badge variant={getStatusBadgeVariant(ticket.status)}>
          {ticket.status}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </TableCell>
      <TableCell>
        {ticket.assignee ? (
          <div className="flex items-center gap-2">
            <img
              src={ticket.assignee.avatar}
              alt={ticket.assignee.name}
              className="h-6 w-6 rounded-full"
            />
            <span>{ticket.assignee.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">Unassigned</span>
        )}
      </TableCell>
      <TableCell>
        {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onView(ticket);
            }}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TicketTableRow;
