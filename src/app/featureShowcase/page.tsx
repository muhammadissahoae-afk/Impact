import FeatureShowcase from "@/components/FeatureShowcase/FeatureShowcase";
import { demoItems } from "@/components/FeatureShowcase/FeatureShowcase.data";

const FeatureShowcaseRoute = () => {
  return (
    <main className="flex flex-col items-center gap-12 px-4 py-10">
      <FeatureShowcase items={demoItems} />
    </main>
  );
};

export default FeatureShowcaseRoute;
