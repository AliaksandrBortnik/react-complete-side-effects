import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import {Input} from '../UI/Input/Input';

const emailReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        value: action.value,
        isValid: action.value.includes('@')
      }
    case 'INPUT_BLUR':
      return {
        value: state.value,
        isValid: state.value.includes('@')
      }
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        value: action.value,
        isValid: action.value.trim().length > 6
      };
    case 'INPUT_BLUR':
      return {
        value: state.value,
        isValid: state.value.trim().length > 6
      };
    default:
      return state;
  }
}

const Login = (props) => {
  const authContext = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.warn('useEffect for form validation');
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => clearTimeout(timeoutId); // clean up function which runs on componentWillUnmount
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
    setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value });
    setFormIsValid(emailState.value.includes('@') && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id='email'
          type='email'
          label='Email'
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          >
        </Input>
        <Input
          id='password'
          type='password'
          label='Password'
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          >
        </Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
