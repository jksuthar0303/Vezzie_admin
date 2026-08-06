import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

import { PrivacyContent, PrivacyHero } from '../sections/privacy';
import Layout from '../layouts/main';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  // paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
  },
}));

Privacy.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title> Vezzie | Privacy Policy</title>
      </Helmet>
      <RootStyle>
        <PrivacyHero />

        <Container sx={{ mt: 10, mb: 10, position: 'relative' }}>
          <PrivacyContent />
        </Container>
      </RootStyle>
    </>
  );
}
