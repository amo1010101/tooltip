import * as React from "react";
import { cn } from "@/lib/utils";

interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

interface VerticalTabsProps {
  tabs: { id: string; title: string; content: React.ReactNode }[];
  defaultTabId?: string;
  className?: string;
}

export const Tab = ({ active, className, children, ...props }: TabProps) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center border-l-2 px-4 py-2 text-sm",
        active
          ? "border-primary bg-muted text-primary"
          : "border-transparent hover:bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const VerticalTabs = ({
  tabs,
  defaultTabId,
  className,
}: VerticalTabsProps) => {
  const [activeTab, setActiveTab] = React.useState(
    defaultTabId || tabs[0]?.id || ""
  );

  const activeContent = React.useMemo(() => {
    return tabs.find((tab) => tab.id === activeTab)?.content;
  }, [activeTab, tabs]);

  return (
    <div className={cn("flex flex-col md:flex-row", className)}>
      <div className="border-b border-border md:w-64 md:border-b-0 md:border-r">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </Tab>
        ))}
      </div>
      <div className="flex-1 p-4">{activeContent}</div>
    </div>
  );
};

export default VerticalTabs; 