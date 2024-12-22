import { mockNews } from './mock-data';
import { NewsResponse } from '@/types/news';

export async function fetchNewsData(): Promise<NewsResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockNews;
}