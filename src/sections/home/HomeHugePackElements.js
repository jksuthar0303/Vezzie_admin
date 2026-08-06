import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';

import { Stack, Box, Grid, Button, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgGradient } from '../../utils/cssStyles';

import { MotionViewport, varFade } from '../../components/animate';
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(20),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.98),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  padding: theme.spacing(1.5, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid
          direction={{ xs: 'column', md: 'row-reverse' }}
          container
          spacing={isDesktop ? 10 : 5}
        >
          <Grid item xs={12} md={5}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>

          {!isDesktop && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              {ViewAllButton}
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledDescription>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ my: 3 }}>
          Convenience at Your Fingertips! To order Bikaneri Namkeens items, simply click on Blow
          Button or WhatsApp us and we will take care of the rest!
        </Typography>
      </m.div>

      {isDesktop && ViewAllButton}
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <StyledContent>
      <Stack>
        <Box
          component={m.img}
          borderRadius={5}
          boxShadow={50}
          alt="hero-3"
          src="/assets/img/cat.jpeg"
        />
      </Stack>
    </StyledContent>
  );
}

// ----------------------------------------------------------------------

const ViewAllButton = (
  <m.div variants={varFade().inUp}>
    <Button
      size="large"
      // color="inherit"
      variant="outlined"
      target="_blank"
      rel="noopener"
      href={PATH_PAGE.bikaneriNamkeens}
    >
      Buy Now
    </Button>
  </m.div>
);

// ----------------------------------------------------------------------
