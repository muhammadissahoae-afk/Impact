import InteractiveCampusMap from "@/components/campus-map/InteractiveCampusMap";
import buidling from '@/svgs/building.png'
const Buidling = () => {
  return (
    <div className="p-6">
      <InteractiveCampusMap imageSrc={buidling} />
    </div>
  );
};

export default Buidling;
