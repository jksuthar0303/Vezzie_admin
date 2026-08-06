import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../sections/auth/Login';
// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function AdminLoginPage() {
  return (
    <>
      <Helmet>
        <title> Admin login | Vezzie</title>
      </Helmet>

      <Login />
    </>
  );
}
