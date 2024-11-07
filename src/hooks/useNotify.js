import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useNotify = () => {
  const notify = useCallback((message, type = 'info') => {
    toast[type](message, { 
      autoClose: 3000,
      position: 'top-right',
    });
  }, []);

  return notify;
};
