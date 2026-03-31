import { useState } from "react"; 
import { geminiService } from "../services/geminiService";

const useGeminiValidation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const validate = async (beforeImage, afterImage) => {
    setLoading(true);
    try {
      const res = await geminiService(beforeImage,afterImage);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult("Error");
    }
    setLoading(false);
  };

  return { loading, result, validate };
};

export default useGeminiValidation;