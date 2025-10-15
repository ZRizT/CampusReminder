import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Bell, Smartphone, Mail, MessageSquare, Clock, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  mode: "light" | "intensive";
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  reminderTypes: {
    threeDays: boolean;
    oneDay: boolean;
    threeHours: boolean;
    custom: boolean;
  };
  intensity: number; // 1-10
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    mode: "intensive",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "07:00"
    },
    reminderTypes: {
      threeDays: true,
      oneDay: true,
      threeHours: true,
      custom: false
    },
    intensity: 7,
    soundEnabled: true,
    vibrationEnabled: true
  });

  const updateSetting = <K extends keyof NotificationSettings>(
    key: K, 
    value: NotificationSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const updateNestedSetting = <T extends keyof NotificationSettings>(
    parent: T,
    key: keyof NotificationSettings[T],
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend/localStorage
    toast.success("Pengaturan notifikasi berhasil disimpan!");
  };

  const testNotification = () => {
    toast.info("🔔 Ini adalah contoh notifikasi reminder tugas!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Pengaturan Notifikasi
          </CardTitle>
          <CardDescription>
            Atur cara Anda menerima reminder dan notifikasi dari aplikasi
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Saluran Notifikasi</CardTitle>
          <CardDescription>
            Pilih bagaimana Anda ingin menerima notifikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notifikasi langsung di perangkat
                </p>
              </div>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-accent" />
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Kirim reminder via email
                </p>
              </div>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Kirim reminder via SMS (berbayar)
                </p>
              </div>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Mode Notifikasi</CardTitle>
          <CardDescription>
            Pilih seberapa sering Anda ingin menerima reminder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={`cursor-pointer transition-all ${
              settings.mode === "light" ? "ring-2 ring-accent" : ""
            }`} onClick={() => updateSetting("mode", "light")}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <h3 className="font-medium">Mode Ringan</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Satu kali reminder per hari untuk setiap tugas
                </p>
                <div className="mt-2">
                  <Badge variant="secondary">Sekali sehari</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer transition-all ${
              settings.mode === "intensive" ? "ring-2 ring-primary" : ""
            }`} onClick={() => updateSetting("mode", "intensive")}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#FF8A00'}}></div>
                  <h3 className="font-medium">Mode Intensif</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reminder berulang setiap beberapa jam menjelang deadline
                </p>
                <div className="mt-2">
                  <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground">Tiap 3 jam</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Intensity Slider */}
          <div className="space-y-3">
            <Label>Intensitas Notifikasi: {settings.intensity}/10</Label>
            <div className="px-2">
              <Slider
                value={[settings.intensity]}
                onValueChange={(value) => updateSetting("intensity", value[0])}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Semakin tinggi, semakin sering reminder dikirim
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reminder Types */}
      <Card>
        <CardHeader>
          <CardTitle>Jenis Reminder</CardTitle>
          <CardDescription>
            Pilih kapan Anda ingin menerima reminder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>H-3 (3 hari sebelum deadline)</Label>
              <p className="text-sm text-muted-foreground">Reminder awal untuk persiapan</p>
            </div>
            <Switch
              checked={settings.reminderTypes.threeDays}
              onCheckedChange={(checked) => 
                updateNestedSetting("reminderTypes", "threeDays", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>H-1 (1 hari sebelum deadline)</Label>
              <p className="text-sm text-muted-foreground">Reminder untuk finishing</p>
            </div>
            <Switch
              checked={settings.reminderTypes.oneDay}
              onCheckedChange={(checked) => 
                updateNestedSetting("reminderTypes", "oneDay", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>H-3 jam (3 jam sebelum deadline)</Label>
              <p className="text-sm text-muted-foreground">Reminder darurat terakhir</p>
            </div>
            <Switch
              checked={settings.reminderTypes.threeHours}
              onCheckedChange={(checked) => 
                updateNestedSetting("reminderTypes", "threeHours", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Jam Tenang
          </CardTitle>
          <CardDescription>
            Tentukan waktu dimana notifikasi akan dibatasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="quiet-hours">Aktifkan Jam Tenang</Label>
            <Switch
              id="quiet-hours"
              checked={settings.quietHours.enabled}
              onCheckedChange={(checked) => 
                updateNestedSetting("quietHours", "enabled", checked)
              }
            />
          </div>

          {settings.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quiet-start">Mulai</Label>
                <Select 
                  value={settings.quietHours.start}
                  onValueChange={(value) => updateNestedSetting("quietHours", "start", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quiet-end">Selesai</Label>
                <Select 
                  value={settings.quietHours.end}
                  onValueChange={(value) => updateNestedSetting("quietHours", "end", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sound & Vibration */}
      <Card>
        <CardHeader>
          <CardTitle>Suara & Getaran</CardTitle>
          <CardDescription>
            Pengaturan audio dan haptik untuk notifikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {settings.soundEnabled ? (
                <Volume2 className="h-4 w-4 text-primary" />
              ) : (
                <VolumeX className="h-4 w-4 text-gray-400" />
              )}
              <div>
                <Label htmlFor="sound-enabled">Suara Notifikasi</Label>
                <p className="text-sm text-muted-foreground">
                  Mainkan suara saat notifikasi masuk
                </p>
              </div>
            </div>
            <Switch
              id="sound-enabled"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSetting("soundEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="vibration-enabled">Getaran</Label>
              <p className="text-sm text-muted-foreground">
                Getarkan perangkat saat notifikasi masuk
              </p>
            </div>
            <Switch
              id="vibration-enabled"
              checked={settings.vibrationEnabled}
              onCheckedChange={(checked) => updateSetting("vibrationEnabled", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={handleSaveSettings} className="flex-1">
          Simpan Pengaturan
        </Button>
        <Button onClick={testNotification} variant="outline">
          Test Notifikasi
        </Button>
      </div>
    </div>
  );
}