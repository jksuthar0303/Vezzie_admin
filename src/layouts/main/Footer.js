import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid, Link, Stack, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'OUR INFORMATION',
    children: [
      { name: '+91 74248 08477', href: '#' },
      { name: 'info.vezzie@gmail.com', href: '#' },
    ],
  },
  {
    headline: 'HELP CENTER',
    children: [
      { name: 'Terms and Condition', href: PATH_PAGE.termsOfUse },
      { name: 'About Us', href: PATH_PAGE.about },
      { name: 'Privacy Policy', href: PATH_PAGE.privacy },
    ],
  },
  {
    headline: 'CORPORATE OFFICE',
    children: [{ name: 'Antyodya Nagar, Bikaner Rajastan - 334001', href: '#' }],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#1f232e',
        color: '#fff',
      }}
    >
      {/* <Divider /> */}

      <Container>
        <Grid
          container
          justifyContent={{
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              md: 'left',
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            {/* <Logo sx={{ mx: { md: 'inherit' } }} /> */}
            <Box
              component="img"
              src="/logo/logo_full_white.svg"
              sx={{ width: 130, height: 130, cursor: 'pointer' }}
            />
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Vezzie was founded in october 2023 with the aim of Done for early distribution of
              ration and other items. In which the company works to make grocery delivery as soon as
              possible in its limited area.
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton key={social.name} href={social.href} target="_blank">
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2} alignItems={{ md: 'flex-start' }}>
                  <Typography component="div" variant="h4">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      to={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { md: 'left' },
          }}
        >
          © 2023. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
