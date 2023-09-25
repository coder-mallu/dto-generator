import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------

export default function usePopover() {
  const [open, setOpen] = useState(null);

  const onOpen = useCallback(
    (event) => {
      setOpen(event.currentTarget);
    },
    [setOpen]
  );

  const onClose = useCallback(() => {
    setOpen(null);
  }, [setOpen]);

  return {
    open,
    onOpen,
    onClose,
    setOpen,
  };
}
