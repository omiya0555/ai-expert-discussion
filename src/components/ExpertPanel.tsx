import React from 'react';
import { Agent, DragState } from '../types';
import { AgentCard } from './AgentCard';
import { Users } from 'lucide-react';

interface ExpertPanelProps {
  agents: Agent[];
  activeAgents: Agent[];
  dragState: DragState;
  onDragStart: (agentId: string) => void;
  onDragEnd: () => void;
}

export const ExpertPanel: React.FC<ExpertPanelProps> = ({
  agents,
  activeAgents,
  dragState,
  onDragStart,
  onDragEnd
}) => {
  const handleDragStart = (agent: Agent) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', agent.id);
    onDragStart(agent.id);
  };

  return (
    <div className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">エキスパートパネル</h2>
            <p className="text-sm text-gray-600">専門家をディスカッションに招待</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {agents.map(agent => {
          const isActive = activeAgents.some(a => a.id === agent.id);
          return (
            <AgentCard
              key={agent.id}
              agent={agent}
              isActive={isActive}
              isInPanel={true}
              onDragStart={handleDragStart(agent)}
              onDragEnd={onDragEnd}
            />
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-gray-500 text-center">
          専門家をドラッグしてディスカッションルームに追加
        </p>
      </div>
    </div>
  );
};