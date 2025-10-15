import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Clock, Search, Filter, MoreHorizontal, Edit, Trash2, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { format, differenceInDays, isPast } from "date-fns";
import { id } from "date-fns/locale";

interface Task {
  id: number;
  title: string;
  description: string;
  subject: string;
  deadline: Date;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  reminderSettings: {
    threeDays: boolean;
    oneDay: boolean;
    threeHours: boolean;
  };
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: number, updates: Partial<Task>) => void;
  onDeleteTask: (id: number) => void;
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleTaskStatus = (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : 
                     task.status === "pending" ? "in-progress" : "completed";
    onUpdateTask(task.id, { status: newStatus });
  };

  const getDeadlineInfo = (deadline: Date) => {
    const now = new Date();
    const daysLeft = differenceInDays(deadline, now);
    const isOverdue = isPast(deadline);

    if (isOverdue) {
      return { text: "Terlambat", color: "text-red-600", bgColor: "bg-red-50" };
    } else if (daysLeft === 0) {
      return { text: "Hari ini", color: "text-orange-600", bgColor: "bg-orange-50" };
    } else if (daysLeft === 1) {
      return { text: "Besok", color: "text-yellow-600", bgColor: "bg-yellow-50" };
    } else if (daysLeft <= 3) {
      return { text: `${daysLeft} hari lagi`, color: "text-orange-600", bgColor: "bg-orange-50" };
    } else {
      return { text: `${daysLeft} hari lagi`, color: "text-muted-foreground", bgColor: "bg-gray-50" };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <div className="h-4 w-4 border-2 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Tugas</CardTitle>
          <CardDescription>
            Kelola dan pantau semua tugas kuliah Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari tugas atau mata kuliah..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Prioritas</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">Tidak ada tugas yang ditemukan</p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => {
            const deadlineInfo = getDeadlineInfo(task.deadline);
            return (
              <Card key={task.id} className={`transition-all hover:shadow-md ${
                task.status === "completed" ? "opacity-75" : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Status Checkbox */}
                    <div className="pt-1">
                      <Checkbox
                        checked={task.status === "completed"}
                        onCheckedChange={() => toggleTaskStatus(task)}
                        className="h-5 w-5"
                      />
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            task.status === "completed" ? "line-through text-muted-foreground" : ""
                          }`}>
                            {task.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {task.subject}
                          </p>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-2">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onDeleteTask(task.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Task Meta */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">
                            {format(task.deadline, "PPP", { locale: id })}
                          </span>
                        </div>
                        
                        <div className={`px-2 py-1 rounded-full text-xs ${deadlineInfo.bgColor} ${deadlineInfo.color}`}>
                          {deadlineInfo.text}
                        </div>

                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>

                        <div className="flex items-center gap-1">
                          {getStatusIcon(task.status)}
                          <span className="text-xs text-muted-foreground">
                            {task.status}
                          </span>
                        </div>
                      </div>

                      {/* Reminder Info */}
                      <div className="mt-2 flex gap-1">
                        {task.reminderSettings.threeDays && (
                          <Badge variant="outline" className="text-xs">H-3</Badge>
                        )}
                        {task.reminderSettings.oneDay && (
                          <Badge variant="outline" className="text-xs">H-1</Badge>
                        )}
                        {task.reminderSettings.threeHours && (
                          <Badge variant="outline" className="text-xs">H-3jam</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}