import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ChartRadarDots } from "@/components/radar-chart";

export function AchievementCards() {
  return (
    <div className="grid grid-cols-3 gap-4 px-4 lg:px-6 h-50">
      <Card className="@container/card col-span-2">
        <CardHeader>My Badges</CardHeader>
      </Card>
      <Card className="@container/card col-span-1 p-0">
        <CardContent className="pb-4 p-0">
          <ChartRadarDots />
        </CardContent>
      </Card>
    </div>
  );
}
