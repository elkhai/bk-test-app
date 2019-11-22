import isEmail from 'validator/lib/isEmail';
import { isPasswordValid } from '../../utils/validationRules';
import { Derive } from 'overmind';

type Field = {
  value: string;
  error: null | string;
};

type State = {
  email: Field;
  password: Field;
  isEmailValid: Derive<State, boolean>;
  isPasswordValid: Derive<State, boolean>;
  formError: null | undefined | string;
};

export const state: State = {
  email: {
    value: '',
    error: null
  },
  password: {
    value: '',
    error: null
  },
  isEmailValid: state => isEmail(state.email.value),
  isPasswordValid: state => isPasswordValid(state.password.value),
  formError: null
};
