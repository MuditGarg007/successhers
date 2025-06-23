'use client';

import { useState } from 'react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { SkillCourses } from "@/app/dashboard/learning/my-courses/page";
import { Link, ChevronDown } from 'lucide-react';
import NextLink from "next/link";

export default function CourseCard({skillCourses} :{skillCourses : SkillCourses[]}) {

    const [isOpen, setIsOpen]  = useState(false);

    return ( 
        
        <div className="grid grid-cols-1 gap-6 p-6 m-4l">
            <h1 className="text-pink-700 text-2xl font-semibold">Suggested Courses</h1>
        {skillCourses.map((skillBlock : SkillCourses, idx : number) => (
            <div key={idx} className=" w-3/4">
            <Collapsible>
                    
            <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:bg-muted transition">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>{skillBlock.skill}</CardTitle>
                        <ChevronDown className="h-5 w-5" />
                    </CardHeader>
                    </Card>
            </CollapsibleTrigger>

                <CollapsibleContent>
                <Card className="border-t-0 rounded-t-none">
                <CardContent className="space-y-2">
                    {skillBlock.courses.map((course, cidx) => (
                         <div className="border p-4 rounded-2xl" key={cidx}>
                        <div className="text-pink-700 text-lg flex gap-1 cursor-pointer transition-all duration-300 hover:scale-95">
                            <NextLink href={course.url} target="_blank" rel="noopener noreferrer">{course.title}</NextLink>
                            <Link size={"20px"}/>
                        </div>                
                         {" "}
                         <span className="text-sm text-gray-500">({course.provider}, {course.level})</span>
                        <div className="text-sm mt-3">{course.rationale}</div></div>
                    ))}
                   
                </CardContent>
                </Card>
                </CollapsibleContent>
                </Collapsible>
            </div>
    ))}
</div>



    )

  

}