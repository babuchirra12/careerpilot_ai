"use client";

import React from "react";

type Props = {
  filename: string;
  content?: string;
  url?: string;
  mimeType?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void | Promise<void>;
};

export default function DownloadButton({ filename, content, url, mimeType = "application/octet-stream", children, className = "", onClick, }: Props) {
  const handle = async () => {
    if (onClick) {
      await onClick();
      return;
    }

    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    if (content !== undefined) {
      const blob = new Blob([content], { type: mimeType });
      const urlObj = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = urlObj;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(urlObj);
      return;
    }
  };

  return (
    <button onClick={handle} className={className}>
      {children ?? "Download"}
    </button>
  );
}
