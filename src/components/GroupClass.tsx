import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Users, Plus, Share2, MessageCircle, Calendar, Copy, UserPlus, Settings } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface GroupMember {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "member";
  isOnline: boolean;
}

interface ClassGroup {
  id: number;
  name: string;
  subject: string;
  code: string;
  description: string;
  members: GroupMember[];
  createdAt: Date;
  lastActivity: Date;
}

export function GroupClass() {
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

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ClassGroup | null>(null);
  
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
    // Simulate joining a group
    toast.success(`Berhasil bergabung dengan grup ${joinCode}!`);
    setJoinCode("");
    setShowJoinDialog(false);
  };

  const copyGroupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Kode grup berhasil disalin!");
  };

  const shareTask = (groupId: number, taskTitle: string) => {
    toast.success(`Tugas "${taskTitle}" berhasil dibagikan ke grup!`);
  };

  const sharedTasks = [
    {
      id: 1,
      title: "Implementasi Binary Search",
      sharedBy: "Ahmad Rizki",
      deadline: "2024-09-25",
      groupId: 1
    },
    {
      id: 2,
      title: "Design Database E-Commerce",
      sharedBy: "Dewi Lestari",
      deadline: "2024-09-28",
      groupId: 2
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Grup Kelas
          </CardTitle>
          <CardDescription>
            Berkolaborasi dengan teman sekelas untuk berbagi tugas dan jadwal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Grup
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Buat Grup Kelas Baru</DialogTitle>
                  <DialogDescription>
                    Buat grup untuk berbagi tugas dan jadwal dengan teman sekelas
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
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Gabung Grup
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gabung Grup Kelas</DialogTitle>
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
        </CardContent>
      </Card>

      <Tabs defaultValue="my-groups" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-groups">Grup Saya</TabsTrigger>
          <TabsTrigger value="shared-tasks">Tugas Dibagikan</TabsTrigger>
          <TabsTrigger value="calendar-sync">Sinkron Kalender</TabsTrigger>
        </TabsList>

        {/* My Groups */}
        <TabsContent value="my-groups" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.subject}</CardDescription>
                    </div>
                    <Badge variant="outline" className="cursor-pointer"
                           onClick={() => copyGroupCode(group.code)}>
                      <Copy className="h-3 w-3 mr-1" />
                      {group.code}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {group.description}
                  </p>

                  {/* Members */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Anggota ({group.members.length})</span>
                      <Button size="sm" variant="ghost">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 4).map((member) => (
                        <Avatar key={member.id} className="border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 4 && (
                        <Avatar className="border-2 border-background">
                          <AvatarFallback className="text-xs">
                            +{group.members.length - 4}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="h-3 w-3 mr-1" />
                      Bagikan
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      Jadwal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Shared Tasks */}
        <TabsContent value="shared-tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tugas yang Dibagikan</CardTitle>
              <CardDescription>
                Tugas yang dibagikan oleh anggota grup kepada Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedTasks.map((task) => {
                  const group = groups.find(g => g.id === task.groupId);
                  return (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Dibagikan oleh {task.sharedBy} di grup {group?.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">Deadline: {task.deadline}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Terima</Button>
                        <Button size="sm" variant="outline">Tolak</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Share Your Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Bagikan Tugas Anda</CardTitle>
              <CardDescription>
                Bagikan tugas Anda kepada anggota grup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Tugas Algoritma Sorting", "Lab Report Fisika", "Essay Bahasa Inggris"].map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{task}</span>
                    <div className="flex gap-2">
                      {groups.map((group) => (
                        <Button 
                          key={group.id}
                          size="sm" 
                          variant="outline"
                          onClick={() => shareTask(group.id, task)}
                        >
                          Bagikan ke {group.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Sync */}
        <TabsContent value="calendar-sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sinkronisasi Kalender</CardTitle>
              <CardDescription>
                Sinkronkan jadwal kuliah dan ujian dengan anggota grup
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{group.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {group.members.length} anggota
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Tersinkron
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      Lihat Jadwal
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal Grup Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Kuliah Algoritma</p>
                    <p className="text-sm text-muted-foreground">08:00 - 10:00 • Lab Komputer 1</p>
                  </div>
                  <Badge variant="outline">Grup ASD2024</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">UTS Basis Data</p>
                    <p className="text-sm text-muted-foreground">10:00 - 12:00 • Ruang 301</p>
                  </div>
                  <Badge variant="outline">Grup BD2024</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}