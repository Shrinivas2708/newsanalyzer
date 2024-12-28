import { NewsResponse, AnalyticsData } from '@/types/news';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface AnalysisViewProps {
  news: NewsResponse['news'];
}

export function AnalysisView({ news }: AnalysisViewProps) {
  const calculateAnalytics = (news: NewsResponse['news']): AnalyticsData => {
    const total = Object.values(news).flat().length;
    return {
      distribution: {
        positive: Number(((news.positive.length / total) * 100).toFixed(1)),
        negative: Number(((news.negative.length / total) * 100).toFixed(1)),
        neutral: Number(((news.neutral.length / total) * 100).toFixed(1)),
      },
    };
  };

  const analytics = calculateAnalytics(news);
  const data = Object.entries(analytics.distribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Card className="w-[50%] ml-7 mt-10 h-[70%]  from-card to-muted">
        <h2 className="text-2xl font-semibold p-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
          Sentiment Distribution
        </h2>
        <div className="h-[calc(100%-6rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}