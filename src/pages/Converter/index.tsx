import React, { FunctionComponent } from 'react';
import styles from './Converter.module.css';
import Input, { sizes } from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import { useOvermind } from '../../overmind';

const Converter: FunctionComponent = () => {
  const {
    state: {
      quotes: {
        amount,
        firstDropdownValue,
        secondDropdownValue,
        uniqueAssets,
        result,
        secondDropdownOptions
      }
    },
    actions: {
      quotes: { changeAmount, changeFirstDropdown, changeSecondDropdown, convert }
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
            value={firstDropdownValue}
            options={uniqueAssets.filter(asset => asset !== firstDropdownValue)}
            onChange={changeFirstDropdown}
          />
        </div>
        <div className="flexBox">
          <Dropdown
            value={secondDropdownValue}
            options={secondDropdownOptions.filter(
              asset => asset !== secondDropdownValue
            )}
            onChange={changeSecondDropdown}
          />
        </div>
        <div className="flexBox">
          <Button onClick={convert}>Рассчитать</Button>
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
