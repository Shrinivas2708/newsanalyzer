import React from 'react';
import {Button} from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleAnalyzeCustomNews = () => {
    navigate('/analyze-custom-news');
  };
  const handleGetLatestNews = () => {
    navigate('/latest-news');
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background w-screen">
      <h1 className="text-4xl font-bold mb-8">News Analysis Dashboard</h1>
      <div className=" flex flex-col items-center justify-center gap-5">
        <Button onClick={handleAnalyzeCustomNews} className="w-64">
          Analyze Own or Custom News
        </Button>
        <Button onClick={handleGetLatestNews} className="w-64" >
          Get Latest News from API
        </Button>
      </div>
    </div>
  );
};
export default LandingPage;