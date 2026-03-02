// "use client";

import { Badge } from "../../components/ui/badge";
import { cn } from "@/lib/utils";
import CustomFAQ from "../CustomFAQ";
import CustomLabel from "../customLabel/CustomLabel";
import RichTitleRight from "../RichTitleRight";
import SectionTitle from "../SectionTitle";
import SectionHeader from "../SectionHeader";
export type FaqItem = {
  id: string;
  title: string;
  content?: string | null;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "item-1",
    title: "Admission Policies",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    id: "item-2",
    title: "Tuition & Fees",
    content:
      "IAS is committed to academic excellence; providing an international perspective and a comprehensive education; and preparing every student to be future ready IAS is committed to academic excellence; providing an international perspective and a comprehensive education; and preparing every student to be future ready",
  },
  {
    id: "item-3",
    title: "Admission Policies",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    id: "item-4",
    title: "Admission Policies",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    id: "item-5",
    title: "Admission Policies",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
] as const;

type FAQProps = {
  items?: readonly FaqItem[];
  defaultValue?: string;
  color: "white" | "gray";
};

function FAQHeader({ color }: { color: "white" | "gray" }) {
  return (
    <SectionHeader
      richTitleDirection="right"
      richTitleProps={{
        excent: "Answers",
        text: "Got Questions? We've Got",
        className: "md:w-143.75 text-center",
      }}
      sectionTitleProps={{ variant: color }}
    >
      {" "}
      Frequently Asked Questions
    </SectionHeader>
  );
}

export function FAQ({
  items = FAQ_ITEMS,
  defaultValue = "item-2",
  color,
}: FAQProps) {
  const textColorConfig = {
    white: "bg-i-bg-2",
    gray: "bg-i-bg-alt",
  };
  const bgConfig = {
    white: "bg-i-bg-alt",
    gray: "bg-i-bg-2",
  };
  return (
    <div
      className={cn(
        "flex flex-col w-full items-center md:gap-19.25 gap-[65px] mobile-padding md:pt-5 md:py-25 h-fit ",
        bgConfig[color],
      )}
    >
      <FAQHeader color={color} />

      <CustomFAQ faqData={[]} bg={textColorConfig[color]} />
    </div>
  );
}
