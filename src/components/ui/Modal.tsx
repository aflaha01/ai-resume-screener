"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        className={`relative z-10 w-full ${maxWidth} bg-white rounded-xl shadow-2xl p-6 mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}