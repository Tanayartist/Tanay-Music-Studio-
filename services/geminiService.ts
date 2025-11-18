import { GoogleGenAI, Modality } from "@google/genai";

// Fix: Adhere to guidelines by assuming process.env.API_KEY is always set.
// The non-null assertion (!) is used to satisfy TypeScript's type checker.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateText = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text:", error);
    return "An error occurred while generating the text. Please try again.";
  }
};

export const generateSpeech = async (text: string, voice: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Say with a natural, clear voice: ${text}` }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voice },
                  },
              },
            },
          });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;

    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};