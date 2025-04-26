
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Edit, MessageSquare } from 'lucide-react';
import { Ticket, Comment as CommentType, TicketPriority, TicketStatus } from '@/contexts/TicketContext';
import { User } from '@/contexts/AuthContext';

interface TicketDetailsProps {
  ticket: Ticket;
  currentUser: User;
  onAddComment: (ticketId: string, content: string, author: User) => void;
  onEditClick: () => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({
  ticket,
  currentUser,
  onAddComment,
  onEditClick,
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(ticket.id, commentText, currentUser);
      setCommentText('');
    }
  };

  const getPriorityBadgeVariant = (priority: TicketPriority) => {
    switch (priority) {
      case 'Low': return 'outline';
      case 'Medium': return 'secondary';
      case 'High': return 'default';
      case 'Critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: TicketStatus) => {
    switch (status) {
      case 'Open': return 'outline';
      case 'In Progress': return 'secondary';
      case 'Review': return 'default';
      case 'Done': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{ticket.title}</h2>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <span>Created {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</span>
            <span className="mx-2">•</span>
            <span>Last updated {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
          </div>
        </div>
        <Button variant="outline" onClick={onEditClick} className="gap-2">
          <Edit size={16} /> Edit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{ticket.description}</p>
            </CardContent>
          </Card>

          {ticket.aiSuggestion && (
            <Card className="mt-6 border-purple-200 bg-purple-50">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2 text-purple-800">
                  <AlertCircle size={16} />
                  AI Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-800">{ticket.aiSuggestion}</p>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Comments ({ticket.comments.length})</h3>
            </div>

            {ticket.comments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No comments yet. Be the first to add one.
              </div>
            ) : (
              <div className="space-y-6">
                {ticket.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            )}

            <div className="mt-6">
              <form onSubmit={handleSubmitComment}>
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-24"
                />
                <div className="flex justify-end mt-2">
                  <Button type="submit" disabled={!commentText.trim()} className="gap-2">
                    <MessageSquare size={16} /> Add Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="mt-1">
                    <Badge variant={getStatusBadgeVariant(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Priority</div>
                  <div className="mt-1">
                    <Badge variant={getPriorityBadgeVariant(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-muted-foreground">Assignee</div>
                  <div className="mt-1 flex items-center">
                    {ticket.assignee ? (
                      <>
                        <img
                          src={ticket.assignee.avatar}
                          alt={ticket.assignee.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                        <span className="font-medium">{ticket.assignee.name}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Reporter</div>
                  <div className="mt-1 flex items-center">
                    <img
                      src={ticket.reporter.avatar}
                      alt={ticket.reporter.name}
                      className="h-6 w-6 rounded-full mr-2"
                    />
                    <span className="font-medium">{ticket.reporter.name}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div className="mt-1">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Last Updated</div>
                  <div className="mt-1">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface CommentItemProps {
  comment: CommentType;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="h-8 w-8 rounded-full mr-3"
          />
          <div>
            <div className="font-medium">{comment.author.name}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm">
        <p className="whitespace-pre-wrap">{comment.content}</p>
      </div>
    </div>
  );
};

export default TicketDetails;
