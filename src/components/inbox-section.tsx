import { ApplicationsTable } from "./applications-table";
import { Card } from "@/components/ui/card";
export function InboxSection() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
      <Card className="@container/card">
        <ApplicationsTable />
      </Card>
      <Card className="@container/card">
        <ApplicationsTable />
      </Card>
    </div>
  );
}
