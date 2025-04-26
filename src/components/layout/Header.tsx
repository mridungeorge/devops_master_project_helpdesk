
import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard' }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b bg-background border-border">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        {/* Search bar */}
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10 w-64 bg-muted/30"
          />
        </div>
        
        {/* Action buttons */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell size={18} />
        </Button>
        
        <Button variant="ghost" size="icon" aria-label="Help">
          <HelpCircle size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
