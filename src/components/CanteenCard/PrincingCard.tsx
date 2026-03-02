import { cn } from "@/lib/utils";
import styles from "./Card.module.css";

interface Props {
  data: {
    priceing: string;
    includes: string[];
  };
}

export default function CardPricing({ data }: Props) {
  return (
    <div
      className={cn(
        styles.cardPricing,
        "w-full md:w-[380px] h-full md:h-[527px]",
      )}
    >
      <div className="flex flex-col w-full gap-[30px]">
        <div className="flex flex-row items-center justify-between">
          <img src="/icons/icon1.svg" alt="icon" />
          <div>
            <span className="text-white text-lg pr-2.5">{data.priceing}</span>
            <span className="text-light-white">per month</span>
          </div>
        </div>
        <div className={styles.subCardPricing}>
          {data.includes.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <img src="/icons/Vector.svg" alt="check" />
              <span className={`text-light-white`}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-white">Subscribe now</button>
    </div>
  );
}
