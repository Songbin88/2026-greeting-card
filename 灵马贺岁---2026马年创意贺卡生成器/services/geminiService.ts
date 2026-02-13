
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

export const generateGreeting = async (sender: string, receiver: string): Promise<GeminiResponse> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  
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
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            greeting: {
              type: Type.STRING,
              description: "The main creative greeting sentence.",
            },
            subtext: {
              type: Type.STRING,
              description: "A short auspicious subtext or explanation.",
            },
          },
          required: ["greeting", "subtext"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
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
