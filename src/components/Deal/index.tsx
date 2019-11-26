import React, { FunctionComponent } from 'react';
import nanoid from 'nanoid';
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
      {[
        asset,
        formatDate(startDate),
        startQuote,
        formatDate(finishDate),
        finishQuote,
        profit
      ].map(text => (
        <span key={nanoid()} className={`flexBox ${styles.text}`}>
          {text}
        </span>
      ))}
    </li>
  );
};

export default Deal;
