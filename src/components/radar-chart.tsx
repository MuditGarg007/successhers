"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with dots";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartRadarDots() {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-auto aspect-square max-h-[200px] p-0"
        >
          <RadarChart
            data={chartData}
            margin={{ top: 0, right: 50, bottom: 0, left: 20 }}
          >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" tick={{ fontSize: 12 }} />
            <PolarGrid />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
