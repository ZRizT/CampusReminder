import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { CalendarIcon, Plus, Clock, AlertCircle, Users, Share2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface TaskFormProps {
  onSubmit: (task: any) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    deadline: undefined as Date | undefined,
    priority: "medium",
    reminderSettings: {
      threeDays: true,
      oneDay: true,
      threeHours: true
    },
    shareToGroups: [] as number[]
  });

  // Mock group data - in real app this would come from props or context
  const mockGroups = [
    { id: 1, name: "Algoritma & Struktur Data", code: "ASD2024" },
    { id: 2, name: "Basis Data", code: "BD2024" },
    { id: 3, name: "Pemrograman Web", code: "WEB2024" }
  ];

  const subjects = [
    "Algoritma & Struktur Data",
    "Basis Data",
    "Pemrograman Web",
    "Matematika Diskrit",
    "Sistem Operasi",
    "Jaringan Komputer",
    "Academic English",
    "Praktikum Fisika"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.deadline) {
      onSubmit({
        ...formData,
        id: Date.now(),
        status: "pending",
        createdAt: new Date()
      });
      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        deadline: undefined,
        priority: "medium",
        reminderSettings: {
          threeDays: true,
          oneDay: true,
          threeHours: true
        },
        shareToGroups: []
      });
    }
  };

  const toggleReminder = (type: keyof typeof formData.reminderSettings) => {
    setFormData(prev => ({
      ...prev,
      reminderSettings: {
        ...prev.reminderSettings,
        [type]: !prev.reminderSettings[type]
      }
    }));
  };

  const toggleGroupShare = (groupId: number) => {
    setFormData(prev => ({
      ...prev,
      shareToGroups: prev.shareToGroups.includes(groupId)
        ? prev.shareToGroups.filter(id => id !== groupId)
        : [...prev.shareToGroups, groupId]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Mobile version - no card wrapper */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Judul Tugas</Label>
            <Input
              id="title"
              placeholder="Contoh: Tugas Algoritma Searching"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Mata Kuliah</Label>
            <Select 
              value={formData.subject} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih mata kuliah" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Jelaskan detail tugas, requirements, atau catatan penting..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deadline */}
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deadline ? (
                      format(formData.deadline, "PPP", { locale: id })
                    ) : (
                      <span>Pilih tanggal deadline</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.deadline}
                    onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label>Prioritas</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reminder Settings */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pengaturan Reminder
            </Label>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={formData.reminderSettings.threeDays ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleReminder("threeDays")}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                H-3
              </Badge>
              <Badge
                variant={formData.reminderSettings.oneDay ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleReminder("oneDay")}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                H-1
              </Badge>
              <Badge
                variant={formData.reminderSettings.threeHours ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleReminder("threeHours")}
              >
                <AlertCircle className="h-3 w-3 mr-1" />
                H-3 jam
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Klik untuk mengaktifkan/menonaktifkan reminder
            </p>
          </div>

          {/* Share to Groups */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Bagikan ke Grup (Opsional)
            </Label>
            <div className="space-y-2">
              {mockGroups.map((group) => (
                <div key={group.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`group-${group.id}`}
                    checked={formData.shareToGroups.includes(group.id)}
                    onCheckedChange={() => toggleGroupShare(group.id)}
                  />
                  <Label htmlFor={`group-${group.id}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{group.name}</span>
                      <Badge variant="outline" className="text-xs">{group.code}</Badge>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Tugas akan dibagikan ke grup yang dipilih untuk kolaborasi
            </p>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Tugas
          </Button>
        </form>
      </div>
    </div>
  );
}