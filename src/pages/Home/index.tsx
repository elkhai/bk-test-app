import React, { FunctionComponent, useState } from 'react';
import styles from './Home.module.css';
import Quotes from '../Quotes';
import Converter from '../Converter';
import History from '../History';
import nanoid from 'nanoid';

const headers = [
  ['Валютная пара', 'Котировка', 'Дата получения'],
  ['Конвертация валют'],
  ['Актив', 'Начало', 'Котировка', 'Конец', 'Котировка', 'Прибыль']
];

const tabs = [
  <Quotes key="quotes" />,
  <Converter key="converter" />,
  <History key="history" />
];

const HomePage: FunctionComponent = () => {
  const [tab, setTab] = useState(0);
  const buttons = [
    { text: 'Курсы валют' },
    { text: 'Конвертор' },
    { text: 'История' }
  ];
  return (
    <main className={`${styles.main} ${tab === 2 ? styles.wide : ''}`}>
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
        {headers[tab].map(h => (
          <span
            key={nanoid()}
            className={`${styles.h} ${tab === 1 ? styles.hAlone : ''}`}>
            {h}
          </span>
        ))}
      </header>
      <div
        className={`
        ${styles.content} 
        ${tab === 0 ? styles.overlay : ''} 
      `}>
        {tabs[tab]}
      </div>
    </main>
  );
};

export default HomePage;
