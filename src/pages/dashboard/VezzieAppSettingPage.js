import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Grid, Button, Card, Typography } from '@mui/material';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import { appSettingView } from '../../Services/UserSer';
import Iconify from '../../components/iconify/Iconify';
import AppSettingFeatured from '../../sections/@dashboard/app-setting copy/AppFeatured';

export default function VezzieAppSettingPage() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  const fetchAppSetting = async () => {
    try {
      const { data } = await appSettingView();
      console.log({ data });
      setTableData(data?.settings);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAppSetting();
  }, []);

  return (
    <>
      <Helmet>
        <title> App Setting: List | Vezzie</title>
      </Helmet>
      <Container>
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
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Edit App Setting
            </Button>
          }
        />

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

        <Grid container spacing={3} mt={3}>
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
