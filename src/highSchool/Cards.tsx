import { cn } from "@/lib/utils";
import styles from "./HighSchool.module.css";
interface Props {
  title: string;
  detail: string;
  className?: string;
}

export default function Cards({ detail, title, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-2.5  pt-3.75 pr-[27.8px] pb-4.25 pl-[26.08] ",
        styles.card,
        className,
      )}
    >
      <img src="/icons/icon_desktop.png" className="w-[61px] h-[61px]" />

      <div className="flex flex-col">
        <p className="text-i-primary text-[22px] font-normal leading-[45px] tracking-[-1.32px]">
          {title}
        </p>
        <p className="text-i-primary opacity-[0.5] text-[16px] font-normal leading-[150%] tracking-[-0.96px]  ">
          {detail}
        </p>
      </div>
    </div>
  );
}
