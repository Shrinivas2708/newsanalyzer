export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  sentiment: Sentiment;
  date: string;
}

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