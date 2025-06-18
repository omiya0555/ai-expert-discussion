import React from 'react';
import { Agent } from '../types';

interface AgentAvatarProps {
  agent: Agent;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-lg',
  lg: 'w-16 h-16 text-2xl'
};

const colorClasses = {
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
  green: 'bg-gradient-to-br from-green-400 to-green-600',
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
  orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
  indigo: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
  gray: 'bg-gradient-to-br from-gray-400 to-gray-600',
  teal: 'bg-gradient-to-br from-teal-400 to-teal-600',
  cyan: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
  rose: 'bg-gradient-to-br from-rose-400 to-rose-600'
};

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ agent, size = 'md' }) => {
  return (
    <div className={`
      ${sizeClasses[size]} 
      ${colorClasses[agent.color as keyof typeof colorClasses]}
      rounded-full flex items-center justify-center shadow-lg
    `}>
      <span className="text-white">{agent.avatar}</span>
    </div>
  );
};