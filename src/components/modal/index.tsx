"use client";

import { createPortal } from "react-dom";

export const Modal = (props: {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}) => {
  const { visible = false, children, onClose } = props;

  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-x-hidden overflow-y-scroll">
      <div
        className="absolute inset-0 bg-gray-500 bg-opacity-40"
        onClick={onClose}
      />
      <div className="relative">{children}</div>
    </div>,
    document.body,
  );
};
