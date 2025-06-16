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
    <div className="grid grid-cols-3 gap-4 px-4 lg:px-6 h-50 mt-5">
      <Card className="@container/card col-span-2">
        <CardHeader>My Badges</CardHeader>
        <div className="badges flex justify-around">
          <img src="/images/quicklearner.png" alt="" className="w-15" />
          <img src="/images/jobexplorer.png" alt="" className="w-15" />
          <img src="/images/goalsetter.png" alt="" className="w-15" />
          <img src="/images/consistencyqueen.png" alt="" className="w-20" />
        </div>
        <div className="flex justify-around">
          <CardDescription>Quick Learner</CardDescription>
          <CardDescription>Job Explorer</CardDescription>
          <CardDescription>Goal Setter</CardDescription>
          <CardDescription>Consistency Queen</CardDescription>
        </div>
      </Card>
      <Card className="@container/card col-span-1 p-0">
        <CardContent className="pb-4 p-0">
          <ChartRadarDots />
        </CardContent>
      </Card>
    </div>
  );
}
