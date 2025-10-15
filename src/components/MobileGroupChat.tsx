import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { ChevronRight, Send, Paperclip, Smile } from "lucide-react";
import { ClassGroup } from "../types";

interface MobileGroupChatProps {
  group: ClassGroup;
  onBack: () => void;
}

interface ChatMessage {
  id: number;
  senderId: number;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'file' | 'task';
}

export function MobileGroupChat({ group, onBack }: MobileGroupChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      senderId: 2,
      senderName: "Ahmad Rizki",
      message: "Halo semuanya! Ada yang sudah mulai mengerjakan tugas binary search?",
      timestamp: new Date(2024, 8, 22, 10, 30),
      type: 'text'
    },
    {
      id: 2,
      senderId: 1,
      senderName: "Anda",
      message: "Sudah mulai, tapi masih bingung sama kompleksitasnya",
      timestamp: new Date(2024, 8, 22, 10, 32),
      type: 'text'
    },
    {
      id: 3,
      senderId: 3,
      senderName: "Siti Nurhaliza",
      message: "Bisa kita diskusi bareng nanti? Saya juga masih butuh bantuan",
      timestamp: new Date(2024, 8, 22, 10, 35),
      type: 'text'
    },
    {
      id: 4,
      senderId: 2,
      senderName: "Ahmad Rizki",
      message: "📎 Tugas: Implementasi Binary Search dibagikan",
      timestamp: new Date(2024, 8, 22, 10, 40),
      type: 'task'
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      senderId: 1, // Current user
      senderName: "Anda",
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isMyMessage = (senderId: number) => senderId === 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-accent text-white text-sm">
            {group.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">{group.name}</h1>
          <p className="text-sm opacity-80">
            {group.members.filter(m => m.isOnline).length} dari {group.members.length} online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-3 ${isMyMessage(message.senderId) ? 'flex-row-reverse' : ''}`}
          >
            {!isMyMessage(message.senderId) && (
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs">
                  {message.senderName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div className={`flex-1 max-w-[80%] ${isMyMessage(message.senderId) ? 'items-end' : ''}`}>
              {!isMyMessage(message.senderId) && (
                <p className="text-xs text-muted-foreground mb-1">{message.senderName}</p>
              )}
              
              <div 
                className={`rounded-lg p-3 ${
                  isMyMessage(message.senderId)
                    ? 'bg-primary text-white ml-auto'
                    : message.type === 'task'
                    ? 'bg-accent/20 border border-accent'
                    : 'bg-muted'
                }`}
              >
                {message.type === 'task' ? (
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    <span className="font-medium">{message.message}</span>
                  </div>
                ) : (
                  <p>{message.message}</p>
                )}
              </div>
              
              <p className={`text-xs text-muted-foreground mt-1 ${
                isMyMessage(message.senderId) ? 'text-right' : ''
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="border-0 bg-transparent p-0 focus-visible:ring-0"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            size="icon" 
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}