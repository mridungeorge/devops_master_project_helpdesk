
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Ticket } from '@/contexts/TicketContext';
import { useTicketFilters } from '@/hooks/useTicketFilters';
import TicketTableRow from './TicketTableRow';
import TablePagination from '../common/TablePagination';

interface TicketListProps {
  tickets: Ticket[];
  onView?: (ticket: Ticket) => void;
}

const ITEMS_PER_PAGE = 10;

const TicketList: React.FC<TicketListProps> = ({ tickets, onView }) => {
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    handleSort,
    filteredTickets,
    currentPage,
    setCurrentPage,
  } = useTicketFilters(tickets);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleViewTicket = (ticket: Ticket) => {
    if (onView) {
      onView(ticket);
    } else {
      navigate(`/tickets/${ticket.id}`);
    }
  };

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = filteredTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('title')}
                >
                  Title
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('status')}
                >
                  Status
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('priority')}
                >
                  Priority
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('assignee')}
                >
                  Assigned To
                </button>
              </TableHead>
              <TableHead>
                <button
                  className="flex items-center gap-1"
                  onClick={() => handleSort('createdAt')}
                >
                  Created
                </button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No tickets found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTickets.map((ticket) => (
                <TicketTableRow
                  key={ticket.id}
                  ticket={ticket}
                  onView={handleViewTicket}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filteredTickets.length > ITEMS_PER_PAGE && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TicketList;
