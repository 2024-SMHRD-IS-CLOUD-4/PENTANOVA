import { useCallback } from 'react';

const useConfirm = () => {
  const showConfirm = useCallback((message) => {
    return window.confirm(message);
  }, []);

  return showConfirm;
};
export default useConfirm;