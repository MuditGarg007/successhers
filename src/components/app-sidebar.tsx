"use client";

import * as React from "react";
import {
  IconHelp,
  IconInnerShadowTop,
  IconRocket,
  IconReport,
  IconSearch,
  IconSettings,
  IconSchool,
  IconClipboardSearch,
  IconBooks,
  IconBriefcase2,
  IconHistory,
  IconChefHat,
  IconClipboardData,
  IconQuestionMark,
} from "@tabler/icons-react";

import { NavLearning } from "@/components/nav-learning";
import { NavJobs } from "@/components/nav-jobs";
import { NavMain } from "@/components/nav-main";
import { NavAssessment } from "@/components/nav-assessment";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Ananya",
    email: "ananya.slayqueen@gmail.com",
    avatar:
      "https://cdn.discordapp.com/attachments/608711474952798221/1380397584606302228/IMG_8385.jpg?ex=684eefae&is=684d9e2e&hm=e221fbb0cbe02d8231694a8e8da34b47b571d0f7db31615238b71bbd0f97d95f&",
  },
  navMain: [],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  jobs: [
    {
      name: "Matched Companies",
      url: "/dashboard/jobs/matched",
      icon: IconBriefcase2,
    },
    {
      name: "My Applicatons",
      url: "/dashboard/jobs/applications",
      icon: IconReport,
    },
    {
      name: "Application History",
      url: "/dashboard/jobs/history",
      icon: IconHistory,
    },
  ],
  assessment: [
    {
      name: "Questionnaire",
      url: "/dashboard/assessment/questionnare",
      icon: IconQuestionMark,
    },
    {
      name: "My Report",
      url: "/dashboard/assessment/report",
      icon: IconClipboardData,
    },
    {
      name: "Suggested Skills",
      url: "#",
      icon: IconChefHat,
    },
  ],
  learning: [
    {
      name: "Kirti AI",
      url: "/dashboard/learning/kirti",
      icon: IconRocket,
    },
    {
      name: "My Courses",
      url: "/dashboard/learning/my-courses",
      icon: IconBooks,
    },
    {
      name: "Completed Courses",
      url: "/dashboard/learning/completed",
      icon: IconSchool,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 "
            > */}

            <a href="#">
              <div className="flex">
                <img src="/images/logo.png" className="w-[2rem]" />
                <span className="text-xl font-bold mx-3">
                  <span>Success</span>
                  <span className="text-[#ee1e7e]">Hers</span>
                </span>
              </div>
            </a>

            {/* </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavJobs items={data.jobs} />
        <NavAssessment items={data.assessment} />
        <NavLearning items={data.learning} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
