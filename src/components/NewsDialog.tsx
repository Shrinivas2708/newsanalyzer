import { NewsItem } from "@/types/news";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Calendar, TrendingUp, TrendingDown, Minus, ExternalLinkIcon } from "lucide-react";

interface NewsDialogProps {
  item: NewsItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsDialog({ item, open, onOpenChange }: NewsDialogProps) {
  if (!item) return null;

  const getSentimentConfig = (sentiment: NewsItem["sentimentr"]) => {
    switch (sentiment) {
      case "positive":
        return {
          color: "text-green-500",
          badge: "bg-green-500/10 text-green-500",
          icon: <TrendingUp className="w-4 h-4" />,
        };
      case "negative":
        return {
          color: "text-red-500",
          badge: "bg-red-500/10 text-red-500",
          icon: <TrendingDown className="w-4 h-4" />,
        };
      default:
        return {
          color: "text-blue-500",
          badge: "bg-blue-500/10 text-blue-500",
          icon: <Minus className="w-4 h-4" />,
        };
    }
  };
console.log("item:", item);
  const config = getSentimentConfig(item.sentimentr);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={config.badge}>
              <span className={`mr-1 ${config.color}`}>{config.icon}</span>
              {item.sentimentr.charAt(0).toUpperCase() + item.sentimentr.slice(1)}
            </Badge>
          </div>
          <div >
            <img src={item.img} alt="news_img" className="w-100% h-30 object-cover"  />
          </div>
          <DialogTitle className="text-2xl">{item.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {item.content}
          </p>
          <div className="flex justify-between">
            <div className="mt-6 flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
            </div>
            <div className="mt-6 flex items-center text-xs text-muted-foreground gap-1">
              <p>Source: </p>
              <div className="w-4 h-4 rounded-full">
                <img
                  src={item.source_icon}
                  alt="source_icon"
                  className="w-full h-full"
                />
              </div>
              <a className="flex text-muted-foreground" href={item.newsUrl} target="_blank" rel="noreferrer">
              <ExternalLinkIcon className="w-4 h-4 mr-1 " /><span>{item.source}</span>
                </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
