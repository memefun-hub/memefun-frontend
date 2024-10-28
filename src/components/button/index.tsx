'use client';

import classNames from 'classnames';
import styles from './style.module.scss';

export const Button = (props: { className?: string; onClick?: (event: any) => void; children?: React.ReactNode }) => {
  const { className, onClick, children } = props;

  return (
    <div className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </div>
  );
};
