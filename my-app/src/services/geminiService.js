import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "YouApi",
});

export const geminiService = async (beforeImage, afterImage) => {
  try {
    const toBase64 = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result.split(",")[1]);
        };
      });

    const beforeBase64 = await toBase64(beforeImage);
    const afterBase64 = await toBase64(afterImage);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: beforeBase64,
              },
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: afterBase64,
              },
            },
            {
              text: `
Compare these two images.
First image is BEFORE cleaning.
Second image is AFTER cleaning.

Reply only:
Cleaned or Not Cleaned
              `,
            },
          ],
        },
      ],
    }); 

    return response.text;
  } catch (error) {
    console.error(error);
    return "Error analyzing images";
  }
};