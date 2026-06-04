import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { MOCK_DUAS } from '@/data/duas';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  let inputText = '';
  try {
    const body = await request.json();
    inputText = body.inputText || '';

    if (!inputText) {
      return NextResponse.json({ error: 'inputText is required' }, { status: 400 });
    }

    if (!apiKey) {
      console.warn("Gemini API key is missing on the server. Falling back to mock logic.");
      return NextResponse.json(mockAnalyzeNeed(inputText));
    }

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

    return NextResponse.json({
      id: Math.random().toString(36).substring(7),
      detectedNeed: result.detectedNeed || inputText,
      categories: result.categories || finalDuas.flatMap(d => d.categoryIds),
      duas: finalDuas,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Gemini AI API Route error:", error);
    // Return mock on error to maintain app service availability
    return NextResponse.json(mockAnalyzeNeed(inputText));
  }
}

function mockAnalyzeNeed(inputText: string) {
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
