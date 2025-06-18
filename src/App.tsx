import React, { useState } from 'react';
import { Agent, Message, DragState } from './types';
import { agents } from './data/agents';
import { ExpertPanel } from './components/ExpertPanel';
import { DiscussionRoom } from './components/DiscussionRoom';
import { ChatInterface } from './components/ChatInterface';
import { Brain, Sparkles } from 'lucide-react';

function App() {
  const [activeAgents, setActiveAgents] = useState<Agent[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedAgentId: null,
    dragOverDiscussion: false
  });

  // ドラッグ開始
  const handleDragStart = (agentId: string) => {
    setDragState(prev => ({
      ...prev,
      isDragging: true,
      draggedAgentId: agentId
    }));
  };

  // ドラッグ終了
  const handleDragEnd = () => {
    setDragState({
      isDragging: false,
      draggedAgentId: null,
      dragOverDiscussion: false
    });
  };

  // ディスカッションエリアにドラッグオーバー
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState(prev => ({ ...prev, dragOverDiscussion: true }));
  };

  // ディスカッションエリアからドラッグリーブ
  const handleDragLeave = () => {
    setDragState(prev => ({ ...prev, dragOverDiscussion: false }));
  };

  // ドロップ処理
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const agentId = e.dataTransfer.getData('text/plain');
    const agent = agents.find(a => a.id === agentId);
    
    if (agent && !activeAgents.some(a => a.id === agent.id)) {
      setActiveAgents(prev => [...prev, agent]);
    }
    
    handleDragEnd();
  };

  // エージェント削除
  const handleRemoveAgent = (agentId: string) => {
    setActiveAgents(prev => prev.filter(a => a.id !== agentId));
  };

  // メッセージ送信
  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // 各アクティブエージェントからの応答をシミュレート
    for (let i = 0; i < activeAgents.length; i++) {
      const agent = activeAgents[i];
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      const agentResponse = generateAgentResponse(agent, content);
      const agentMessage: Message = {
        id: `${Date.now()}-${agent.id}`,
        type: 'agent',
        content: agentResponse,
        agentId: agent.id,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, agentMessage]);
    }

    setIsProcessing(false);
  };

  // エージェント応答生成
  const generateAgentResponse = (agent: Agent, userMessage: string): string => {
    const responses: Record<string, string[]> = {
      'alex-chen': [
        'テクニカルな観点から見ると、スケーラビリティとセキュリティを最優先に考える必要があります。マイクロサービスアーキテクチャの導入をお勧めします。',
        'システム設計において、パフォーマンスとメンテナンス性のバランスが重要です。クラウドネイティブなアプローチを検討してみてください。',
        'データベースの選択とキャッシュ戦略が成功の鍵となります。分散システムの複雑性も考慮する必要があります。'
      ],
      'sarah-mitchell': [
        'ビジネス戦略の視点では、市場ポジショニングと競合優位性の確立が最重要です。ターゲット市場の分析から始めましょう。',
        '収益モデルの多様化とリスク分散を考慮した戦略立案をお勧めします。市場の成長ポテンシャルも評価が必要です。',
        'ステークホルダーとの関係構築とパートナーシップ戦略が長期的成功につながります。'
      ],
      'marcus-goldman': [
        '投資の観点から見ると、ROIとキャッシュフローの予測が重要です。資金調達戦略も併せて検討しましょう。',
        'バリュエーションとリスク評価を詳細に行い、投資家向けの説得力のある資料作成が必要です。',
        '財務健全性の維持と成長投資のバランスを取ることが持続的成長の鍵となります。'
      ],
      'emily-rodriguez': [
        'UXの視点では、ユーザージャーニーの最適化とユーザビリティテストが不可欠です。ペルソナ設計から始めましょう。',
        'インターフェースの直感性とアクセシビリティを重視し、ユーザーフィードバックを継続的に収集することが重要です。',
        'デザインシステムの構築により、一貫性のあるユーザーエクスペリエンスを提供できます。'
      ],
      'david-kim': [
        'オペレーション効率化の観点から、プロセスの標準化と自動化が重要です。KPIの設定と継続的改善を実施しましょう。',
        'スケーリングに向けて、組織構造とワークフローの最適化が必要です。品質管理体制の構築も不可欠です。',
        'リソース配分の最適化と生産性向上のための施策を段階的に実装することをお勧めします。'
      ],
      'lisa-thompson': [
        'マーケティング戦略では、デジタルチャネルの活用とブランディングが重要です。コンテンツマーケティングから始めましょう。',
        'グロースハック手法を用いた効果的な顧客獲得戦略の実装をお勧めします。データドリブンなアプローチが鍵です。',
        'SNSとSEO戦略を組み合わせた包括的なデジタルマーケティング施策が効果的です。'
      ],
      'robert-chen': [
        '法務・コンプライアンスの観点から、契約条件の明確化とリスク管理が重要です。知的財産の保護も忘れずに。',
        '規制遵守とガバナンス体制の整備が事業継続の基盤となります。法的リスクの事前評価をお勧めします。',
        'ステークホルダーとの契約関係の最適化と透明性の確保が信頼構築につながります。'
      ],
      'priya-patel': [
        'データサイエンスの視点では、データ収集・分析基盤の構築が最優先です。機械学習モデルの活用可能性も検討しましょう。',
        '予測分析と意思決定支援システムの導入により、戦略的優位性を獲得できます。データ品質の管理も重要です。',
        'AIを活用した自動化とパーソナライゼーションが競争力向上の鍵となります。'
      ],
      'kenta-tanaka': [
        'プロダクト戦略の観点から、ユーザーニーズの深い理解とMVPの定義が重要です。アジャイル開発手法の採用をお勧めします。',
        'ロードマップの策定とフィーチャー優先順位の決定により、効率的な開発が可能になります。',
        'ユーザーフィードバックループの構築と継続的な改善サイクルの確立が成功の鍵です。'
      ],
      'misaki-sato': [
        '人事・組織開発の視点では、チーム文化の構築とタレントマネジメントが重要です。採用戦略から始めましょう。',
        '組織の成長に合わせた人材育成プログラムと評価制度の整備が必要です。エンゲージメント向上も重視しましょう。',
        'ダイバーシティ＆インクルージョンの推進と心理的安全性の確保が高パフォーマンスチームの基盤です。'
      ]
    };

    const agentResponses = responses[agent.id] || ['ありがとうございます。専門分野の観点から検討いたします。'];
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Expert Discussion
            </h1>
            <p className="text-sm text-gray-600">専門家AIエージェントによる多角的ディスカッション</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </header>
      
      {/* メインコンテンツ */}
      <div className="flex-1 flex overflow-hidden">
        {/* エキスパートパネル */}
        <ExpertPanel
          agents={agents}
          activeAgents={activeAgents}
          dragState={dragState}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
        
        {/* メインエリア */}
        <div className="flex-1 flex flex-col">
          {/* ディスカッションルーム */}
          <DiscussionRoom
            activeAgents={activeAgents}
            dragState={dragState}
            onRemoveAgent={handleRemoveAgent}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
          
          {/* チャットインターフェース */}
          <ChatInterface
            activeAgents={activeAgents}
            messages={messages}
            isProcessing={isProcessing}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;