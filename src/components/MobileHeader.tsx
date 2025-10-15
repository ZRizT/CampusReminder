import { Bell } from 'lucide-react';
import { Button } from './ui/button';

interface MobileHeaderProps {
  title?: string;
  showNotification?: boolean;
  onNotificationClick?: () => void;
}

export function MobileHeader({ 
  title = "Kampus Reminder", 
  showNotification = true,
  onNotificationClick 
}: MobileHeaderProps) {
  return (
    <header className="bg-primary text-white px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      {showNotification && (
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 p-2"
          onClick={onNotificationClick}
        >
          <Bell className="h-5 w-5" style={{ color: '#FF8A00' }} />
        </Button>
      )}
    </header>
  );
}