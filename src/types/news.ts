export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  sentiment: Sentiment;
  date: string;
  img?: string;
  newsUrl?: string;
  source?: string;
  source_icon?: string;
}
/* Coming From Backend:
  id: article.article_id || Date.now().toString(),
            title: title,
            content: description,
            sentiment,
            date: article.pubDate,
            img: article.image_url,
            newsUrl: article.link,
            source: article.source_name,
            source_icon: article.source_icon
*/
export interface NewsResponse {
  news: {
    positive: NewsItem[];
    negative: NewsItem[];
    neutral: NewsItem[];
  };
}

export interface AnalyticsData {
  distribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}
export interface NewsColumnProps {
  title: string;
  news: NewsItem[];
  sentiment: 'positive' | 'negative' | 'neutral';
}