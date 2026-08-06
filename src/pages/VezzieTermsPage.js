import { Helmet } from 'react-helmet-async';
import { m, useScroll, useSpring } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { Box, Container, Divider } from '@mui/material';

// ----------------------------------------------------------------------

export default function VezzieTermsPage() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Helmet>
        <title> Terms Of Use | Vezzie</title>
      </Helmet>

      {progress}

      <Box>
        <Container sx={{ width: 1, py: 10 }}>
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={10} alignItems="center">
            <Box alignItems="center">
              <Stack sx={{ color: isLight ? '#000' : '#fff' }}>
                <h1>Terms Of Use</h1>
              </Stack>
              <Divider sx={{ my: 3 }} />

              <Stack sx={{ color: isLight ? '#000' : '#fff', fontSize: 'bold' }} spacing={4}>
                <h4>Version 1.0.0</h4>
                <h4>Last Updated:</h4>
              </Stack>

              <Stack sx={{ color: isLight ? '#000' : '#fff', mt: 3 }} spacing={6}>
                <h4>
                  We are providing 30 minutes grocery delivery only in Bikaner city of Rajasthan, If
                  any order is out side Bikaner city then it may take time to deliver that order and
                  consumer will have to pay delivery charges separately.
                </h4>

                <Stack spacing={2} sx={{ color: isLight ? '#000' : '#fff' }}>
                  <h4>1. Delivery, delivery fee and delivery time :</h4>
                  <h4>
                    The Company shall provide delivery of the Products during such time period as
                    communicated to You through the Platform. The Company endeavours to show the
                    estimated delivery time for every order , however , the Company does not
                    guarantee the delivery within the said time, since the exact delivery time of
                    each order may vary due to various factors such as availability of third party
                    delivery service providers, demand, traffic and weather conditions, a force
                    majeure event, etc. You agree that the Company reserves the right to charge You,
                    fee for rain, peak hours and/or very high demand in addition to the delivery fee
                    towards the delivery of the orders, which you can see on the view bill section
                    before checkout page on the Website.
                  </h4>
                </Stack>

                <Stack spacing={2} sx={{ color: isLight ? '#000' : '#fff' }}>
                  <h4>2. Delivery areas :</h4>
                  <h4>The delivery area may be limited to certain regions or postal codes.</h4>
                </Stack>

                <Stack spacing={2} sx={{ color: isLight ? '#000' : '#fff' }}>
                  <h4>3. Offers details :</h4>
                  <h4>
                    Flat Rs. 100 off on orders above Rs. 2499* This offer is applicable on all other
                    products Except products like Oil and Ghee. And the second offer is - Get free
                    home delivery on orders above Rs. 299* only.
                  </h4>
                </Stack>

                <Stack spacing={2} sx={{ color: isLight ? '#000' : '#fff' }}>
                  <h4>4. Payment Options :</h4>
                  <h4>
                    Payment options may include cash on delivery and other forms of online payment.
                  </h4>
                </Stack>

                <Stack spacing={2} sx={{ color: isLight ? '#000' : '#fff' }}>
                  <h4>5. Cancellation policy :</h4>
                  <h4>
                    The online grocery delivery store may have a policy for canceling orders,
                    including time frames for cancellations and any fees associated with canceling
                    an order.
                  </h4>
                </Stack>

                <h4 style={{ color: isLight ? '#000' : '#fff' }}>
                  {`
                It's important to read and understand the terms and conditions
                of an online grocery delivery store before placing an order to
                avoid any surprises or misunderstandings.
                `}
                </h4>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
