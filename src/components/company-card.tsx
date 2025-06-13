import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Percent } from "lucide-react";

interface CompanyCardProps {
  name: string;
  logoUrl: string;
  matchPercent: number;
  womenInTech: number;
  location: string;
  roles: string[];
  tags?: string[];
  isRemote: boolean;
  industry: string;
}

export default function CompanyCard({
  name,
  logoUrl,
  matchPercent,
  womenInTech,
  location,
  roles,
  tags = [],
  isRemote,
  industry,
}: CompanyCardProps) {
  return (
    <Card className="bg-gradient-to-tr from-pink-400/30 backdrop-blur-mdtext-card-foreground w-full max-w-md rounded-2xl shadow-md border cursor-pointer hover:from-pink-400/40 shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex items-center gap-4">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div>
          <CardTitle className="text-3xl">{name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm gap-2">
          <Percent className="w-4 h-4" />
          <span className="text-primary font-medium">{matchPercent}%</span>{" "}
          Skill Match
        </div>
        <div className="flex items-center text-sm gap-2">
          <Users className="w-4 h-4" />
          <span>{womenInTech}% Women in Tech</span>
        </div>
        <div className="flex items-center text-sm gap-2">
          <MapPin className="w-4 h-4" />
          <span>
            {location} • {isRemote ? "Remote-Friendly" : "On-Site"}
          </span>
        </div>
        <div className="text-sm">
          <strong>Matched Roles:</strong> {roles.slice(0, 3).join(", ")}
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, i) => (
            <Badge key={i} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
