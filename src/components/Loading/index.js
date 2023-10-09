import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <div />;

  return (
    <Container>
      <div />
      <span>Loading...</span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
