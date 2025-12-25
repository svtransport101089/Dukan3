
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getShoppingAdvice(query: string) {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are a friendly shopping assistant for Parthi's Digital Shop.
    Available Products: ${JSON.stringify(PRODUCTS.map(p => ({ name: p.name, price: p.price, desc: p.description })))}
    
    Guidelines:
    - Help users choose products based on their needs.
    - Keep answers short and polite.
    - If they want to "add" something, tell them they can click the "Add to Cart" button, or if you are calling a function, do it.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      systemInstruction,
    },
  });

  return response.text;
}

export async function analyzeShoppingRequest(query: string) {
  const model = "gemini-3-flash-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: query,
    config: {
      systemInstruction: "Determine if the user wants to add a specific item from our shop to their cart. If yes, identify the product name from the list: Tea, Coffee, Biscuit, Pen, Notebook.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          shouldAdd: { type: Type.BOOLEAN },
          productName: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["shouldAdd"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    return { shouldAdd: false };
  }
}
