import { useState, useEffect } from 'react';
import { NewsResponse } from '@/types/news';
import { NewsGrid } from '@/components/NewsGrid';
import { AnalysisView } from '@/components/AnalysisView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, RefreshCcw, Newspaper } from 'lucide-react';
import { fetchNewsData } from '@/lib/api';
import { useTheme } from '@/hooks/use-theme';

function App() {
  useTheme();
  const [news, setNews] = useState<NewsResponse['news'] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNewsData();
      setNews(data.news);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading || !news) {
    return (
      <div className="h-screen w-screen  flex items-center justify-center bg-background">
        <RefreshCcw className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              News Analysis Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={fetchNews}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </header>

      <main className="container mx-auto">
        <Tabs defaultValue="news" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="news" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart className="w-4 h-4 mr-2" />
              News Feed
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <PieChart className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="news">
            <NewsGrid news={news} />
          </TabsContent>
          <TabsContent value="analysis">
            <AnalysisView news={news} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;