import React, { FunctionComponent } from 'react';
import styles from './Login.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useOvermind } from '../../overmind';
import { fieldType } from '../../overmind/login/types';

const LoginPage: FunctionComponent = () => {
  const {
    state: {
      loginForm: { email, password, isValid }
    },
    actions: {
      loginForm: { setField }
    }
  } = useOvermind();
  return (
    <div className={styles.container}>
      <div className={styles.header}>Вход в личный кабинет</div>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.inputWrapper}>
          <Input
            type="email"
            value={email.value}
            error={isValid ? 'Неверный логин' : ''}
            onChange={e =>
              setField({ fieldType: fieldType.email, value: e.target.value })
            }>
            Логин
          </Input>
        </div>
        <div className={styles.inputWrapper}>
          <Input
            type="password"
            value={password.value}
            error={isValid ? 'Неверный пароль' : ''}
            onChange={e =>
              setField({ fieldType: fieldType.password, value: e.target.value })
            }>
            Пароль
          </Input>
        </div>
        <Button>Вход</Button>
      </form>
    </div>
  );
};

export default LoginPage;
