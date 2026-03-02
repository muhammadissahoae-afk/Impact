import Main2 from "@/components/MainCanteen";
import CanteenPage from "@/Canteen/Canteen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canteen",
  description: "Impact American School",
};

const Canteen = () => {
  return (
    <Main2
      borderType="radios"
      backgroundUp="url(/images/background/meal1.png)"
      backgroundDown="url(/images/background/mainDown.png)"
      button1="Canteen"
      title="Fresh Meals & Friendly Faces"
      navVariant="light"
      body={<CanteenPage />}
    />
  );
};

export default Canteen;
