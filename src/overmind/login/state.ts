import isEmail from 'validator/lib/isEmail';
import { isPasswordValid } from '../../utils/validationRules';
import { Derive } from 'overmind';

type Field = {
  value: string;
};

type State = {
  email: Field;
  password: Field;
  isValid: Derive<State, boolean>;
};

export const state: State = {
  email: {
    value: ''
  },
  password: {
    value: ''
  },
  isValid: state =>
    isEmail(state.email.value) && isPasswordValid(state.password.value)
};
