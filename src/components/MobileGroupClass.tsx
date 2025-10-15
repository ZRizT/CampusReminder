import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Users, Plus, Share2, MessageCircle, Calendar, Copy, UserPlus, Settings, ChevronRight, Clock, CheckCircle } from "lucide-react";
import { ClassGroup, SharedTask } from "../types";
import { MobileGroupChat } from "./MobileGroupChat";
import { toast } from "sonner@2.0.3";

interface MobileGroupClassProps {
  onBack: () => void;
}

export function MobileGroupClass({ onBack }: MobileGroupClassProps) {
  const [groups, setGroups] = useState<ClassGroup[]>([
    {
      id: 1,
      name: "Algoritma & Struktur Data",
      subject: "Algoritma & Struktur Data",
      code: "ASD2024",
      description: "Grup untuk diskusi tugas dan sharing materi kuliah algoritma",
      members: [
        { id: 1, name: "Anda", email: "you@example.com", role: "admin", isOnline: true },
        { id: 2, name: "Ahmad Rizki", email: "ahmad@example.com", role: "member", isOnline: true },
        { id: 3, name: "Siti Nurhaliza", email: "siti@example.com", role: "member", isOnline: false },
        { id: 4, name: "Budi Santoso", email: "budi@example.com", role: "member", isOnline: true },
      ],
      createdAt: new Date(2024, 7, 15),
      lastActivity: new Date()
    },
    {
      id: 2,
      name: "Basis Data",
      subject: "Basis Data",
      code: "BD2024",
      description: "Grup untuk praktek dan diskusi database",
      members: [
        { id: 1, name: "Anda", email: "you@example.com", role: "member", isOnline: true },
        { id: 5, name: "Dewi Lestari", email: "dewi@example.com", role: "admin", isOnline: false },
        { id: 6, name: "Eko Prasetyo", email: "eko@example.com", role: "member", isOnline: true },
      ],
      createdAt: new Date(2024, 7, 20),
      lastActivity: new Date(2024, 8, 20)
    }
  ]);

  const [sharedTasks] = useState<SharedTask[]>([
    {
      id: 1,
      title: "Implementasi Binary Search",
      sharedBy: "Ahmad Rizki",
      deadline: "25 Sep 2024",
      groupId: 1,
      description: "Tugas implementasi algoritma pencarian"
    },
    {
      id: 2,
      title: "Design Database E-Commerce",
      sharedBy: "Dewi Lestari",
      deadline: "28 Sep 2024",
      groupId: 2,
      description: "Desain database untuk aplikasi e-commerce"
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ClassGroup | null>(null);
  const [showChat, setShowChat] = useState(false);
  
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    description: ""
  });
  
  const [joinCode, setJoinCode] = useState("");

  const createGroup = () => {
    const group: ClassGroup = {
      id: Date.now(),
      ...newGroup,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      members: [
        { id: 1, name: "Anda", email: "you@example.com", role: "admin", isOnline: true }
      ],
      createdAt: new Date(),
      lastActivity: new Date()
    };
    
    setGroups([...groups, group]);
    setNewGroup({ name: "", subject: "", description: "" });
    setShowCreateDialog(false);
    toast.success("Grup berhasil dibuat!");
  };

  const joinGroup = () => {
    toast.success(`Berhasil bergabung dengan grup ${joinCode}!`);
    setJoinCode("");
    setShowJoinDialog(false);
  };

  const copyGroupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Kode grup berhasil disalin!");
  };

  const acceptTask = (taskId: number) => {
    toast.success("Tugas berhasil diterima dan ditambahkan ke daftar tugas Anda!");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  };

  if (showChat && selectedGroup) {
    return (
      <MobileGroupChat 
        group={selectedGroup}
        onBack={() => setShowChat(false)}
      />
    );
  }

  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedGroup(null)}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6 rotate-180" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{selectedGroup.name}</h1>
            <p className="text-sm opacity-80">{selectedGroup.members.length} anggota</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        {/* Group Details */}
        <div className="p-4 space-y-4">
          {/* Group Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{selectedGroup.subject}</h3>
                  <p className="text-sm text-muted-foreground">{selectedGroup.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={() => copyGroupCode(selectedGroup.code)}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  {selectedGroup.code}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Members */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Anggota Grup ({selectedGroup.members.length})</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {selectedGroup.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.role === 'admin' && (
                          <Badge variant="secondary" className="text-xs">Admin</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-sm text-muted-foreground">
                          {member.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-1 h-auto py-3"
              onClick={() => setShowChat(true)}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs">Chat</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3">
              <Share2 className="h-5 w-5" />
              <span className="text-xs">Bagikan</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-1 h-auto py-3">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Jadwal</span>
            </Button>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Ahmad Rizki membagikan tugas "Binary Search"</p>
                    <p className="text-xs text-muted-foreground">2 jam lalu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Siti Nurhaliza bergabung dengan grup</p>
                    <p className="text-xs text-muted-foreground">1 hari lalu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6 rotate-180" />
        </Button>
        <h1 className="text-xl font-semibold">Grup Kelas</h1>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-3">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Buat Grup
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 max-w-sm">
            <DialogHeader>
              <DialogTitle>Buat Grup Baru</DialogTitle>
              <DialogDescription>
                Buat grup untuk berbagi tugas dengan teman sekelas
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="group-name">Nama Grup</Label>
                <Input
                  id="group-name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Contoh: Algoritma Kelas A"
                />
              </div>
              <div>
                <Label htmlFor="group-subject">Mata Kuliah</Label>
                <Input
                  id="group-subject"
                  value={newGroup.subject}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Contoh: Algoritma & Struktur Data"
                />
              </div>
              <div>
                <Label htmlFor="group-description">Deskripsi</Label>
                <Input
                  id="group-description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi singkat tentang grup"
                />
              </div>
              <Button onClick={createGroup} className="w-full">
                Buat Grup
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Gabung
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 max-w-sm">
            <DialogHeader>
              <DialogTitle>Gabung Grup</DialogTitle>
              <DialogDescription>
                Masukkan kode grup yang diberikan oleh teman Anda
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="join-code">Kode Grup</Label>
                <Input
                  id="join-code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: ASD2024"
                  className="uppercase"
                />
              </div>
              <Button onClick={joinGroup} className="w-full" disabled={!joinCode}>
                Gabung Grup
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-groups" className="px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-groups">Grup Saya</TabsTrigger>
          <TabsTrigger value="shared-tasks">Tugas Dibagikan</TabsTrigger>
        </TabsList>

        {/* My Groups */}
        <TabsContent value="my-groups" className="space-y-4 mt-4">
          {groups.map((group) => (
            <Card 
              key={group.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedGroup(group)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.subject}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {group.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {group.members.length > 3 && (
                      <div className="h-6 w-6 bg-muted border-2 border-background rounded-full flex items-center justify-center">
                        <span className="text-xs">+{group.members.length - 3}</span>
                      </div>
                    )}
                  </div>

                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyGroupCode(group.code);
                    }}
                  >
                    {group.code}
                  </Badge>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <span className="text-xs text-muted-foreground">
                    Aktivitas terakhir: {formatDate(group.lastActivity)}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      {group.members.filter(m => m.isOnline).length} online
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Shared Tasks */}
        <TabsContent value="shared-tasks" className="space-y-4 mt-4">
          {sharedTasks.map((task) => {
            const group = groups.find(g => g.id === task.groupId);
            return (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-orange-500 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{task.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Dibagikan oleh {task.sharedBy} di grup {group?.name}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">Deadline: {task.deadline}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => acceptTask(task.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Terima
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Tolak
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}