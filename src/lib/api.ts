import {  NewsResponse } from '@/types/news';
// import { mockNews } from './mock-data';
import Sentiment from "sentiment";
import axios from 'axios';
const NEWS_API_KEY = "pub_6358169c5b1ba7a1c01654f9c30f1ff49a4b9";
const NEWS_API_URL = "https://newsdata.io/api/1/latest";
interface NewsItemss {
    id: string;
    title: string;
    content: string;
    sentiment: string;
    date: string;
    image_url?: string;
    newsUrl?: string;
    source?: string;
    source_icon?: string;
    description?: string;
    article_id?: string;
    pubDate?: string;
    link?: string;
    source_name?: string;

  }
async function fetchNewsPos() {
    try {
      const response = await axios.get(NEWS_API_URL, {
        params: {
          apiKey: NEWS_API_KEY,
          language: "en",
          country: "in",
          category: "tourism",
        },
      });
      console.log("Response Pos:", response.data.results);
      return response.data.results;
    } catch {
      console.error("Error fetching news:");
      throw new Error("Failed to fetch news.");
    }
  }
  async function fetchNewsNeg() {
    try {
      const response = await axios.get(NEWS_API_URL, {
        params: {
          apiKey: NEWS_API_KEY,
          language: "en",
          country: "in",
          category: "crime",
        },
      });
      console.log("Response Neg:", response.data.results);
  
      return response.data.results;
    } catch  {
      console.error("Error fetching news:");
      throw new Error("Failed to fetch news.");
    }
  }
  
  function getSentiment(text : string): "positive" | "negative" | "neutral" {
    if (!text || typeof text !== "string") {
      return "neutral";
    }
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
  
    if (result.score > 0) return "positive";
    if (result.score < 0) return "negative";
    return "neutral";
  }
 export async function fetchNewsData(): Promise<NewsResponse> {
//  const response = await axios.get<NewsResponse>('http://localhost:5000/api/news');
//  console.log(response.data);
//  return response.data;
// await new Promise((resolve) => {
//     setTimeout(() => {
//         resolve(mockNews);
//     }, 1000);
// });
// console.log("fetchNewsData :" , mockNews);
//     return mockNews;

try {
    const newspos = await fetchNewsPos();
    const newsneg = await fetchNewsNeg();
    const news = newspos.concat(newsneg);
    const newsWithSentiment = await Promise.all(
        news.map(async (newsItem : NewsItemss) => {
            try {
              const title = newsItem.title || "";
              const description = newsItem.description || "";
              const content = `${title} ${description}`.trim();
              const sentimentr =  getSentiment(content);
              return {
                id: newsItem.article_id || Date.now().toString(),
                title: title,
                content: description,
                sentimentr,
                date: newsItem.pubDate,
                img: newsItem.image_url,
                newsUrl: newsItem.link,
                source: newsItem.source_name,
                source_icon: newsItem.source_icon,
              };
            } catch (error) {
              console.error(`Error analyzing article: ${newsItem.title}`, error);
            }
          })
    )
    console.log("Sentiments:", newsWithSentiment.map(item => item.sentimentr));
    const groupedNews = {
        news: {
            positive: newsWithSentiment.filter((item) => item.sentimentr === "positive"),
            negative: newsWithSentiment.filter((item) => item.sentimentr === "negative"),
            neutral: newsWithSentiment.filter((item) => item.sentimentr === "neutral"),
        },
      };
      return groupedNews;
  } catch  {
    console.error(`Error fetching news: `);
    return {
        news: {
            positive: [],
            negative: [],
            neutral: [],
        },
    // throw new Error("Failed to fetch news.");
  }
}
 }
