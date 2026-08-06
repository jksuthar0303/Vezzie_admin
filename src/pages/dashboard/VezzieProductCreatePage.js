import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ProductNewEditForm from '../../sections/@dashboard/product/ProductNewEditForm';

// ----------------------------------------------------------------------

export default function VezzieProductCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Product: Create a new product | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            // {
            //   name: 'Category',
            //   href: PATH_DASHBOARD.cetegory.list,
            // },
            { name: 'New product' },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </>
  );
}
