import { SectionCards } from "@/components/section-cards";
import { AchievementCards } from "@/components/achievement-cards";
import { InboxSection } from "@/components/inbox-section";
import { ChatSection } from "@/components/chat-section";

import data from "./data.json";


export default function Page() {

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <ChatSection /> */}

          <AchievementCards />

          <SectionCards />

          <InboxSection />
        </div>
      </div>
    </div>
  );
}
