interface CustomLabelProps {
  title?: string;
  className?: string;
}

export default function CustomLabel({
  title,
  className = "",
}: CustomLabelProps) {
  return (
    <div
      className={`
      flex
      py-[11px] px-[25px]
      justify-center
      items-center
      gap-2.5
      text-[#02fB52]
      text-center
      font-['Poppins']
      text-[20px]
      font-normal
      leading-[150%]
      tracking-[-1px]
      bg-white
      rounded-[26.5px]
      ${className}
    `}
    >
      {title}
    </div>
  );
}
