import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';

// components
import Logo from '../../components/logo';

//
import navConfig from './nav/config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';

// ----------------------------------------------------------------------

export default function Header() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  const openAppLink = () => {
    // Replace 'your-app-url' with your actual app URL
    const appUrl = 'https://play.google.com/store/apps/details?id=veziee_android.com'; // Replace with your app URL

    // Open the app link in a new tab
    window.open(appUrl, '_blank');
  };

  return (
    <AppBar ref={carouselRef} color="transparent" sx={{ boxShadow: 0, position: 'fixed' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_MAIN_DESKTOP - 10,
            },
          }),
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo />

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}

          <Button variant="contained" target="_blank" rel="noopener" onClick={openAppLink}>
            Get App
          </Button>

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
