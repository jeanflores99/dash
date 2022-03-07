import type { NextPage } from 'next';
import { useMemo } from 'react';
import { GuestLayout } from '@common/layouts';
import { Container, Row, Col } from 'reactstrap';
import { LoginForm } from '@common/auth';
import styles from '../assets/scss/pages/SignIn.module.scss';
import { Show } from '@common/show';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import { RootState } from '../store/store';
import { guest } from '@services/authorize';

const SignInPage: NextPage = () => {

  const router = useRouter();

  const { mode } = useSelector((state: RootState) => state.screen);

  const showBackgroud = useMemo<boolean>(() => {
    const data = ['xs', 'sm'];
    return !data.includes(mode || '');
  }, [mode]);

  return (
    <GuestLayout>
      <Container fluid={true}>
        <Row>
          <Show condition={showBackgroud}>
            <Col md="6" lg="7" xl="5" className={styles.without_padding}>
              <div className={styles.login__background} />
            </Col>
          </Show>
          <Col xl="7" className="p-0">
            <div className="login-card">
              <div>
                <div className={styles.login__icon}>
                  {/* <Logo
                    urlImage='https://sis.unu.edu.pe/api-auth/find_file_local?path=app/img/siga-unu_icon.png&size=200x200'
                  /> */}
                </div>
                <LoginForm
                  onResetPassword={() => alert('has')}
                  onSignIn={() => router.push('/')}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </GuestLayout>
  )
}

export default SignInPage;

export const getServerSideProps = guest("Sign-in");