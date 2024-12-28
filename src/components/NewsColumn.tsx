import { useState  } from 'react';
import { NewsItem,NewsColumnProps } from '@/types/news';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { NewsDialog } from './NewsDialog';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// interface NewsColumnProps {
//   title: string;
//   news: NewsItem[];
//   sentiment: 'positive' | 'negative' | 'neutral';
// }

export function NewsColumn({ title, news, sentiment }: NewsColumnProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getSentimentConfig = () => {
    switch (sentiment) {
      case 'positive':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
          border: 'border-l-4 border-green-500',
          badge: 'bg-green-500',
          icon: <TrendingUp className="w-4 h-4 text-green-500" />
        };
      case 'negative':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30',
          border: 'border-l-4 border-red-500',
          badge: 'bg-red-500',
          icon: <TrendingDown className="w-4 h-4 text-red-500" />
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
          border: 'border-l-4 border-blue-500',
          badge: 'bg-blue-500',
          icon: <Minus className="w-4 h-4 text-blue-500" />
        };
    }
  };

  const config = getSentimentConfig();

  return (
    <>
      <div className={`rounded-lg p-4 ${config.bg}`}>
        <div className="flex items-center gap-2 mb-4">
          {config.icon}
          <h2 className="text-xl font-semibold">{title}</h2>
          <Badge variant="secondary" className={config.badge}>
            {news.length}
          </Badge>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-4">
            {news.map((item) => (
              <Card 
                key={item.id} 
                className={`p-4 hover:shadow-xl transition-all cursor-pointer  hover:scale-[1.02]`}
                onClick={() => {
                  setSelectedNews(item);
                  setDialogOpen(true);
                }}
              >
                <h3 className="font-medium mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.content}
                </p>
                <div className='flex justify-between'>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                  
                </div>
                <div  className="flex items-center text-xs text-muted-foreground gap-1">
                  <p>Source: </p> 
                  <div className='w-4 h-4 rounded-full'>
                    <img src={item.source_icon} alt="source_icon" className="w-full h-full" />
                  </div>
                  <span>{item.source}</span>
                </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <NewsDialog 
        item={selectedNews}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}