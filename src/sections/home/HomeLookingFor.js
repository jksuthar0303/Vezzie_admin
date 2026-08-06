import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
// hooks

// routes
// import { PATH_ZONE_ON_STORE } from '../../routes/paths';
// components
import Image from '../../components/image';

import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeLookingFor() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 5, md: 0 }}
        >
          <Grid item xs={12} md={4}>
            <Description />
          </Grid>

          <Grid item xs={12} md={7}>
            <Content />
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Stack
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          Location
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography
          variant="h3"
          sx={{
            mt: 3,
            mb: { md: 5 },
          }}
        >
          Delivering Freshness to Your Doorstep,
          <br /> Exclusively in Bikaner!
        </Typography>
      </m.div>
      <m.div variants={varFade().inDown}>
        <Typography variant="body2" mt={2}>
          For customers outside our delivery area, we offer shipping options with nominal charges.
          Experience hassle-free grocery shopping wherever you are!
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Box component={m.div} variants={varFade().inUp}>
      <Image disabledEffect alt="location" src="/assets/img/loc-1.png" />
    </Box>
  );
}
