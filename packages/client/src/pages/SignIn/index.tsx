import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import { IS_LOGGED_IN } from '../../graphql/isLogged';
import { SIGN_IN, SignInData, SignInVars } from '../../graphql/signIn';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import { Container, Form } from './styles';

import { toast } from 'react-toastify';

interface ILoginData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email valido')
    .required('E-mail obrigatório'),
  password: Yup.string().min(6, 'No minimo 6 digitos'),
});

const SignIn: React.FC = () => {
  const [login] = useMutation<SignInData, SignInVars>(SIGN_IN, {
    update(cache, { data }) {
      cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: !!data?.login.token,
          user: !!data?.login.user ? data.login.user : false,
        },
      });
    },
  });
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm<ILoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (x: ILoginData) => {
      login({
        variables: { email: x.email, password: x.password },
      })
        .then((res) => {
          if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data.login.user));
            localStorage.setItem('token', res.data.login.token);
            history.push('/main');
            toast.success('Seja bem vindo!!');
          }
        })
        .catch((err: string) => toast.error(`${err}`));
    },

    [history, login]
  );

  return (
    <Container>
      <img src={logo} alt="ta" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register}
          name="email"
          type="email"
          placeholder="Seu e-mail"
        />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          ref={register}
          name="password"
          type="password"
          placeholder="Sua senha"
        />
        {errors.password && <span>{errors.password.message}</span>}

        <Button size={57} type="submit">
          Acessar
        </Button>
      </Form>
      <Link to="/register">Criar conta gratuita</Link>
    </Container>
  );
};

export default SignIn;
