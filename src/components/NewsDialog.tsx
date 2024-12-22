import { NewsItem } from '@/types/news';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsDialogProps {
  item: NewsItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsDialog({ item, open, onOpenChange }: NewsDialogProps) {
  if (!item) return null;

  const getSentimentConfig = (sentiment: NewsItem['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return {
          color: 'text-green-500',
          badge: 'bg-green-500/10 text-green-500',
          icon: <TrendingUp className="w-4 h-4" />
        };
      case 'negative':
        return {
          color: 'text-red-500',
          badge: 'bg-red-500/10 text-red-500',
          icon: <TrendingDown className="w-4 h-4" />
        };
      default:
        return {
          color: 'text-blue-500',
          badge: 'bg-blue-500/10 text-blue-500',
          icon: <Minus className="w-4 h-4" />
        };
    }
  };

  const config = getSentimentConfig(item.sentiment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={config.badge}>
              <span className={`mr-1 ${config.color}`}>{config.icon}</span>
              {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
            </Badge>
          </div>
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {item.content}
          </p>
          <div className="mt-6 flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}