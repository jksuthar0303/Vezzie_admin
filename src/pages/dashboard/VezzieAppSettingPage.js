import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Grid, Button, Card, Typography, Stack, Box, Divider, Link } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import { appSettingView } from '../../Services/UserSer';
import Iconify from '../../components/iconify/Iconify';
import Label from '../../components/label/Label';
import AppSettingFeatured from '../../sections/@dashboard/app-setting copy/AppFeatured';

export default function VezzieAppSettingPage() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(null);

  const fetchAppSetting = async () => {
    try {
      const { data } = await appSettingView();
      setTableData(data?.settings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppSetting();
  }, []);

  const android = typeof tableData?.appVersion === 'object' ? tableData?.appVersion?.android : null;
  const ios = typeof tableData?.appVersion === 'object' ? tableData?.appVersion?.ios : null;

  return (
    <>
      <Helmet>
        <title> App Setting: List | Vezzie</title>
      </Helmet>
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="App Setting"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'App Setting',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.appSetting.edit}
              variant="contained"
              startIcon={<Iconify icon="eva:edit-fill" />}
            >
              Edit App Setting
            </Button>
          }
        />

        {/* General Info & Version Update Status */}
        <Grid container spacing={3} mb={4}>
          {/* General App Info */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" color="text.secondary">
                  App Profile
                </Typography>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {tableData?.appTitle || 'Vezzie'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {tableData?.appSlogan || 'Online Grocery & Daily Essentials'}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>

          {/* Android Version Status */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                borderLeft: '4px solid #2e7d32',
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="bxl:android" width={22} sx={{ color: '#2e7d32' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Android App
                    </Typography>
                  </Stack>
                  <Label color={android?.forceUpdate ? 'error' : 'success'}>
                    {android?.forceUpdate ? 'Force Update Active' : 'Normal'}
                  </Label>
                </Stack>

                <Divider />

                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Latest Version: <strong>{android?.latestVersion || (typeof tableData?.appVersion === 'string' ? tableData?.appVersion : '1.0.0')}</strong> (Build #{android?.latestBuildNumber ?? 1})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Min Required Build: <strong>#{android?.minRequiredBuildNumber ?? 1}</strong>
                  </Typography>
                  {android?.updateUrl && (
                    <Typography variant="caption" color="text.secondary" noWrap>
                      URL: <Link href={android.updateUrl} target="_blank" rel="noopener">{android.updateUrl}</Link>
                    </Typography>
                  )}
                  {android?.message && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 1 }}>
                      &ldquo;{android.message}&rdquo;
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid>

          {/* iOS Version Status */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                borderLeft: '4px solid #0277bd',
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="bxl:apple" width={22} sx={{ color: '#0277bd' }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      iOS App
                    </Typography>
                  </Stack>
                  <Label color={ios?.forceUpdate ? 'error' : 'info'}>
                    {ios?.forceUpdate ? 'Force Update Active' : 'Normal'}
                  </Label>
                </Stack>

                <Divider />

                <Stack spacing={0.5}>
                  <Typography variant="caption" color="text.secondary">
                    Latest Version: <strong>{ios?.latestVersion || (typeof tableData?.appVersion === 'string' ? tableData?.appVersion : '1.0.0')}</strong> (Build #{ios?.latestBuildNumber ?? 1})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Min Required Build: <strong>#{ios?.minRequiredBuildNumber ?? 1}</strong>
                  </Typography>
                  {ios?.updateUrl && (
                    <Typography variant="caption" color="text.secondary" noWrap>
                      URL: <Link href={ios.updateUrl} target="_blank" rel="noopener">{ios.updateUrl}</Link>
                    </Typography>
                  )}
                  {ios?.message && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 1 }}>
                      &ldquo;{ios.message}&rdquo;
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        {/* Banners */}
        <Typography variant="h6" mb={2}>
          Banners & Carousel
        </Typography>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12} md={5}>
            <Card
              onClick={() =>
                tableData?.banner?.category &&
                navigate(PATH_DASHBOARD.product.view(tableData?.banner?.category))
              }
              sx={{
                backgroundImage: `url(${tableData?.banner?.imgUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                maxWidth: 850,
                minHeight: 300,
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ color: '#fff' }} width={95}>
                {tableData?.banner?.titleLeft}
              </Typography>
              <Typography sx={{ color: '#fff' }} variant="h6">
                {tableData?.banner?.title}
              </Typography>
              <Typography sx={{ color: '#fff' }} width={65}>
                {tableData?.banner?.titleRight}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              onClick={() =>
                tableData?.banner2?.category &&
                navigate(PATH_DASHBOARD.product.view(tableData?.banner2?.category))
              }
              sx={{
                backgroundImage: `url(${tableData?.banner2?.imgUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                maxWidth: 850,
                minHeight: 300,
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ color: '#fff' }} width={95}>
                {tableData?.banner2?.titleLeft}
              </Typography>
              <Typography sx={{ color: '#fff' }} variant="h6">
                {tableData?.banner2?.title}
              </Typography>
              <Typography sx={{ color: '#fff' }} width={65}>
                {tableData?.banner2?.titleRight}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3} mb={5}>
          <Grid item xs={12} md={4}>
            <AppSettingFeatured list={tableData?.carousel} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppSettingFeatured list={tableData?.carousel2} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
