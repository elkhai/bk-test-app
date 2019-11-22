import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Input.module.css';

type Props = {
  type: string;
  error: null | string;
  children: ReactNode;
  value: string;
  onChange: (event: { target: { value: string } }) => void;
};

const Input: FunctionComponent<Props> = (props: Props) => {
  const { children, error, ...otherProps } = props;
  return (
    <label className={styles.label}>
      <span className={styles.labelValue}>{children}</span>
      <input
        className={
          error ? `${styles.input} ${styles.inputError}` : styles.input
        }
        {...otherProps}
      />
      {Boolean(error) && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export default Input;
