import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState('');
 

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_openAI_api_key,
  });
  const openai = new OpenAIApi(configuration);
  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 2,
      size: "1024x1024",
    });

  
    const image_url = response.data.data[0].url;
    setResult(image_url)
    console.log(image_url);
    console.log(prompt)


    

  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
      <h2 className="text-2xl font-bold m-2 font-mono">Generate Image Using Open Ai API</h2>
      <div className="h-full bg-slate-600 p-8 border-2 border-green-400 rounded-2xl flex flex-col space-y-3 w-full">
        <input
          type="text" 
         
          onChange={(e) => setPrompt(e.target.value)}
          className=" focus:bg-blue-300 focus:border-0  bg-blue-400 border-1 p-2 rounded-3xl border-slate-400 text-center text-black font-semibold"
        />
        <button className="bg-yellow-300 rounded-2xl p-2" onClick={generateImage}> Get Image</button>
      </div>
      {result.length > 0 ? (
        <img src={result} alt={prompt} className = "h-56" />
      ): (
        <></>
      )}
    </div>
  );
}

export default App;
