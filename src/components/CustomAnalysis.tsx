// import React from 'react'
import {useState} from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import getSentiment from '@/lib/sentiment';
import { useNavigate } from 'react-router-dom';
interface CustomNews {
  title: string;
  description: string;
}
function CustomAnalysis() : JSX.Element {
  const navigate = useNavigate();
    const [customnews , setCustomNews] = useState<CustomNews>({title: "", description: ""})
    const [sentiment , setSentiment] = useState<string>("")
    function handleCustomAnalyze() {
       console.log("Title: " + customnews.title)
       console.log("Description: " + customnews.description)
       const news = customnews.title +  customnews.description;
      //  console.log(news)
      if(customnews.title && customnews.description){
       const sentiment =getSentiment(news)
       setSentiment(sentiment)
       console.log(sentiment)
      }
       
    }
  return (
    <div>
   
   
   <div className="flex flex-col items-center justify-center h-screen bg-background w-screen  ">
    <div className=' w-[50%] cursor-pointer' onClick={()=>{navigate('/')}}>{"< "}Go Back</div>
     <h1 className="text-4xl font-bold mb-8">Custom Analysis</h1>
     <div className="space-y-4 w-[75%] flex flex-col items-center  ">
       <Input placeholder="Enter News Title" className="w-[50%]" onChange = {(e)=> setCustomNews({...customnews, title:e.target.value})} />
       <Input placeholder="Enter News Description" className="w-[50%] " onChange = {(e)=> setCustomNews({...customnews, description:e.target.value})} />
       <Button className="w-[20%]" onClick={handleCustomAnalyze}>Analyze</Button>
       {/* <Input placeholder="Enter News Source" className="w-64" /> */}
     </div>
     <div className='mt-5'>
     {sentiment && sentiment == "positive" && <div className="text-green-500 text-center">The news is {sentiment}</div>}
     {sentiment && sentiment == "negative" && <div className="text-red-500 text-center">The news is {sentiment}</div>}
     {sentiment && sentiment == "neutral" && <div className="text-gray-500 text-center">The news is {sentiment}</div>}
  
     </div>
        </div>
    </div>
)
}

export default CustomAnalysis