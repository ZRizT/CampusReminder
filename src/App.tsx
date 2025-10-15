import { useState } from "react";
import { AuthScreen } from "./components/AuthScreen";
import { MobileLayout } from "./components/MobileLayout";
import { MobileGroupClass } from "./components/MobileGroupClass";
import { TaskForm } from "./components/TaskForm";
import { Dashboard } from "./components/Dashboard";
import { TaskList } from "./components/TaskList";
import { AcademicCalendar } from "./components/AcademicCalendar";
import { NotificationSettings } from "./components/NotificationSettings";
import { GroupClass } from "./components/GroupClass";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { LayoutDashboard, ClipboardList, Calendar, Bell, Users, Plus, GraduationCap, BookOpen, ArrowLeft } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { Task } from "./types";
import logoImage from 'figma:asset/8f2af9fabd80a047bf63ddfd3bf157046fbd89da.png';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [activeView, setActiveView] = useState("mobile-dashboard");
  const [isMobile, setIsMobile] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Tugas Akhir Mata Kuliah X",
      description: "Tugas akhir untuk mata kuliah X dengan deadline 25 November",
      subject: "Bab 1 & 2",
      deadline: new Date(2024, 10, 25), // November 25, 2024
      priority: "high",
      status: "completed",
      reminderSettings: { threeDays: true, oneDay: true, threeHours: true }
    },
    {
      id: 2,
      title: "Matematika Diskrit",
      description: "Kelas matematika diskrit hari ini",
      subject: "Ruang A101",
      deadline: new Date(), // Today
      priority: "medium",
      status: "pending",
      reminderSettings: { threeDays: true, oneDay: true, threeHours: false }
    },
    {
      id: 3,
      title: "Matematika Diskrit",
      description: "Kelas matematika diskrit hari ini",
      subject: "Ruang A101",
      deadline: new Date(), // Today
      priority: "medium",
      status: "pending",
      reminderSettings: { threeDays: true, oneDay: false, threeHours: false }
    }
  ]);

  const handleLogin = (email: string) => {
    setUser(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveView("mobile-dashboard");
  };

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now()
    };
    setTasks(prev => [...prev, task]);
    setActiveView("mobile-dashboard");
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      view: "dashboard"
    },
    {
      title: "Tugas",
      icon: ClipboardList,
      view: "tasks"
    },
    {
      title: "Kalender Akademik",
      icon: Calendar,
      view: "calendar"
    },
    {
      title: "Grup Kelas",
      icon: Users,
      view: "groups"
    },
    {
      title: "Notifikasi",
      icon: Bell,
      view: "notifications"
    }
  ];

  const AppSidebar = () => (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold flex items-center gap-2">
            <img src={logoImage} alt="Kampus Reminder" className="h-8 w-8 rounded-full" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Kampus Reminder
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.view}>
                  <SidebarMenuButton 
                    onClick={() => setActiveView(item.view)}
                    isActive={activeView === item.view}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveView("add-task")}>
                  <Plus className="h-4 w-4" />
                  <span>Tambah Tugas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  const renderMobileContent = () => {
    switch (activeView) {
      case "mobile-dashboard":
        return (
          <MobileLayout 
            tasks={tasks}
            onAddTask={() => setActiveView("add-task")}
            onOpenGroups={() => setActiveView("mobile-groups")}
          />
        );
      case "add-task":
        return (
          <div className="min-h-screen bg-background">
            <div className="bg-primary text-white p-4 flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveView("mobile-dashboard")}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold">Tambah Tugas</h1>
            </div>
            <div className="p-4">
              <TaskForm onSubmit={addTask} />
            </div>
          </div>
        );
      case "mobile-groups":
        return (
          <MobileGroupClass 
            onBack={() => setActiveView("mobile-dashboard")}
          />
        );
      default:
        return (
          <MobileLayout 
            tasks={tasks}
            onAddTask={() => setActiveView("add-task")}
            onOpenGroups={() => setActiveView("mobile-groups")}
          />
        );
    }
  };

  const renderDesktopContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return (
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">Daftar Tugas</TabsTrigger>
              <TabsTrigger value="add">Tambah Tugas</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <TaskList 
                tasks={tasks}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            </TabsContent>
            <TabsContent value="add">
              <TaskForm onSubmit={addTask} />
            </TabsContent>
          </Tabs>
        );
      case "add-task":
        return <TaskForm onSubmit={addTask} />;
      case "calendar":
        return <AcademicCalendar />;
      case "groups":
        return <GroupClass />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <Dashboard />;
    }
  };

  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      <>
        <AuthScreen onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Mobile-first layout
  if (isMobile || window.innerWidth < 768) {
    return (
      <>
        {renderMobileContent()}
        <Toaster />
      </>
    );
  }

  // Desktop layout (fallback)
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center gap-4 px-4">
                <SidebarTrigger />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <img src={logoImage} alt="Kampus Reminder" className="h-7 w-7 rounded-full" />
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-primary">Kampus</span>
                      <span className="font-semibold text-accent">Reminder</span>
                      <span className="text-muted-foreground">- Reminder Tugas Kuliah</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveView("add-task")}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Tugas Baru
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto py-6 px-4">
                {renderDesktopContent()}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
}