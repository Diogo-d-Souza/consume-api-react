import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

export default function Student({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/students/${id}`);

        setName(data.name);
        setLastName(data.last_name);
        setEmail(data.email);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    let formErrors = false;

    if (name.length < 3 || name.length > 255) {
      toast.error('Name must be between 3 and 255 characters');
      formErrors = true;
    }

    if (lastName.length < 3 || lastName.length > 255) {
      toast.error('Last Name must be between 3 and 255 characters');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Invalid email address');
      formErrors = true;
    }

    if (!isInt(String(age))) {
      toast.error('Invalid age');
      formErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error('Invalid weight');
      formErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error('Invalid height');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/students/${id}`, {
          name,
          last_name: lastName,
          email,
          age,
          weight,
          height,
        });
        toast.success('Student edited successfully');
      } else {
        const { data } = await axios.post('/students/', {
          name,
          last_name: lastName,
          email,
          age,
          weight,
          height,
        });
        toast.success('Student created successfully');
        history.push(`/student/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Unknown error');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1> {id ? 'Edit student' : 'New student'} </h1>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="weight"
        />
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
        />
        <button type="submit">Send</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
