import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Input.module.css';

export enum sizes {
  M = 'M',
  L = 'L',
  XL = 'XL'
}

const sizesClasses = {
  [sizes.M]: styles.inputM,
  [sizes.L]: styles.inputL,
  [sizes.XL]: styles.inputXL
};

type Props = {
  size: sizes;
  placeholder?: any;
  type?: string;
  error?: null | string;
  children: ReactNode;
  value: string | number;
  onChange: (event: { target: { value: string } }) => void;
};

const Input: FunctionComponent<Props> = (props: Props) => {
  const { children, error, size, ...otherProps } = props;
  return (
    <label className={styles.label}>
      <span className={styles.labelValue}>{children}</span>
      <input
        className={`
          ${styles.input}
          ${sizesClasses[size]}
          ${error ? styles.inputError : ''}
        `}
        {...otherProps}
      />
      {Boolean(error) && <span className={styles.error}>{error}</span>}
    </label>
  );
};

Input.defaultProps = {
  error: null,
  type: 'text'
};

export default Input;
