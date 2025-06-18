export interface Agent {
  id: string;
  name: string;
  nameEn: string;
  specialty: string;
  description: string;
  tags: string[];
  color: string;
  avatar: string;
}

export interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  agentId?: string;
  timestamp: Date;
}

export interface DragState {
  isDragging: boolean;
  draggedAgentId: string | null;
  dragOverDiscussion: boolean;
}