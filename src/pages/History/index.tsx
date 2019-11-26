import React, { FunctionComponent, useEffect } from 'react';
import { useOvermind } from '../../overmind';
import styles from './History.module.css';
import Deal from '../../components/Deal';
import nanoid from 'nanoid';
import { useClickOutsideRef } from '../../hooks';

const History: FunctionComponent = () => {
  const {
    state: {
      history: { pages, page, inputValue }
    },
    actions: {
      history: { changePage, changeInputValue }
    }
  } = useOvermind();
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutsideRef(
    false
  );
  useEffect(() => {
    changePage(inputValue - 1);
  }, [isComponentVisible]);
  return (
    <section className={styles.main}>
      <ul>
        {pages[page].map(deal => (
          <Deal key={nanoid()} {...deal} />
        ))}
      </ul>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.reversedIcon}`}
          onClick={() => changePage(page - 1)}>
          <i className="icon-right-arrow" />
        </button>
        <div className={styles.controlInput}>
          <input
            ref={ref}
            type="number"
            value={inputValue}
            min="1"
            max={pages.length}
            className={styles.input}
            onFocus={() => setIsComponentVisible(true)}
            onChange={e => changeInputValue(Number(e.target.value))}
            onKeyDown={e => e.key === 'Enter' && changePage(inputValue - 1)}
          />
          <span>&nbsp; / &nbsp;{pages.length}</span>
        </div>
        <button className={styles.button} onClick={() => changePage(page + 1)}>
          <i className="icon-right-arrow" />
        </button>
      </div>
    </section>
  );
};

export default History;
