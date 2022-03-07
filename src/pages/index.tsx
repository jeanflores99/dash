import type { NextPage } from 'next';
import { AuthLayout } from '@common/layouts';
import { authorize } from '@services/authorize';

const Home: NextPage = () => {
  return (
    <AuthLayout>
      home
    </AuthLayout>
  )
}

export default Home;

export const getServerSideProps = authorize("Home");
