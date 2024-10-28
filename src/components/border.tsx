"use client";

import classNames from "classnames";

export const Border = (props: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { className, style } = props;
  return (
    <svg
      className={classNames(
        className,
        "pointer-events-none absolute inset-0 h-full w-full",
      )}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="none"
        stroke="currentColor"
        strokeWidth="20"
        strokeDasharray="40,12"
      />
    </svg>
  );
};
