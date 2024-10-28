'use client';

import { HTMLInputTypeAttribute } from 'react';

export const Input = (props: {
  type?: 'textarea' | HTMLInputTypeAttribute;
  value?: string | number;
  accept?: string;
  onChange?: (e: any) => void;
  required?: boolean;
}) => {
  const { type, value, onChange } = props;
  if (type === 'textarea') {
    return (
      <textarea
        className="min-h-40 w-full resize-none rounded-md border border-white bg-[#292b3b] p-2 text-white"
        value={value}
        onChange={onChange}
        required={props.required}
      />
    );
  }
  return (
    <input
      className="min-h-10 w-full rounded-md border border-white bg-[#292b3b] p-2 text-white"
      type={type || 'text'}
      accept={props.accept}
      value={value}
      onChange={onChange}
      required={props.required}
    />
  );
};
