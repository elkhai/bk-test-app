import React, { FunctionComponent, useState } from 'react';
import styles from './Home.module.css';
import Quotes from '../Quotes';
import Converter from '../Converter';
import { useOvermind } from '../../overmind';
import nanoid from 'nanoid';

const headers = [
  ['Валютная пара', 'Котировка', 'Дата получения'],
  ['Конвертация валют'],
  ['Актив', 'Начало', 'Котировка', 'Конец', 'Котировка', 'Прибыль']
];

const tabs = [<Quotes key="quotes" />, <Converter key="converter" />];

const HomePage: FunctionComponent = () => {
  useOvermind();
  const [tab, setTab] = useState(0);
  const buttons = [
    { text: 'Курсы валют' },
    { text: 'Конвертор' },
    { text: 'История' }
  ];
  return (
    <main className={styles.main}>
      <nav className={styles.navigation}>
        {buttons.map(({ text }, i) => (
          <button
            key={nanoid()}
            onClick={() => setTab(i)}
            className={
              i === tab
                ? `${styles.navButton} ${styles.active}`
                : styles.navButton
            }>
            {text}
          </button>
        ))}
      </nav>
      <header className={styles.header}>
        {headers[tab].map((h, i) => (
          <span key={i} className={tab === 1 ? styles.hAlone : styles.h}>
            {h}
          </span>
        ))}
      </header>
      <div className={`${styles.content} ${tab === 0 ? styles.overlay : ''}`}>
        {tabs[tab]}
      </div>
    </main>
  );
};

export default HomePage;
