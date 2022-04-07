import React, {useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     console.warn('useEffect for form validation');
  //     setFormIsValid(emailState.value.includes('@') && enteredPassword.trim().length > 6);
  //   }, 500);
  //
  //   return () => clearTimeout(timeoutId); // clean up function which runs on componentWillUnmount
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value });
    setFormIsValid(event.target.value.includes('@') && passwordState.trim().length > 6);
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
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
