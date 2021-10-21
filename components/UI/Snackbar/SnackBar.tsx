import { useState, useEffect, FC } from 'react';
import CloseIcon from '../Icons/SnackbarIcons/CloseIcon';
import ErrorIcon from '../Icons/SnackbarIcons/ErrorIcon';
import InfoIcon from '../Icons/SnackbarIcons/InfoIcon';
import SuccessIcon from '../Icons/SnackbarIcons/SuccessIcon';
import WarningIcon from '../Icons/SnackbarIcons/WarningIcon';

type Props = {
  open: boolean;
  onClose: () => void;
  autoHideDuration: number;
  type: 'success' | 'info' | 'warning' | 'error';
  message: {
    label: string;
    message: string;
  };
};

const SnackbarAlert: FC<Props> = ({
  open,
  onClose,
  autoHideDuration,
  type,
  message,
}: Props) => {
  const [primaryBGColor, setPrimaryBGColor] = useState('');
  const [secondaryBGColor, setSecondaryBGColor] = useState('');
  const [icon, setIcon] = useState(<></>);
  const [position, setPosition] = useState('-right-96 ');

  useEffect(() => {
    var timeId: number | undefined = undefined;
    if (open) {
      setPosition('right-4 ');
      timeId = window.setTimeout(() => {
        setPosition('-right-96 ');
        onClose();
      }, autoHideDuration);
    }
    return () => {
      window.clearTimeout(timeId);
    };
  }, [open, autoHideDuration, onClose]);

  useEffect(() => {
    switch (type) {
      case 'success':
        setIcon(<SuccessIcon />);
        setPrimaryBGColor('bg-green-500 ');
        setSecondaryBGColor('bg-green-600 ');
        break;
      case 'error':
        setIcon(<ErrorIcon />);
        setPrimaryBGColor('bg-red-500 ');
        setSecondaryBGColor('bg-red-600 ');
        break;
      case 'info':
        setIcon(<InfoIcon />);
        setPrimaryBGColor('bg-blue-500 ');
        setSecondaryBGColor('bg-blue-600 ');
        break;
      case 'warning':
        setIcon(<WarningIcon />);
        setPrimaryBGColor('bg-yellow-500 ');
        setSecondaryBGColor('bg-yellow-600 ');
        break;
      default:
        setIcon(<InfoIcon />);
        setPrimaryBGColor('bg-gray-500 ');
        setSecondaryBGColor('bg-gray-600 ');
    }
  }, [type]);

  const handleClose = () => {
    setPosition('-right-96 ');
    onClose();
  };
  return (
    <div
      className={
        `flex max-w-sm mb-4 rounded-md fixed top-16 z-50 ` +
        `${primaryBGColor}` +
        `${position}`
      }
    >
      <div className={`w-16 rounded-l-md ` + `${secondaryBGColor}`}>
        <div className="p-4">{icon}</div>
      </div>
      <div className="w-auto items-center p-4">
        <span className="text-lg font-semibold pb-4 tracking-wide text-gray-100">
          {message.label}
        </span>
        <p className="leading-tight text-gray-50">{message.message}</p>
      </div>
      <div
        className="absolute right-1 top-1 cursor-pointer"
        onClick={handleClose}
      >
        <CloseIcon size={18} />
      </div>
    </div>
  );
};

export default SnackbarAlert;
