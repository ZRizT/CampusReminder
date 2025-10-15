export interface Task {
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

export interface GroupMember {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "member";
  isOnline: boolean;
}

export interface ClassGroup {
  id: number;
  name: string;
  subject: string;
  code: string;
  description: string;
  members: GroupMember[];
  createdAt: Date;
  lastActivity: Date;
}

export interface SharedTask {
  id: number;
  title: string;
  sharedBy: string;
  deadline: string;
  groupId: number;
  description?: string;
  accepted?: boolean;
}