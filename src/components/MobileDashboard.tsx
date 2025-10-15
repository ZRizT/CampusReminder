import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Calendar, Clock, BookOpen, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { MobileHeader } from './MobileHeader';

interface MobileDashboardProps {
  onNotificationClick: () => void;
}

export function MobileDashboard({ onNotificationClick }: MobileDashboardProps) {
  const stats = {
    totalTasks: 12,
    completedTasks: 8,
    upcomingDeadlines: 3,
    activeGroups: 4
  };

  const upcomingTasks = [
    {
      id: 1,
      title: "Tugas Algoritma",
      subject: "Algoritma & Struktur Data",
      deadline: "2024-09-25",
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      title: "Essay Bahasa Inggris",
      subject: "Academic English",
      deadline: "2024-09-27",
      priority: "medium",
      status: "pending"
    }
  ];

  const completionRate = (stats.completedTasks / stats.totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader onNotificationClick={onNotificationClick} />
      
      <div className="p-4 space-y-4">
        {/* Welcome Section */}
        <div className="text-center py-4">
          <h2 className="text-xl font-semibold text-gray-900">Selamat Datang! 👋</h2>
          <p className="text-sm text-gray-600 mt-1">
            Berikut ringkasan tugas dan jadwal kuliah Anda
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.totalTasks}</div>
              <p className="text-xs text-gray-600">Total Tugas</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.completedTasks}</div>
              <p className="text-xs text-gray-600">Selesai</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.upcomingDeadlines}</div>
              <p className="text-xs text-gray-600">Deadline Dekat</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">{stats.activeGroups}</div>
              <p className="text-xs text-gray-600">Grup Aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Progress Semester</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Rate</span>
                <span className="font-medium">{completionRate.toFixed(0)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="flex justify-between text-sm pt-2">
              <div className="text-center">
                <div className="text-lg font-bold text-accent">{stats.completedTasks}</div>
                <p className="text-xs text-gray-600">Selesai</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-500">{stats.totalTasks - stats.completedTasks}</div>
                <p className="text-xs text-gray-600">Tersisa</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tugas Mendatang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : 'default'}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-1">{task.subject}</p>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">{task.deadline}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}