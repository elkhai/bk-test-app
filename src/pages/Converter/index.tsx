import React, { FunctionComponent } from 'react';
import styles from './Converter.module.css';
import Input, { sizes } from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import { useOvermind } from '../../overmind';
import { dropdown } from '../../overmind/quotes/types';

const Converter: FunctionComponent = () => {
  const {
    state: {
      quotes: { amount, firstDropdown, secondDropdown, options, result }
    },
    actions: {
      quotes: { changeAmount, changeDropdown, convertAssets }
    }
  } = useOvermind();
  const isResultNotEmpty = Boolean(result.length);
  return (
    <section className={styles.main}>
      <section className={styles.input}>
        <div className="flexBox">
          <Input
            type="number"
            size={sizes.M}
            value={amount}
            onChange={e => changeAmount(Number(e.target.value))}>
            Сумма
          </Input>
        </div>
        <div className="flexBox">
          <Dropdown
            key="first-dropdown"
            value={firstDropdown}
            options={options.firstDropdown}
            onChange={value =>
              changeDropdown({
                value,
                dd: dropdown.FIRST,
                otherDD: dropdown.SECOND
              })
            }
          />
        </div>
        <div className="flexBox">
          <Dropdown
            key="second-dropdown"
            value={secondDropdown}
            options={options.secondDropdown}
            onChange={value =>
              changeDropdown({
                value,
                dd: dropdown.SECOND,
                otherDD: dropdown.FIRST
              })
            }
          />
        </div>
        <div className="flexBox">
          <Button onClick={convertAssets}>Рассчитать</Button>
        </div>
      </section>
      <section className={styles.output}>
        {isResultNotEmpty && <span className={styles.description}>Итого</span>}
        {isResultNotEmpty && <h1>{result}</h1>}
      </section>
    </section>
  );
};

export default Converter;
