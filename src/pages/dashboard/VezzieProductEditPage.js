import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import ProductNewEditForm from '../../sections/@dashboard/product/ProductNewEditForm';
import { getProductId } from '../../Services/UserSer';

// ----------------------------------------------------------------------

export default function VezzieProductEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const { data } = await getProductId(id);
        console.log({ data });
        setProducts(data?.product);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
    };

    fetchproducts();
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Product: Edit product | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Product',
            },
            { name: products?.name },
          ]}
        />

        <ProductNewEditForm isEdit currentProduct={products} />
      </Container>
    </>
  );
}
