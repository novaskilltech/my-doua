import { AIResponse, Dua } from "@/types";
import { MOCK_DUAS } from "@/data/duas";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export interface AIService {
  analyzeNeed: (inputText: string) => Promise<AIResponse>;
  getSuggestedDuas: (inputText: string) => Promise<Dua[]>;
}

export const aiService: AIService = {
  analyzeNeed: async (inputText: string): Promise<AIResponse> => {
    if (!apiKey) {
      console.warn("Gemini API key is missing. Falling back to mock logic.");
      return mockAnalyzeNeed(inputText);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `L'utilisateur exprime ce besoin : "${inputText}". 
        Parmi les invocations (dou'as) disponibles, choisis les plus pertinentes.
        Voici les dou'as disponibles : ${JSON.stringify(MOCK_DUAS)}.
        
        Réponds au format JSON avec :
        - detectedNeed: une version reformulée du besoin de l'utilisateur.
        - categories: les catégories associées.
        - selectedDuaIds: les IDs des dou'as sélectionnées parmi la liste fournie.
        - explanation: une courte explication de pourquoi ces dou'as ont été choisies.`,
        config: {
          responseMimeType: "application/json",
        }
      });

      const result = JSON.parse(response.text || "{}");
      const selectedDuas = MOCK_DUAS.filter(d => result.selectedDuaIds?.includes(d.id));
      const finalDuas = selectedDuas.length > 0 ? selectedDuas : [MOCK_DUAS[0]];

      return {
        id: Math.random().toString(36).substring(7),
        detectedNeed: result.detectedNeed || inputText,
        categories: result.categories || finalDuas.flatMap(d => d.categoryIds),
        duas: finalDuas,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error("Gemini AI error:", error);
      return mockAnalyzeNeed(inputText);
    }
  },

  getSuggestedDuas: async (inputText: string): Promise<Dua[]> => {
    const response = await aiService.analyzeNeed(inputText);
    return response.duas;
  }
};

async function mockAnalyzeNeed(inputText: string): Promise<AIResponse> {
  await new Promise(resolve => setTimeout(resolve, 1500));
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
