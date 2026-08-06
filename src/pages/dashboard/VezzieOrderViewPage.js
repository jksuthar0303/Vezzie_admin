import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import OrderDetails from '../../sections/@dashboard/order/details';
import { getOrderView } from '../../Services/UserSer';

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const [orders, setOrders] = useState();
  console.log({ id });
  useEffect(() => {
    const fetchOrderView = async () => {
      try {
        const { data } = await getOrderView(id);
        console.log({ data });
        setOrders(data?.order);
      } catch (error) {
        console.log('Failed to fetch order', error);
      }
    };

    fetchOrderView();
  }, [id]);

  const currentOrder = orders?.find((order) => order?._id === id);

  console.log({ currentOrder });

  return (
    <>
      <Helmet>
        <title> Order: View | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Order Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Order',
              href: PATH_DASHBOARD?.order?.list,
            },
            { name: `${currentOrder?.user?.name}` },
          ]}
        />

        <OrderDetails order={currentOrder} />
      </Container>
    </>
  );
}
