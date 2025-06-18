import React from 'react';
import { Agent } from '../types';
import { AgentAvatar } from './AgentAvatar';
import { X } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  isActive?: boolean;
  isInPanel?: boolean;
  onRemove?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
}

const colorClasses = {
  blue: 'border-blue-200 hover:border-blue-300 bg-blue-50/50',
  green: 'border-green-200 hover:border-green-300 bg-green-50/50',
  purple: 'border-purple-200 hover:border-purple-300 bg-purple-50/50',
  pink: 'border-pink-200 hover:border-pink-300 bg-pink-50/50',
  orange: 'border-orange-200 hover:border-orange-300 bg-orange-50/50',
  indigo: 'border-indigo-200 hover:border-indigo-300 bg-indigo-50/50',
  gray: 'border-gray-200 hover:border-gray-300 bg-gray-50/50',
  teal: 'border-teal-200 hover:border-teal-300 bg-teal-50/50',
  cyan: 'border-cyan-200 hover:border-cyan-300 bg-cyan-50/50',
  rose: 'border-rose-200 hover:border-rose-300 bg-rose-50/50'
};

export const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  isActive = false, 
  isInPanel = false,
  onRemove,
  onDragStart,
  onDragEnd
}) => {
  return (
    <div
      draggable={isInPanel}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        relative bg-white/80 backdrop-blur-sm rounded-xl border-2 p-4 shadow-lg transition-all duration-300
        ${colorClasses[agent.color as keyof typeof colorClasses]}
        ${isInPanel ? 'cursor-grab hover:scale-105 hover:shadow-xl' : ''}
        ${isActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
      `}
    >
      {!isInPanel && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-lg"
        >
          <X size={16} />
        </button>
      )}
      
      <div className="flex items-start gap-3">
        <AgentAvatar agent={agent} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-sm truncate">{agent.name}</h3>
          <p className="text-xs text-gray-600 font-medium">{agent.specialty}</p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{agent.description}</p>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {agent.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/60 rounded-full text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};