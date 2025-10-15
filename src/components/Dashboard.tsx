import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Calendar, Clock, BookOpen, Users, AlertTriangle } from "lucide-react";

export function Dashboard() {
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
    },
    {
      id: 3,
      title: "Lab Report",
      subject: "Praktikum Fisika",
      deadline: "2024-09-30",
      priority: "low",
      status: "in-progress"
    }
  ];

  const stats = {
    totalTasks: 12,
    completedTasks: 8,
    upcomingDeadlines: 3,
    activeGroups: 4
  };

  const completionRate = (stats.completedTasks / stats.totalTasks) * 100;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali! Berikut ringkasan tugas dan jadwal kuliah Anda.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Tugas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              Semester ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Selesai</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate.toFixed(0)}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Deadline Mendekat</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.upcomingDeadlines}</div>
            <p className="text-xs text-muted-foreground">
              3 hari ke depan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Grup Kelas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.activeGroups}</div>
            <p className="text-xs text-muted-foreground">
              Grup aktif
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Tugas Mendatang</CardTitle>
            <CardDescription>
              Tugas dengan deadline terdekat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.subject}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs">{task.deadline}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge 
                    variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {task.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {task.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Semester</CardTitle>
            <CardDescription>
              Statistik penyelesaian tugas Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Rate</span>
                <span>{completionRate.toFixed(0)}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl text-accent">{stats.completedTasks}</div>
                <p className="text-xs text-muted-foreground">Selesai</p>
              </div>
              <div className="text-center">
                <div className="text-2xl" style={{color: '#FF8A00'}}>{stats.totalTasks - stats.completedTasks}</div>
                <p className="text-xs text-muted-foreground">Belum Selesai</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Reminder Aktif</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Mode Intensif - Notifikasi tiap 3 jam</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}