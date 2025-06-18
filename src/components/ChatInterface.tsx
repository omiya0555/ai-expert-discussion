import React, { useState, useRef, useEffect } from 'react';
import { Agent, Message } from '../types';
import { AgentAvatar } from './AgentAvatar';
import { Send, User, Loader } from 'lucide-react';

interface ChatInterfaceProps {
  activeAgents: Agent[];
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  activeAgents,
  messages,
  isProcessing,
  onSendMessage
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && activeAgents.length > 0 && !isProcessing) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const getAgentById = (agentId: string) => {
    return activeAgents.find(agent => agent.id === agentId);
  };

  return (
    <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-sm">
      {/* チャットメッセージ */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">ディスカッションを開始</h3>
              <p className="text-gray-600 mb-4">専門家にプロジェクトについて質問してみましょう</p>
              {activeAgents.length === 0 && (
                <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                  まず左パネルから専門家を追加してください
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'agent' && message.agentId && (
                  <AgentAvatar agent={getAgentById(message.agentId)!} size="sm" />
                )}
                
                <div className={`
                  max-w-[70%] rounded-2xl px-4 py-3 shadow-sm
                  ${message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                    : 'bg-white border border-gray-200'
                  }
                `}>
                  {message.type === 'agent' && message.agentId && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-sm text-gray-800">
                        {getAgentById(message.agentId)?.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getAgentById(message.agentId)?.specialty}
                      </span>
                    </div>
                  )}
                  
                  <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.content}
                  </p>
                  
                  <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                  <Loader className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-sm text-gray-600">専門家が回答を準備中...</span>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 入力フィールド */}
      <div className="p-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              activeAgents.length > 0 
                ? "専門家に質問やプロジェクトについて聞いてみましょう..." 
                : "まず専門家を追加してください"
            }
            disabled={activeAgents.length === 0 || isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || activeAgents.length === 0 || isProcessing}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg"
          >
            <Send size={18} />
            <span className="hidden sm:inline">送信</span>
          </button>
        </form>
      </div>
    </div>
  );
};