import React, { FunctionComponent } from 'react';
import styles from './Quote.module.css';
import { useHover } from '../../hooks';
import { useOvermind } from '../../overmind';

type Props = {
  isFav?: boolean;
  onFavChange: (key: string) => void;
  quote: string;
  asset: string;
  startDate: Date;
  withoutBorder?: boolean;
};

const Quote: FunctionComponent<Props> = (props: Props) => {
  useOvermind();
  const [hovered, onMouseEnter, onMouseLeave] = useHover(false);
  return (
    <section
      className={
        props.withoutBorder
          ? `${styles.section} ${styles.withoutBorder}`
          : styles.section
      }>
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
      <span className={`${styles.text} ${styles.moved}`}>{props.quote}</span>
      <span className={`${styles.text} ${styles.moved}`}>
        {props.startDate}
      </span>
    </section>
  );
};

Quote.defaultProps = {
  withoutBorder: false
};

export default Quote;
