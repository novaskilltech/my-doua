import { AIResponse, Dua } from "@/types";
import { MOCK_DUAS } from "@/data/duas";

export interface AIService {
  analyzeNeed: (inputText: string) => Promise<AIResponse>;
  getSuggestedDuas: (inputText: string) => Promise<Dua[]>;
}

export const aiService: AIService = {
  analyzeNeed: async (inputText: string): Promise<AIResponse> => {
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Client AI fetch error, falling back to local mock:", error);
      return mockAnalyzeNeed(inputText);
    }
  },

  getSuggestedDuas: async (inputText: string): Promise<Dua[]> => {
    const response = await aiService.analyzeNeed(inputText);
    return response.duas;
  }
};

function mockAnalyzeNeed(inputText: string): AIResponse {
  const lowerInput = inputText.toLowerCase();
  const suggestedDuas = MOCK_DUAS.filter(dua => 
    dua.translation.toLowerCase().includes(lowerInput) || 
    dua.categoryIds.some(catId => lowerInput.includes(catId))
  );
  const finalDuas = suggestedDuas.length > 0 ? suggestedDuas : [MOCK_DUAS[0]];
  return {
    id: Math.random().toString(36).substring(7),
    detectedNeed: inputText,
    categories: finalDuas.flatMap(d => d.categoryIds),
    duas: finalDuas,
    createdAt: new Date().toISOString()
  };
}
