import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import drivent from '../../assets/images/drivent.png';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import styled from 'styled-components';
import { signInGithub } from '../../services/authApi';
import { AiFillGithub } from 'react-icons/ai';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();


  useEffect(() => {
    searchGithubLogin();
  }, []);
  
  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function searchGithubLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    //console.log("code em front", code)
    if (code) {
      try {
        const userData = await signInGithub(code);
        //console.log('userdata aqui', userData)       
        setUserData(userData);
        navigate('/dashboard');
      } catch (error) {
        toast('Erro no login usando o GitHub');
      }
    }
  }

  async function redirectToGitHub() {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_APP_CLIENT_ID,
    });

    const authURL = `${import.meta.env.VITE_APP_GITHUB_REQUEST}?${params.toString()}`;
    window.location.href = authURL;
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={drivent} alt="Event Logo" width="200px" style={{ marginTop: '40px' }} />
        {/* <Title>{eventInfo.title}</Title> */}
      </Row>
      <Row>
        <Label style={{ marginTop: '-40px' }}>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
        <ButtonGit onClick={redirectToGitHub}>
        <AiFillGithub size="30px" className='github-icon'/> ENTRAR COM GITHUB
        </ButtonGit>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}

const ButtonGit = styled.button`
  width: 100%;
  height: 100%;
  min-height: 37px;
  background-color: #353232;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-top: 8px;
  border-radius: 4px;
  padding: 6px 16px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #413e3e;
  }

  .github-icon {
    color: #FFFFFF;
    margin-right: 15px;
  }
`;