import React, { FunctionComponent } from 'react';
import styles from './Login.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useOvermind } from '../../overmind';
import { fieldType } from '../../overmind/login/types';

const LoginPage: FunctionComponent = () => {
  const {
    state: {
      loginForm: { email, password, formError }
    },
    actions: {
      loginForm: { setField, logIn }
    }
  } = useOvermind();
  return (
    <main className={styles.container}>
      <header className={styles.header}>Вход в личный кабинет</header>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <div className={styles.inputWrapper}>
          <Input
            type="email"
            value={email.value}
            error={email.error}
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
            error={password.error}
            onChange={e =>
              setField({ fieldType: fieldType.password, value: e.target.value })
            }>
            Пароль
          </Input>
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => logIn()}>
            Вход
            <i className="icon-right-arrow icon-arrow" />
          </Button>
        </div>
        {Boolean(formError) && (
          <span className={styles.formError}>{formError}</span>
        )}
      </form>
    </main>
  );
};

export default LoginPage;
