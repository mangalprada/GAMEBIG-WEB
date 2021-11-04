import { useUI } from '@/context/uiContext';
import { useState, useEffect, FC } from 'react';
import CloseIcon from '../Icons/SnackbarIcons/CloseIcon';
import ErrorIcon from '../Icons/SnackbarIcons/ErrorIcon';
import InfoIcon from '../Icons/SnackbarIcons/InfoIcon';
import SuccessIcon from '../Icons/SnackbarIcons/SuccessIcon';
import WarningIcon from '../Icons/SnackbarIcons/WarningIcon';

type Props = {
  autoHideDuration: number;
};

const SnackbarAlert: FC<Props> = ({ autoHideDuration }: Props) => {
  const { snackBar, closeSnackBar } = useUI();

  const [primaryBGColor, setPrimaryBGColor] = useState('');
  const [secondaryBGColor, setSecondaryBGColor] = useState('');
  const [icon, setIcon] = useState(<></>);
  const [position, setPosition] = useState('-right-96 ');

  useEffect(() => {
    var timeId: number | undefined = undefined;
    if (snackBar.isOpen) {
      setPosition('md:right-4 right-1 ');
      timeId = window.setTimeout(() => {
        setPosition('-right-96 ');
        closeSnackBar();
      }, autoHideDuration);
    }
    return () => {
      window.clearTimeout(timeId);
    };
  }, [snackBar.isOpen, autoHideDuration, closeSnackBar]);

  useEffect(() => {
    switch (snackBar.type) {
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
  }, [snackBar.type]);

  const handleClose = () => {
    setPosition('-right-96 ');
    closeSnackBar();
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
          {snackBar.label}
        </span>
        <p className="leading-tight text-gray-50">{snackBar.message}</p>
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
