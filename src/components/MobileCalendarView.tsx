import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MobileHeader } from './MobileHeader';

interface Task {
  id: number;
  title: string;
  deadline?: string;
  time?: string;
  location?: string;
  subject?: string;
  type: 'task' | 'schedule';
  status: 'completed' | 'pending' | 'upcoming';
}

interface MobileCalendarViewProps {
  onAddTask: () => void;
  onNotificationClick: () => void;
}

export function MobileCalendarView({ onAddTask, onNotificationClick }: MobileCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(20);
  
  const tasks: Task[] = [
    {
      id: 1,
      title: "Tugas Akhir Mata Kuliah X",
      deadline: "25 Nov 2024",
      subject: "Bab 1 & 2",
      type: 'task',
      status: 'completed'
    },
    {
      id: 2,
      title: "Matematika Diskrit",
      time: "09:00 - 10:40",
      location: "Ruang A101",
      type: 'schedule',
      status: 'upcoming'
    },
    {
      id: 3,
      title: "Matematika Diskrit",
      time: "09:00 - 10:40", 
      location: "Ruang A101",
      type: 'schedule',
      status: 'upcoming'
    }
  ];

  const generateCalendarDays = () => {
    const days = [];
    const today = 20;
    
    // Generate days for November 2024
    for (let i = 1; i <= 30; i++) {
      const isToday = i === today;
      const isSelected = i === selectedDate;
      const hasEvent = [4, 11, 19, 25].includes(i);
      
      days.push(
        <button
          key={i}
          onClick={() => setSelectedDate(i)}
          className={`
            w-8 h-8 text-sm rounded-full flex items-center justify-center relative
            ${isSelected ? 'bg-accent text-white' : ''}
            ${isToday && !isSelected ? 'bg-accent/20 text-accent' : ''}
            ${!isToday && !isSelected ? 'hover:bg-gray-100' : ''}
          `}
        >
          {i}
          {hasEvent && (
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-orange-500 rounded-full" />
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader onNotificationClick={onNotificationClick} />
      
      <div className="p-4 space-y-4">
        {/* Calendar Widget */}
        <Card>
          <CardContent className="p-4">
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-500 font-medium">20 Nov</span>
                <div className="bg-accent text-white px-2 py-1 rounded text-xs">
                  20 Nov
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 mb-2">
                <div className="text-center">SU</div>
                <div className="text-center">M</div>
                <div className="text-center">T</div>
                <div className="text-center">W</div>
                <div className="text-center">T</div>
                <div className="text-center">F</div>
                <div className="text-center">SA</div>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for the start of month */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                
                {generateCalendarDays()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Section */}
        <div>
          <h2 className="text-lg font-semibold text-primary mb-3">Task</h2>
          
          <div className="space-y-3">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className={`p-4 ${
                  task.status === 'completed' ? 'bg-accent/10' : 
                  task.type === 'schedule' ? 'bg-orange-100' : 'bg-gray-50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      task.status === 'completed' ? 'bg-accent' : 
                      task.type === 'schedule' ? 'bg-orange-500' : 'bg-gray-400'
                    }`}>
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <Clock className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      {task.deadline && (
                        <p className="text-sm text-gray-600">
                          Deadline: {task.deadline} • {task.subject}
                        </p>
                      )}
                      {task.time && (
                        <p className="text-sm text-gray-600">
                          Hari ini, {task.time} • {task.location}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={onAddTask}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg"
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>
    </div>
  );
}