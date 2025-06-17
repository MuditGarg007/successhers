import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, BriefcaseBusiness, Crown} from "lucide-react";
import CompanyLogo from "@/components/CompanyLogo";

export interface CompanyCardProps {
  name: string;
  womenInLeadership: number;
  womenInBoard: number;
  womenEmployed: number;
  remote: boolean;
  maternity: boolean;
  onClick?: () => void; // optional click handler
}

export default function CompanyCard({
  name,
  womenInLeadership,
  womenInBoard,
  womenEmployed,
  remote,
  maternity,
  onClick
}: CompanyCardProps) {
  return (
    <Card onClick={onClick} className="bg-card text-primary font-semibold w-full max-w-md rounded-2xl shadow-md border cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex items-center gap-4">
        <CompanyLogo name={name} className="h-14 w-14"/>
        <div>
          <CardTitle className="text-3xl">{name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-md gap-2">
          <Crown className="w-4 h-4" />
        <span className="text-primary font-medium">{womenInLeadership}%</span>Women in Leadership
        </div>
        <div className="flex items-center text-md gap-2">
          <BriefcaseBusiness className="w-4 h-4"/>
          <span>{womenEmployed}% Women Employed</span>
        </div>
        <div className="flex items-center text-md gap-2">
          <Users className="w-4 h-4" />
          <span>{womenInBoard}% Women Board Members</span>
        </div>
        
          {/* <MapPin className="w-4 h-4" /> */}
          
        
        {/* <div className="flex flex-wrap items-center gap-2 ">
            {remote ? (
            <Badge variant="outline" className="bg-gradient-to-tr from-green-500/50 text-sm font-medium">
              Remote Friendly
            </Badge>
            ) : ( 
            <Badge variant="outline" className="bg-gradient-to-tr from-red-500/50 text-sm font-medium">
              Not Remote Friendly
            </Badge>
            )}
        
       {maternity ? (
            <Badge variant="outline" className="bg-gradient-to-tr from-green-500/50 text-sm font-medium"> 
              Maternity Leave Offered
            </Badge>
            ) : ( 
            <Badge variant="outline" className="bg-gradient-to-tr from-red-500/50 text-sm font-medium">
              No Maternity Leave Offered
            </Badge>
            )}
        </div> */}

<div className="flex flex-wrap items-center gap-2 ">
            {remote && (
            <Badge variant="outline" className=" text-md font-medium bg-btn">
              Remote Friendly
            </Badge>
            ) }
        
       {maternity && (
            <Badge variant="outline" className="text-md font-medium bg-btn"> 
              Maternity
            </Badge>
            )}
        </div>

      </CardContent>
    </Card>
  );
}
