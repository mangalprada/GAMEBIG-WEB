import { createContext, useContext, useState } from 'react';

const uiContext = createContext({
  snackBar: {
    isOpen: false,
    label: '',
    message: '',
    type: 'success',
  },
  openSnackBar: (alertObject: {
    label: string;
    message: string;
    type: string;
  }) => {},
  closeSnackBar: () => {},
});

function useProvideUI() {
  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    label: '',
    message: '',
    type: 'success',
  });

  function openSnackBar(alertObject: {
    label: string;
    message: string;
    type: string;
  }) {
    setSnackBar({
      isOpen: true,
      label: alertObject.label,
      message: alertObject.message,
      type: alertObject.type,
    });
  }

  function closeSnackBar() {
    setSnackBar({
      isOpen: false,
      label: '',
      message: '',
      type: '',
    });
  }

  return {
    snackBar,
    openSnackBar,
    closeSnackBar,
  };
}

type contextProps = {
  children: React.ReactNode;
  snackBar?: {
    isOpen: boolean;
    label: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  };
  openSnackBar?: (alertObject: {
    label: string;
    message: string;
    type: string;
  }) => void;
  closeSnackBar?: () => void;
};

export const UIProvider = ({ children }: contextProps) => {
  const uiStore = useProvideUI();
  return <uiContext.Provider value={uiStore}>{children}</uiContext.Provider>;
};

export const useUI = () => {
  return useContext(uiContext);
};
