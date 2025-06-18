"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export const description = "An interactive pie chart"



const chartConfig = {
  women_in_leadership: {
    label: "Women in Leadership",
    color: "var(--pink-light)",
  },
  women_employed: {
    label: "Women Employed",
    color: "var(--pink-mid)",
  },
  women_board_members: {
    label: "Women in Board",
    color: "var(--pink-deep)",
  },
} satisfies ChartConfig

import { Company } from '@/store/companyStore';

type ChartPieInteractiveProps = {
  company: Company;
};



export function ChartPieInteractive({company} : ChartPieInteractiveProps) {

  const womenStats = [
  {
    category: "Women in Leadership",
    percentage: company.womenInLeadership,
    fill: "var(--pink-light)",
  },
  {
    category: "Women Employed",
    percentage: company.womenEmployed,
    fill: "var(--pink-mid)",
  },
  {
    category: "Women in Board",
    percentage: company.womenInBoard,
    fill: "var(--pink-deep)",
  },
] 


  const id = "pie-interactive"
  const [activeCategory, setActiveCategory] = React.useState(
    womenStats[0].category
  )

  const activeIndex = React.useMemo(
    () => womenStats.findIndex((item) => item.category === activeCategory),
    [activeCategory]
  )
  const categories = React.useMemo(
    () => womenStats.map((item) => item.category),
    []
  )

  return (
   
    <Card data-chart={id} className="flex flex-col detailelCard-bg ">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="text-3xl">Women's Representation</CardTitle>
          <CardDescription>
            Explore the percentage of women in various roles.
          </CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[200px] rounded-lg pl-2.5"
            aria-label="Select a category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
         <SelectContent align="end" className="rounded-xl">
  {categories.map((category) => {

console.log(category);

    // Create a normalized key from category string
    const key = category.toLowerCase().replaceAll(" ", "_")

    const config = chartConfig[key as keyof typeof chartConfig]
  

    if (!config) return null

    return (
      <SelectItem
        key={category}
        value={category}
        className="rounded-lg [&_span]:flex"
      >
        <div className="flex items-center gap-2 text-xs">
          <span
            className="flex h-3 w-3 shrink-0 rounded-xs"
            style={{
              backgroundColor: `var(--color-${key})`,
            }}
          />
          {config.label}
        </div>
      </SelectItem>
    )
  })}
</SelectContent>

        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={womenStats}
              dataKey="percentage"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
              
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {womenStats[activeIndex].percentage}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Representation
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
   
  )
}
