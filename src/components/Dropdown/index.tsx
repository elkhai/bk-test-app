import React, { FunctionComponent } from 'react';
import styles from './Dropdown.module.css';
import nanoid from 'nanoid';
import { useClickOutsideRef } from '../../hooks';

type Props = {
  value: string;
  options: Array<string>;
  onChange: (value: string) => void;
};

const Dropdown: FunctionComponent<Props> = (props: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutsideRef(
    false
  );
  const optionsNotEmpty = props.options.length > 0;
  return (
    <div ref={ref} className={styles.main}>
      <div
        onClick={() => {
          setIsComponentVisible(!isComponentVisible);
        }}
        className={styles.input}>
        <span>{props.value}</span>
        {optionsNotEmpty && <span className={styles.arrow} />}
      </div>
      {isComponentVisible && optionsNotEmpty && (
        <ul className={styles.options}>
          {props.options.map(option => (
            <li
              className={styles.option}
              key={nanoid()}
              onClick={() => {
                props.onChange(option);
                setIsComponentVisible(false);
              }}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
