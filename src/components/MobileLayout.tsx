import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, CheckCircle, Clock, Plus, Bell, Users, Menu } from "lucide-react";
import { Task } from "../types";
import logoImage from 'figma:asset/8f2af9fabd80a047bf63ddfd3bf157046fbd89da.png';

interface MobileLayoutProps {
  tasks: Task[];
  onAddTask: () => void;
  onOpenGroups: () => void;
}

export function MobileLayout({ tasks, onAddTask, onOpenGroups }: MobileLayoutProps) {
  const [currentDate] = useState(new Date());
  
  // Generate calendar for current month
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  const hasTask = (day: number | null) => {
    if (!day) return false;
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return tasks.some(task => 
      task.deadline.toDateString() === dayDate.toDateString()
    );
  };

  const getTaskColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const weekDays = ['SU', 'M', 'T', 'T', 'W', 'T', 'F', 'SA'];
  const calendarDays = generateCalendar();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Kampus Reminder</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenGroups}
            className="text-white hover:bg-white/20"
          >
            <Users className="h-6 w-6" />
          </Button>
          <Bell className="h-6 w-6" style={{color: '#FF8A00'}} />
        </div>
      </div>

      {/* Calendar Section */}
      <div className="p-4 bg-white">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-center mb-4">
            {currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </h2>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Week days header */}
            {weekDays.map((day, index) => (
              <div 
                key={day} 
                className={`p-2 text-xs font-semibold ${
                  index === 0 ? 'text-orange-500' : 'text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div key={index} className="relative">
                {day && (
                  <div 
                    className={`p-2 text-sm relative ${
                      isToday(day) 
                        ? 'bg-accent text-white rounded-full font-semibold' 
                        : hasTask(day)
                        ? 'text-orange-500 font-semibold'
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                    {hasTask(day) && !isToday(day) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Today's highlight */}
        <div className="bg-accent text-white px-3 py-1 rounded-full text-center text-sm font-semibold inline-block">
          {formatDate(new Date())}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 pb-2">
        <div className="grid grid-cols-4 gap-3 mb-6">
          <Button 
            variant="outline" 
            className="flex flex-col items-center gap-1 h-auto py-3"
            onClick={onOpenGroups}
          >
            <Users className="h-5 w-5 text-accent" />
            <span className="text-xs">Grup</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="text-xs">Jadwal</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3">
            <Bell className="h-5 w-5 text-orange-500" />
            <span className="text-xs">Notif</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex flex-col items-center gap-1 h-auto py-3"
            onClick={onAddTask}
          >
            <Plus className="h-5 w-5 text-green-500" />
            <span className="text-xs">Tugas</span>
          </Button>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold text-primary mb-4">Task</h3>
        
        <div className="space-y-3">
          {/* Group Activity Notification */}
          <Card className="border-accent/30 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-accent mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-accent mb-1">Aktivitas Grup</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ahmad Rizki membagikan tugas "Binary Search" di grup ASD2024
                  </p>
                  <Button size="sm" variant="outline" onClick={onOpenGroups}>
                    Lihat Grup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {tasks.slice(0, 3).map((task, index) => (
            <Card key={task.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className={`p-4 ${
                    task.status === 'completed' 
                      ? 'bg-accent/20' 
                      : index % 2 === 0 
                      ? 'bg-orange-100' 
                      : 'bg-orange-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {task.status === 'completed' ? (
                        <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                      ) : (
                        <Clock className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                      )}
                      
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${
                          task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {task.status === 'completed' 
                            ? `Deadline: ${formatDate(task.deadline)} • ${task.subject}`
                            : `Hari ini, 09:00 - 10:40 • ${task.subject}`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={onAddTask}
          className="w-14 h-14 rounded-full bg-accent hover:bg-accent/90 text-white shadow-lg"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}