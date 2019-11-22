import React, { FunctionComponent, ReactNode } from 'react';
import './Button.css';

type Props = {
  children: ReactNode;
};

const Button: FunctionComponent<Props> = (props: Props) => {
  const { children, ...otherProps } = props;
  return (
    <button className="button" {...otherProps}>
      {children}
      <i className="icon-right-arrow icon-arrow" />
    </button>
  );
};

export default Button;
