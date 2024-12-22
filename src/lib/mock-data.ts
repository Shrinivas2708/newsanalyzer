import { NewsResponse, Sentiment } from '@/types/news';

export const mockNews: NewsResponse = {
  news: {
    positive: [
      {
        id: '1',
        title: 'Global Renewable Energy Usage Hits Record High',
        content: 'Renewable energy sources now account for 30% of global electricity production, marking a significant milestone in the fight against climate change.',
        sentiment: 'positive' as Sentiment,
        date: '2024-03-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'Breakthrough in Cancer Research',
        content: 'Scientists discover new treatment method that shows promising results in early-stage trials.',
        sentiment: 'positive' as Sentiment,
        date: '2024-03-14T15:45:00Z'
      }
    ],
    neutral: [
      {
        id: '3',
        title: 'Market Remains Stable Despite Changes',
        content: 'Global markets show resilience as major economies adjust monetary policies.',
        sentiment: 'neutral' as Sentiment,
        date: '2024-03-15T09:15:00Z'
      },
      {
        id: '4',
        title: 'New Technology Standards Proposed',
        content: 'Industry leaders gather to discuss standardization of emerging technologies.',
        sentiment: 'neutral' as Sentiment,
        date: '2024-03-14T11:20:00Z'
      }
    ],
    negative: [
      {
        id: '5',
        title: 'Supply Chain Disruptions Continue',
        content: 'Global shipping delays persist, affecting various industries worldwide.',
        sentiment: 'negative' as Sentiment,
        date: '2024-03-15T08:00:00Z'
      },
      {
        id: '6',
        title: 'Cybersecurity Threats on the Rise',
        content: 'Experts warn of increasing sophisticated cyber attacks targeting infrastructure.',
        sentiment: 'negative' as Sentiment,
        date: '2024-03-14T16:30:00Z'
      }
    ]
  }
};