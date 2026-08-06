import { Box, Button, Container, Stack } from '@mui/material';
import Image from '../../../components/image/Image';
import useResponsive from '../../../hooks/useResponsive';

export default function Hero() {
  const isMobile = useResponsive('down', 'md');

  const phoneNumber = '919511513819';
  const handleWhatsAppChat = () => {
    // Create the WhatsApp chat URL
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    // Open the WhatsApp chat in a new window or tab
    window.open(whatsappUrl, '_blank');
  };

  const openAppLink = () => {
    // Replace 'your-app-url' with your actual app URL
    const appUrl = 'https://play.google.com/store/apps/details?id=veziee_android.com'; // Replace with your app URL

    // Open the app link in a new tab
    window.open(appUrl, '_blank');
  };
  return (
    <Box>
      <Container sx={{ width: 1, py: 8, mt: 2 }}>
        {!isMobile && (
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={20} alignItems="center">
            <Stack>
              <Box
                sx={{
                  fontSize: 25,
                }}
              >
                {/* <h1>Let Your Groceries come to you</h1> */}
                <h1>We Are Accepting Orders On Call And WhatsApp </h1>
              </Box>

              <Stack>
                <h4 style={{ color: '#666868', letterSpacing: 1 }}>
                  Convenience at Your Fingertips Order groceries online and save time for what
                  matters most.
                </h4>
              </Stack>
              <Stack direction="row" spacing={8}>
                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    background: '#520098',
                    borderRadius: 1,
                    fontWeight: 'bold',
                    p: 1.5,
                  }}
                  onClick={() => openAppLink()}
                >
                  Call Now
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    background: '#520098',
                    borderRadius: 1,
                    fontWeight: 'bold',
                    p: 1.5,
                  }}
                  onClick={handleWhatsAppChat}
                >
                  WhatsApp Now
                </Button>
              </Stack>
            </Stack>

            <Image src="/assets/img/hero-3.png" alt="hero" sx={{ p: 3 }} />
          </Stack>
        )}
        {isMobile && (
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={20} alignItems="center">
            <Stack>
              <Box
                sx={{
                  fontSize: 25,
                }}
              >
                <h4 style={{ textAlign: 'center' }}>
                  We Are Accepting Orders On Call And WhatsApp
                </h4>
              </Box>

              <Stack>
                <h4 style={{ color: '#666868', letterSpacing: 1, textAlign: 'center' }}>
                  Convenience at Your Fingertips Order groceries online and save time for what
                  matters most.
                </h4>
              </Stack>
              <Stack direction="row" spacing={8} justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    background: '#520098',
                    borderRadius: 1,
                    fontWeight: 'bold',
                    p: 1.5,
                  }}
                  onClick={() => openAppLink()}
                >
                  Get App
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    color: '#fff',
                    background: '#520098',
                    borderRadius: 1,
                    fontWeight: 'bold',
                    p: 1.5,
                  }}
                  onClick={handleWhatsAppChat}
                >
                  WhatsApp Now
                </Button>
              </Stack>
            </Stack>

            <Image src="/assets/img/hero-3.png" alt="hero" sx={{ p: 6 }} />
          </Stack>
        )}
      </Container>
    </Box>
  );
}
