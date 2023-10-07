import React from 'react';
import { useDispatch } from 'react-redux';
import * as exampleActions from '../../store/modules/example/actions';
import { Container } from '../../styles/GlobalStyles';
import { Title } from './styled';

export default function Login() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(exampleActions.buttonClickRequest());
  };

  return (
    <Container>
      <Title>Login</Title>
      <p>pag log</p>
      <a href="none">something</a>
      <button type="button" onClick={handleClick}>
        Send
      </button>
    </Container>
  );
}
