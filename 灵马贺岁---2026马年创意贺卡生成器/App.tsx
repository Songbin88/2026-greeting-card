
import React, { useState, useRef, useCallback } from 'react';
import { generateGreeting } from './services/geminiService';
import { CardData } from './types';
import { GreetingCard } from './components/GreetingCard';
import { toPng } from 'html-to-image';

const App: React.FC = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!sender || !receiver) return;

    setIsGenerating(true);
    try {
      const result = await generateGreeting(sender, receiver);
      setCardData({
        sender,
        receiver,
        greeting: result.greeting,
        subtext: result.subtext,
      });
    } catch (err) {
      console.error("Error generating card content:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) return;

    toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `2026马年贺卡-${receiver}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Download failed', err);
      });
  }, [receiver]);

  return (
    <div className="min-h-screen bg-[#fdfdfd] flex flex-col md:flex-row">
      {/* Left Panel: Inputs */}
      <div className="w-full md:w-1/3 p-8 bg-white border-r border-gray-100 shadow-sm flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-title text-[#BC002D] mb-3">灵马贺岁</h1>
            <p className="text-gray-400 text-sm tracking-wide">AI 创意定制 · 2026 农历马年贺卡</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                您的姓名 (Sender)
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="在此输入您的姓名"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#BC002D] focus:bg-white transition-all outline-none text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                收件人姓名 (Receiver)
              </label>
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="在此输入对方的姓名"
                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#BC002D] focus:bg-white transition-all outline-none text-lg"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-xl text-lg ${
                isGenerating ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#BC002D] hover:bg-[#A00025] hover:shadow-red-200 active:scale-[0.98]'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  创作中...
                </div>
              ) : '开始生成'}
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-gray-50 text-center text-gray-300 text-[10px] tracking-[0.2em] uppercase">
            Designed for 2026 Lunar Year
          </div>
        </div>
      </div>

      {/* Right Panel: Preview Area */}
      <div className="w-full md:w-2/3 p-4 md:p-10 flex flex-col items-center justify-center bg-[#F7F7F7] min-h-screen">
        {cardData ? (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="mb-8 transform hover:scale-[1.01] transition-transform">
              <GreetingCard data={cardData} cardRef={cardRef} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px]">
              <button
                onClick={handleDownload}
                className="flex-1 py-4 bg-white border-2 border-[#BC002D] text-[#BC002D] font-bold rounded-xl shadow-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                保存贺卡
              </button>
              
              <button
                onClick={() => handleGenerate()}
                disabled={isGenerating}
                className="flex-1 py-4 bg-gray-800 text-white font-bold rounded-xl shadow-sm hover:bg-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                换个灵感
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 p-12 bg-white rounded-3xl shadow-sm border border-gray-50">
             <div className="w-32 h-32 bg-red-50 rounded-full mx-auto flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#BC002D] opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
             </div>
             <div>
                <p className="text-2xl font-title text-gray-800">准备好祝福了吗？</p>
                <p className="text-gray-400 mt-2">在左侧输入信息，AI 将为您即刻生成马年创意海报</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
