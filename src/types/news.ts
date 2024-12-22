export interface NewsItem {
  id: string;
  title: string;
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
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