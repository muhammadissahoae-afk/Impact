import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => (
  <Card
    className="bg-i-bg-alt w-full md:w-112.25 px-3.75 pt-4 pb-7.5   shadow-none     border-0 rounded-[40px] overflow-hidden -translate-y-4 animate-fade-in  transition-all duration-300"
    style={
      { "--animation-delay": `${200 + index * 200}ms` } as React.CSSProperties
    }
  >
    <CardContent className=" flex flex-col items-center gap-7 p-0">
      <div className="overflow-hidden rounded-[35px]">
        <img
          className="w-full h-[261px] object-cover transition-transform duration-500 hover:scale-105"
          alt={item.title}
          src={item.image}
        />
      </div>

      <div className="flex flex-col gap-6.5 w-full">
        <Badge className="`w-47 h-13.25 px-6 bg-white hover:bg-white rounded-full text-i-primary/50 text-base font-poppins font-normal tracking-tight">
          {item.date}
        </Badge>

        <div className="flex flex-col gap-7.5 w-full">
          <div className="md:w-81.75">
            <h3 className=" font-normal text-i-primary text-2xl -tracking-[1.2px] leading-7">
              {item.title}
            </h3>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="text-i-primary/50 font-normal  text-[16px]  leading-[150%] -tracking-[0.8px]">
              {item.description}
              <span className="font-medium text-i-primary leading-[150%] -tracking-[0.8px]">
                Read More
              </span>
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default NewsCard;
