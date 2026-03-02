import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type TItems = {
  src: string;
  image: React.ReactElement;
};
type TProps = {
  items: TItems[];
};

const PhotoViewer = ({ items }: TProps) => {
  return (
    <PhotoProvider>
      {items.map((item, i) => (
        <PhotoView src={item.src} key={i}>
          {item.image}
        </PhotoView>
      ))}
    </PhotoProvider>
  );
};

export default PhotoViewer;
