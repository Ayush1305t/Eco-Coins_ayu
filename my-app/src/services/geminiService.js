import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API Key missing");
  return new GoogleGenAI({ apiKey });
};

const toBase64 = (source) => {
  if (typeof source === "string" && source.startsWith("data:")) {
    return { base64: source.split(",")[1], mimeType: source.split(";")[0].split(":")[1] };
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(source);
    reader.onload = () => {
      const dataUrl = reader.result;
      resolve({
        base64: dataUrl.split(",")[1],
        mimeType: dataUrl.split(";")[0].split(":")[1],
      });
    };
    reader.onerror = reject;
  });
};

export const geminiService = async (beforeImage, afterImage, beforeMeta = {}, afterMeta = {}) => {
  try {
    const ai = getAI();
    const before = await toBase64(beforeImage);
    const after = await toBase64(afterImage);

    const buildLocationStr = (meta) => {
      if (!meta) return "unknown";
      const loc = meta.location
        ? `Lat ${meta.location.latitude}, Lon ${meta.location.longitude} (±${meta.location.accuracy}m)`
        : "location unavailable";
      return `Date: ${meta.date || "N/A"}, Time: ${meta.time || "N/A"}, GPS: ${loc}`;
    };

    const prompt = `You are a strict cleaning validation AI for the Rewards – Clean India initiative.

BEFORE photo metadata: ${buildLocationStr(beforeMeta)}
AFTER photo metadata: ${buildLocationStr(afterMeta)}

Analyse the two images carefully:
- Image 1 (BEFORE cleaning): Shows the area before cleanup
- Image 2 (AFTER cleaning): Shows the area after cleanup

Evaluate:
1. Is the area visibly cleaner in the AFTER photo compared to BEFORE?
2. Are both photos of the same or very similar location?
3. Is there any sign of fraud?

Respond ONLY in the following JSON format (no markdown, no extra text):
{
  "verdict": "CLEANED" or "NOT_CLEANED" or "FRAUD_DETECTED",
  "confidence": "HIGH" or "MEDIUM" or "LOW",
  "details": "One sentence explaining your decision"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: before.mimeType, data: before.base64 } },
            { inlineData: { mimeType: after.mimeType, data: after.base64 } },
            { text: prompt },
          ],
        },
      ],
    });

    const raw = response.candidates[0].content.parts[0].text.trim();

    try {
      return JSON.parse(raw);
    } catch {
      const upper = raw.toUpperCase();
      if (upper.includes("NOT_CLEANED") || upper.includes("NOT CLEANED")) {
        return { verdict: "NOT_CLEANED", confidence: "LOW", details: raw };
      }
      if (upper.includes("FRAUD")) {
        return { verdict: "FRAUD_DETECTED", confidence: "LOW", details: raw };
      }
      return { verdict: "CLEANED", confidence: "LOW", details: raw };
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};