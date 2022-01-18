import Lottie from 'react-lottie';
import LurkingCat from '../Animations/LurkingCat.json';

const LoadingLottie = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LurkingCat,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="example">
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LoadingLottie;
