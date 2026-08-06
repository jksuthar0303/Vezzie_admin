import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections

import VezzieAppSettingEditForm from '../../sections/@dashboard/app-setting copy/AppSettingEditForm';
import { appSettingView } from '../../Services/UserSer';

// ----------------------------------------------------------------------

export default function VezzieAppSettingPage() {
  const { themeStretch } = useSettingsContext();
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
        <title> App Setting: Edit | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit App Setting"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'App Setting',
              href: PATH_DASHBOARD.appSetting.list,
            },
            { name: 'edit' },
          ]}
        />

        <VezzieAppSettingEditForm isEdit appSetting={tableData} />
      </Container>
    </>
  );
}
