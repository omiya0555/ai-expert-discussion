import React from 'react';
import { Agent, DragState } from '../types';
import { AgentCard } from './AgentCard';
import { MessageSquarePlus } from 'lucide-react';

interface DiscussionRoomProps {
  activeAgents: Agent[];
  dragState: DragState;
  onRemoveAgent: (agentId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export const DiscussionRoom: React.FC<DiscussionRoomProps> = ({
  activeAgents,
  dragState,
  onRemoveAgent,
  onDragOver,
  onDragLeave,
  onDrop
}) => {
  return (
    <div className="p-6 border-b border-gray-200 bg-white/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
          <MessageSquarePlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">ディスカッションルーム</h2>
          <p className="text-sm text-gray-600">
            {activeAgents.length > 0 
              ? `${activeAgents.length}名の専門家が参加中` 
              : '専門家を追加してディスカッションを開始'
            }
          </p>
        </div>
      </div>
      
      <div
        className={`
          min-h-[120px] rounded-xl border-2 border-dashed transition-all duration-300 p-4
          ${dragState.dragOverDiscussion 
            ? 'border-blue-400 bg-blue-50/50' 
            : activeAgents.length > 0 
              ? 'border-gray-300 bg-gray-50/30' 
              : 'border-gray-300 bg-gray-50/50'
          }
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {activeAgents.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquarePlus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">専門家をここにドロップ</p>
              <p className="text-sm text-gray-400">複数の視点から問題を解決しましょう</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeAgents.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isInPanel={false}
                onRemove={() => onRemoveAgent(agent.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};