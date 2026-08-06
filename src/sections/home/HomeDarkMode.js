import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, Typography, Stack, IconButton, Box } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import SvgColor from '../../components/svg-color';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `url('/assets/background/overlay_4.jpg')`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  const { themeMode, onToggleMode } = useSettingsContext();

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="h4" sx={{ color: 'primary.main' }}>
            Get Ready for a Fresh Shopping Experience
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Stack spacing={2} direction="row" alignItems="center" display="inline-flex">
            <Typography variant="h2" sx={{ my: 3, color: 'common.white' }}>
              Our Grocery App is Coming Soon!
            </Typography>
          </Stack>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography sx={{ color: 'grey.500' }}>
            {` Convenience at Your Fingertips! To order any items, simply
                WhatsApp us and we'll take care of the rest!`}
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          {/* <Image
            src="/assets/img/body-1.png"
            alt="body"
            sx={{
              borderRadius: 2,
              my: { xs: 5, md: 10 },

              boxShadow: (theme) => `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
            }}
          /> */}
          <Stack alignItems="center">
            <Box
              component={m.img}
              alt="hero-3"
              src="/assets/img/body-1.png"
              sx={{ my: { xs: 5, md: 10 }, height: 500, width: 500 }}
            />
          </Stack>
        </m.div>
      </Container>
    </StyledRoot>
  );
}
