import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Box } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <Stack pt={3} alignItems='center'>
          <TextAnimate
            text="About  Us"
            sx={{
              fontSize: '1rem !important',
              fontWeight:400,
              color: 'white',
            }}
            variants={varFade().inRight}
          />
        </Stack>
        <StyledContent>
          <TextAnimate
            text="Welcome To"
            sx={{
              color: 'primary.main',
            }}
            variants={varFade().inRight}
          />
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
