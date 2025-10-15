import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CalendarIcon, Plus, BookOpen, GraduationCap, FileDown, Upload } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { id } from "date-fns/locale";

interface AcademicEvent {
  id: number;
  title: string;
  type: "class" | "exam" | "assignment" | "holiday";
  date: Date;
  time?: string;
  location?: string;
  description?: string;
  subject?: string;
}

export function AcademicCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [events, setEvents] = useState<AcademicEvent[]>([
    {
      id: 1,
      title: "Kuliah Algoritma",
      type: "class",
      date: new Date(2024, 8, 23),
      time: "08:00",
      location: "Lab Komputer 1",
      subject: "Algoritma & Struktur Data"
    },
    {
      id: 2,
      title: "UTS Basis Data",
      type: "exam",
      date: new Date(2024, 8, 25),
      time: "10:00",
      location: "Ruang 301",
      subject: "Basis Data"
    },
    {
      id: 3,
      title: "Deadline Essay",
      type: "assignment",
      date: new Date(2024, 8, 27),
      subject: "Academic English"
    },
    {
      id: 4,
      title: "Libur Nasional",
      type: "holiday",
      date: new Date(2024, 8, 30),
      description: "Hari Libur Nasional"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "class" as const,
    date: new Date(),
    time: "",
    location: "",
    description: "",
    subject: ""
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "class": return "bg-blue-100 text-blue-800";
      case "exam": return "bg-red-100 text-red-800";
      case "assignment": return "bg-yellow-100 text-yellow-800";
      case "holiday": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "class": return <BookOpen className="h-3 w-3" />;
      case "exam": return <GraduationCap className="h-3 w-3" />;
      case "assignment": return <CalendarIcon className="h-3 w-3" />;
      case "holiday": return <CalendarIcon className="h-3 w-3" />;
      default: return <CalendarIcon className="h-3 w-3" />;
    }
  };

  const addEvent = () => {
    const event: AcademicEvent = {
      id: Date.now(),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({
      title: "",
      type: "class",
      date: new Date(),
      time: "",
      location: "",
      description: "",
      subject: ""
    });
    setShowEventDialog(false);
  };

  const selectedDateEvents = getEventsForDate(selectedDate || new Date());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Kalender Akademik</CardTitle>
          <CardDescription>
            Kelola jadwal kuliah, ujian, dan deadline tugas Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah Event Baru</DialogTitle>
                  <DialogDescription>
                    Tambahkan jadwal kuliah, ujian, atau event akademik lainnya
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-title">Judul Event</Label>
                    <Input
                      id="event-title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Contoh: Kuliah Algoritma"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Tipe Event</Label>
                      <Select 
                        value={newEvent.type} 
                        onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class">Kuliah</SelectItem>
                          <SelectItem value="exam">Ujian</SelectItem>
                          <SelectItem value="assignment">Deadline Tugas</SelectItem>
                          <SelectItem value="holiday">Libur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="event-time">Waktu</Label>
                      <Input
                        id="event-time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-subject">Mata Kuliah</Label>
                      <Input
                        id="event-subject"
                        value={newEvent.subject}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Nama mata kuliah"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="event-location">Lokasi</Label>
                      <Input
                        id="event-location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Ruang/lokasi"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="event-description">Deskripsi</Label>
                    <Textarea
                      id="event-description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Catatan tambahan..."
                      rows={2}
                    />
                  </div>

                  <Button onClick={addEvent} className="w-full">
                    Tambah Event
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Jadwal
            </Button>
            
            <Button variant="outline">
              <FileDown className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {format(selectedDate || new Date(), "MMMM yyyy", { locale: id })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || new Date())}
              className="rounded-md border w-full"
              modifiers={{
                hasEvent: (date) => getEventsForDate(date).length > 0
              }}
              modifiersStyles={{
                hasEvent: { 
                  backgroundColor: "var(--color-primary)", 
                  color: "white",
                  fontWeight: "bold"
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "PPP", { locale: id }) : "Pilih Tanggal"}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length} event dijadwalkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDateEvents.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Tidak ada event pada tanggal ini
                </p>
              ) : (
                selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventIcon(event.type)}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </Badge>
                    </div>
                    
                    {event.subject && (
                      <p className="text-sm text-muted-foreground">{event.subject}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {event.time && (
                        <span>🕐 {event.time}</span>
                      )}
                      {event.location && (
                        <span>📍 {event.location}</span>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-sm">{event.description}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Bulan Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {events.filter(e => e.type === "class" && 
                  e.date.getMonth() === selectedDate.getMonth()).length}
              </div>
              <p className="text-sm text-muted-foreground">Kuliah</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {events.filter(e => e.type === "exam" && 
                  e.date.getMonth() === selectedDate.getMonth()).length}
              </div>
              <p className="text-sm text-muted-foreground">Ujian</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {events.filter(e => e.type === "assignment" && 
                  e.date.getMonth() === selectedDate.getMonth()).length}
              </div>
              <p className="text-sm text-muted-foreground">Deadline</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {events.filter(e => e.type === "holiday" && 
                  e.date.getMonth() === selectedDate.getMonth()).length}
              </div>
              <p className="text-sm text-muted-foreground">Libur</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}