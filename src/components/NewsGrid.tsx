import { NewsResponse } from '@/types/news';
import { NewsColumn } from './NewsColumn';

interface NewsGridProps {
  news: NewsResponse['news'];
}

export function NewsGrid({ news }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <NewsColumn
        title="Positive News"
        news={news.positive}
        sentiment="positive"
      />
      <NewsColumn
        title="Neutral News"
        news={news.neutral}
        sentiment="neutral"
      />
      <NewsColumn
        title="Negative News"
        news={news.negative}
        sentiment="negative"
      />
    </div>
  );
}