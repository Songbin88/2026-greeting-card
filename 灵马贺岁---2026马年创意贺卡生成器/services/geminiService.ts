import { GeminiResponse } from "../types";

export const generateGreeting = async (sender: string, receiver: string): Promise<GeminiResponse> => {
  // 构建提示词
  const prompt = `
    你是一位精通中华传统文化和现代创意的文案大师。
    现在是2026年农历马年前夕，请为发件人 "${sender}" 制作一份送给 "${receiver}" 的创意祝福。
    要求：
    1. 必须包含“马”字或者其谐音字（如：码、犸、玛、马上、马到成功等）。
    2. 祝福语要新颖、俏皮且吉祥，适合在社交媒体分享。
    3. 返回一个主标题（greeting）和一个副标题或简短解释（subtext）。
    请以 JSON 格式返回。
  `;

  try {
    // 关键点：不再请求 Google 官方地址，而是请求你自己的中转接口
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('网络请求异常');
    }

    const data = await response.json();
    
    // 解析从 Vercel 中转回来的结果
    // 这里的解析逻辑需匹配 Gemini 3 Flash 的返回结构
    const rawText = data.candidates[0].content.parts[0].text;
    const result = JSON.parse(rawText || "{}");

    return {
      greeting: result.greeting || "马到成功，万事胜意！",
      subtext: result.subtext || "祝你在新的一年里龙马精神，一马当先！",
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      greeting: "马到成功",
      subtext: "祝你在新的一年里，龙马精神，万事如意！",
    };
  }
};
