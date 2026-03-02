"use client";
import Link from "next/link";

type QuickLink = {
  label:
    | "Middle School"
    | "Elementary School"
    | "Kinder Garden"
    | "High School";
  href: string;
};

const LINKS: QuickLink[] = [
  { label: "Middle School", href: "/academic-programs/middle-school" },
  { label: "Elementary School", href: "/academic-programs/elemntary-school" },
  { label: "Kinder Garden", href: "/academic-programs/kinder-garden" },
  { label: "High School", href: "/academic-programs/high-school" },
];
type TProps = {
  activeTab: QuickLink["label"];
};

export default function QuickLinks({ activeTab }: TProps) {
  return (
    <section className="flex flex-center items-center justify-center w-full  md:py-25 md:px-5.75">
      <div className=" flex w-[96vw] flex-col items-start rounded-[15px] bg-white px-6 py-6 gap-4">
        <p className="text-[20px] italic font-normal leading-[150%] tracking-[-1.2px] bg-linear-to-r from-i-secondary to-i-secondary-2 bg-clip-text text-transparent">
          Quick Links
        </p>

        <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {LINKS.map((link) => (
            <QuickLinkButton
              key={link.label}
              {...link}
              isActive={activeTab === link.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinkButton({
  label,
  href,
  isActive,
}: QuickLink & { isActive: boolean }) {
  return (
    <Link href={href}>
      <button
        className={[
          "btn btn-text-lg w-full",
          "h-[102px] rounded-[10px]!",
          !isActive ? "btn-soft" : "btn-amber text-i-bg-2",
        ].join(" ")}
      >
        {label}
      </button>
    </Link>
  );
}
