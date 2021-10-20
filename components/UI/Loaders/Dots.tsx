import Lottie from 'react-lottie';
import LoadingDots from '../Animations/LoadingDots.json';

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
    animationData: LoadingDots,
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
