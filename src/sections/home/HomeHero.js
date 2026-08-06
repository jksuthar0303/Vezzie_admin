import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack, Grid } from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';
// config

// components

import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';
import { HEADER } from '../../config-global';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 480,
  height: 480,
  top: -80,
  right: -80,
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

const phoneNumber = '919511513819';
const handleWhatsAppChat = () => {
  // Create the WhatsApp chat URL
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Open the WhatsApp chat in a new window or tab
  window.open(whatsappUrl, '_blank');
};

const handleCallButtonClick = () => {
  window.location.href = `tel:${phoneNumber}`;
};

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledRoot sx={{ ...(hide && { opacity: 0 }) }}>
        <Container component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={10} sx={{ height: 1 }}>
            <Grid item xs={12} md={6} sx={{ height: 1 }}>
              <Description />
            </Grid>

            {isDesktop && (
              <Grid item xs={12} md={6}>
                <Content />
              </Grid>
            )}
          </Grid>
        </Container>

        {isDesktop && <StyledEllipseTop />}

        <StyledEllipseBottom />
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledDescription>
      <Stack spacing={5}>
        <m.div variants={varFade().in}>
          <Typography variant="h2" textAlign={!isDesktop ? 'center' : 'start'}>
            We Are Accepting <br />
            Orders On Call <br />
            And WhatsApp
          </Typography>
        </m.div>

        <m.div variants={varFade().in}>
          <Typography variant="body2" textAlign={!isDesktop ? 'center' : 'start'}>
            Convenience at Your Fingertips Order groceries online and save time for what matters
            most.
          </Typography>
        </m.div>

        <m.div variants={varFade().in}>
          <Stack
            spacing={2}
            direction={{ xs: 'column-reverse', sm: 'row' }}
            sx={{ mb: 5 }}
            alignItems={isDesktop ? 'start' : 'center'}
          >
            <Button
              onClick={handleCallButtonClick}
              // color="inherit"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="fluent:call-16-regular" width={24} />}
              // sx={{
              //   bgcolor: 'text.primary',
              //   color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              //   '&:hover': {
              //     bgcolor: 'text.primary',
              //   },
              // }}
            >
              Call Now
            </Button>

            <Button
              // color="inherit"
              size="large"
              variant="outlined"
              startIcon={<Iconify icon="formkit:whatsapp" width={24} />}
              target="_blank"
              rel="noopener"
              onClick={handleWhatsAppChat}
              // sx={{ borderColor: 'text.primary' }}
            >
              WhatsApp Now
            </Button>
          </Stack>
        </m.div>
      </Stack>
    </StyledDescription>
  );
}
// ----------------------------------------------------------------------

function Content() {
  // const theme = useTheme();

  // const isLight = theme.palette.mode === 'light';

  // const transition = {
  //   repeatType: 'loop',
  //   ease: 'linear',
  //   duration: 60 * 4,
  //   repeat: Infinity,
  // };
  return (
    <Stack
      // direction="row"
      alignItems="flex-end"
      justifyContent="center"
      sx={{
        height: 1,
        overflow: 'hidden',
        // position: 'absolute',
        // mt: `${HEADER.H_MAIN_DESKTOP}px`,
      }}
    >
      <Stack component={m.div} variants={varFade().in} sx={{ width: 454 }}>
        <Box
          // sx={{ position: 'absolute' }}
          // animate={{ y: ['0%', '100%'] }}
          // transition={transition}
          component={m.img}
          alt="hero-3"
          src="/assets/img/hero-3.png"
        />
      </Stack>
      {/* <m.div variants={varFade().inUp}>
      <Stack alignItems="center" sx={{ mt: 20, height: 200 }}>
        <Box component={m.img} alt="hero-3" src="/assets/img/hero-3.png" />
      </Stack>
    </m.div> */}
    </Stack>
  );
}
