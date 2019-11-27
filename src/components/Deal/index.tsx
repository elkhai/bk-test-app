import React, { FunctionComponent } from 'react';
import styles from './Deal.module.css';
import { formatDate } from '../../utils/formatDate';

type Props = {
  asset: string;
  startQuote: string;
  startDate: string;
  finishQuote: string;
  finishDate: string;
  profit: string;
};

const Deal: FunctionComponent<Props> = (props: Props) => {
  const {
    asset,
    startQuote,
    startDate,
    finishQuote,
    finishDate,
    profit
  } = props;
  return (
    <li className={styles.main}>
      <span className={`flexBox ${styles.text}`}>{asset}</span>
      <span className={`flexBoxTwo ${styles.text}`}>
        {formatDate(startDate)}
      </span>
      <span className={`flexBox ${styles.text}`}>{startQuote}</span>
      <span className={`flexBoxTwo ${styles.text}`}>
        {formatDate(finishDate)}
      </span>
      <span className={`flexBox ${styles.text}`}>{finishQuote}</span>
      <span className={`flexBox ${styles.text}`}>{profit}</span>
    </li>
  );
};

export default Deal;
