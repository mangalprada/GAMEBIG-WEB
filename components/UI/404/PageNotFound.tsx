import Lottie from 'react-lottie';
import data from '../Animations/404.json';

const PageNotFound = ({ height, width }: { height: number; width: number }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
  };
  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default PageNotFound;
