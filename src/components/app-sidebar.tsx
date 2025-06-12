"use client";

import * as React from "react";
import {
  IconHelp,
  IconInnerShadowTop,
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
    name: "shloku rehman",
    email: "shlokurehman@slayqueen.com",
    avatar:
      "https://cdn.discordapp.com/attachments/608711490223996995/1377200085238026281/cb9611be8f9280ac2a776512b2fd26ba.jpg?ex=68454807&is=6843f687&hm=441726a1d940d079df14da7832c8417ddfadb63d4ca0cbc2eee0da2d6aefe752&",
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
      name: "Recommended Courses",
      url: "#",
      icon: IconClipboardSearch,
    },
    {
      name: "My Courses",
      url: "#",
      icon: IconBooks,
    },
    {
      name: "Completed Courses",
      url: "#",
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
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 "
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">SuccessHers</span>
              </a>
            </SidebarMenuButton>
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
