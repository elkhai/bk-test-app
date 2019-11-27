import React, { FunctionComponent } from 'react';
import styles from './Quote.module.css';
import { useHover } from '../../hooks';

type Props = {
  isFav?: boolean;
  onFavChange: (key: string) => void;
  quote: string;
  asset: string;
  startDate: Date;
  withoutBorder?: boolean;
};

const Quote: FunctionComponent<Props> = (props: Props) => {
  const [hovered, onMouseEnter, onMouseLeave] = useHover(false);
  return (
    <li className={styles.section}>
      <button
        className={styles.button}
        {...{ onMouseEnter, onMouseLeave }}
        onClick={() => props.onFavChange(props.asset)}>
        <i
          className={
            props.isFav || hovered ? 'icon-star-full' : 'icon-star-empty'
          }
        />
      </button>
      <span className={styles.text}>{props.asset}</span>
      <span className={styles.text}>{props.quote}</span>
      <span className={styles.text}>{props.startDate}</span>
      {!props.withoutBorder && <figure className={styles.divider} />}
    </li>
  );
};

Quote.defaultProps = {
  withoutBorder: false
};

export default Quote;
