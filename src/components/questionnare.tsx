"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const jobInterestItems = [
  { id: "technology", label: "Technology / IT" },
  { id: "design", label: "Design / Creativity" },
  { id: "teaching", label: "Teaching / Training" },
  { id: "business", label: "Business / Marketing" },
  { id: "health", label: "Health / Wellness" },
  { id: "other", label: "Other (please specify)" },
] as const;

const goalItems = [
  { id: "first_job", label: "Get my first job" },
  { id: "upskill", label: "Change my field / upskill" },
  { id: "restart", label: "Restart my career after a break" },
] as const;

const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid email address."),
  education: z.string(),
  experience: z.string(),
  interest: z.string(),
  skills: z.string(),
  goal: z.string(),
  jobInterests: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one job interest.",
    }),
  otherJobInterest: z.string().optional(),
  hoursPerWeek: z
    .number()
    .min(1, "Please select how many hours you can dedicate."),
  currentGoal: z.string().min(1, "Please select your current goal."),
});

export function Questionnare() {
  const { setName, setEmail, setQuestionnaire, setUserSkills } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      education: "",
      experience: "",
      interest: "",
      skills: "",
      goal: "",
      jobInterests: [],
      otherJobInterest: "",
      hoursPerWeek: 1,
      currentGoal: "",
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setName(values.name);
    setEmail(values.email);
    setQuestionnaire({
      ...values,
      hoursPerWeek: String(values.hoursPerWeek),
    });
    setLoading(true);
    setError(null);

    try {
      // Call the /api/skills route with the questionnaire data
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: JSON.stringify(values, null, 2) }),
      });
      const data = await res.json();

      console.log("Body::::", JSON.stringify(values, null, 2));

      if (!res.ok) {
        setError(data.error || "Failed to get evaluation.");
        setLoading(false);
        return;
      }

      // Try to parse the script as JSON
      let evaluation = null;
      try {
        evaluation = JSON.parse(data.script);
      } catch {
        // Try to extract JSON from the string using RegExp
        const match = data.script.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            evaluation = JSON.parse(match[0]);
          } catch {
            evaluation = {
              category: "Error",
              rationale: "Could not parse evaluation result.",
            };
          }
        } else {
          evaluation = {
            category: "Error",
            rationale: "Could not parse evaluation result.",
          };
        }
      }
      localStorage.setItem("skillsEvaluation", JSON.stringify(evaluation));

      // Extract skills from evaluation
      let skills: string[] = [];
      if (evaluation.skills) {
        if (Array.isArray(evaluation.skills)) {
          skills = evaluation.skills;
        } else if (typeof evaluation.skills === "string") {
          try {
            const arr = JSON.parse(evaluation.skills);
            if (Array.isArray(arr)) {
              skills = arr;
            } else {
              skills = evaluation.skills
                .split(",")
                .map((s: string) => s.trim());
            }
          } catch {
            skills = evaluation.skills.split(",").map((s: string) => s.trim());
          }
        }
      }
      setUserSkills(skills);
      // console.log("skills", skills);
      setLoading(false);
      router.push("/dashboard/assessment/suggestedskills");
    } catch (err) {
      setError("Failed to get evaluation.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-50">
      <h1 className="text-3xl mb-15 mt-4 font-bold">
        Personalize Your Path to Success
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className="w-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="w-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your highest level of education?</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter education level"
                    {...field}
                    className="w-100"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Do you have prior work experience?
                  </FormLabel>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="experience-yes" />
                      <Label htmlFor="experience-yes">No experience</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="experience-no" />
                      <Label htmlFor="experience-no">Less than 1 year</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="experience-no" />
                      <Label htmlFor="experience-no">1–3 years</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="experience-no" />
                      <Label htmlFor="experience-no">3+ years</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobInterests"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Which type of jobs interest you most?
                  </FormLabel>
                </div>
                {jobInterestItems.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="jobInterests"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>

                        {item.id === "other" &&
                          field.value?.includes("other") && (
                            <Input
                              className="ml-2"
                              placeholder="Please specify"
                              {...form.register("otherJobInterest")}
                            />
                          )}
                      </FormItem>
                    )}
                  />
                ))}
                <FormMessage />
                <FormDescription>You can choose multiple</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hoursPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  How many hours per week can you dedicate to work?
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter number of hours"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentGoal"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">
                    What is your current goal?
                  </FormLabel>
                </div>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  {goalItems.map((item) => (
                    <div className="flex items-center space-x-2" key={item.id}>
                      <RadioGroupItem value={item.id} id={`goal-${item.id}`} />
                      <Label htmlFor={`goal-${item.id}`}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Evaluating..." : "Submit"}
          </Button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </Form>
    </div>
  );
}
