import React, { FunctionComponent, ReactNode } from 'react';
import './Button.css';

type Props = {
  children: ReactNode;
  onClick: () => void | Promise<void>;
};

const Button: FunctionComponent<Props> = (props: Props) => {
  const { children, ...otherProps } = props;
  return (
    <button className="button" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
