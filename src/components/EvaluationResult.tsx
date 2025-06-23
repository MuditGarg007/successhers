import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Wrench, AlertCircle, CheckCircle} from "lucide-react";

export type Evaluation = {
  category?: string;
  rationale?: string;
  skills?: string[] | string;
};

export default function ({evaluation} : {evaluation: Evaluation}) {

    let icon;
    let bg_css : string = "";
    let skill_css : string = "";
    let li_css : string = "";
    let text_color : string = "";
    let circle_css : string = "";

    switch (evaluation.category) {
        case "Needs Work":
            icon = <Wrench size={32}/>
            bg_css = "bg-needs-work";
            skill_css = "skill-needs-work";
            li_css = "li-needs-work";
            text_color = "text-needs-work";
            circle_css = "circle-needs-work";
            break;
        case "Highly Skilled":
            icon = <CheckCircle size={32} />;
            bg_css = "bg-highly-skilled";
            skill_css = "skill-highly-skilled";
            li_css = "li-highly-skilled";
            text_color = "text-highly-skilled";
            circle_css = "circle-highly-skilled";
            break;
        case "Decent Skill":
            icon = <AlertCircle size={32} />
            bg_css = "bg-decent-skill";
            skill_css = "skill-decent-skill";
            li_css = "li-decent-skill";
            text_color = "text-decent-skill";
            circle_css = "circle-decent-skill";
            break;
    }

    return (
        <div className={`relative p-5 w-3/4 flex flex-col items-center justify-center mx-auto rounded-2xl border` }>
          
            {/* category */}
            <Card className={`w-full h-full ${bg_css}`}>
                <CardHeader>
                    <CardDescription>Category:</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4  mt-[-1rem]">
                    <CardTitle className={`text-3xl ${text_color}`}>
                       {icon}
                    </CardTitle>
                   <h1 className={`text-3xl font-semibold ${text_color}`}>{evaluation.category}</h1>
                </CardContent>

            </Card >
            <Card className="mt-2 w-full h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 h-15 w-15 bg-gradient-to-br ${circle_css} opacity-10 rounded-bl-full`}></div>
                    <div className={`absolute bottom-0 left-0 h-20 w-20 bg-gradient-to-tl ${circle_css} opacity-10 rounded-tr-full`}></div>
                <CardHeader>
                    <CardDescription>Rationale:</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-primary mt-[-1rem]">{evaluation.rationale}</p>
                </CardContent>
            </Card>
            <Card className="mt-2 w-full h-full">

                <CardHeader>
                    <CardDescription>Skills:</CardDescription>
                </CardHeader>
                <CardContent> 
                    {evaluation.skills && Array.isArray(evaluation.skills) && evaluation.skills.length > 0 ? (
                        <ul className="flex  flex-col gap-3">
                            {evaluation.skills.map((skill, idx) => (
                                <li className={`border ${li_css} rounded-2xl p-4 text-primary text-center flex items-center`} key={idx}>{skill}</li>
                                ))}
                        </ul>
                        // <ul className="list-disc p-4 mt-[-2rem]">
                        //     {evaluation.skills.map((skill, idx) => (
                        //         <li className={` text-primary`} key={idx}>{skill}</li>
                        //         ))}
                        // </ul>
                        ) : (
                            <span> None</span> 
                            )}
                </CardContent>
            </Card>


        </div>
    )
}