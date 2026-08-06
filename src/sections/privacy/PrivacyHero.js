// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// image
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundImage: `url('/assets/img/overlay.svg'), url('/assets/privacyHeroImg.jpg')`,
  // padding: theme.spacing(5, 0),
  [theme.breakpoints.up('md')]: {
    height: 580,
    padding: 0,
  },
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function PrivacyHero() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle spacing={5}>
          <div>
            <TextAnimate
              text="Vezzie"
              sx={{ color: 'primary.main', fontSize: '1rem !important', fontWeight: 400 }}
              variants={varFade().inRight}
            />
            <br />
            <Box sx={{ color: 'common.white' }}>
              <TextAnimate text="privacy" sx={{ mr: 2, fontSize: '2rem !important' }} />
              <TextAnimate text="policy" sx={{ mr: 2, fontSize: '2rem !important' }} />
            </Box>
          </div>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
