import React, { FunctionComponent, ReactNode } from 'react';
import styles from './Button.module.css';

export enum types {
  DEFAULT = '',
  TRANSPARENT = 'tr'
}

const classes = {
  [types.DEFAULT]: '',
  [types.TRANSPARENT]: styles.transparent
};

type Props = {
  componentType?: types;
  children: ReactNode;
  onClick: () => void | Promise<void>;
};

const Button: FunctionComponent<Props> = (props: Props) => {
  const { children, componentType, ...otherProps } = props;
  return (
    <button
      className={`${styles.button} ${
        componentType ? classes[componentType] : ''
      }`}
      {...otherProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  componentType: types.DEFAULT
};

export default Button;
