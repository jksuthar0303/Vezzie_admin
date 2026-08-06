import { Button, Card, Container } from '@mui/material';
import { Box, Stack } from '@mui/system';
import Image from '../../../components/image/Image';
import useResponsive from '../../../hooks/useResponsive';

export default function CategoriSec() {
  const isMobile = useResponsive('down', 'md');

  return (
    <Box sx={{ width: '100%', bgcolor: '#f5f5f5' }}>
      <Container sx={{ width: 1, py: 20 }}>
        {!isMobile && (
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={20} alignContent="center">
            <Card sx={{ borderRadius: 1, width: 'fit-content', border: 0 }}>
              <Image src="/assets/img/cat.jpg" alt="body" sx={{ p: 2 }} />
            </Card>
            <Stack>
              <Box
                sx={{
                  fontSize: 25,
                }}
              >
                <h6 style={{ color: '#000', textAlign: 'center' }}>Bikaneri Namkeens !</h6>
              </Box>

              <Stack>
                <h4 style={{ color: '#666868', letterSpacing: 1 }}>
                  {`Convenience at Your Fingertips! To order Bikaneri Namkeens
                items, simply click on Blow Button or WhatsApp us and we'll take
                care of the rest!`}
                </h4>
                <Button
                  variant="contained"
                  href="/categories"
                  sx={{
                    width: 'fit-content',
                    color: '#fff',
                    background: '#520098',
                    borderRadius: 1,
                    fontWeight: 'bold',
                    p: 1.5,
                  }}
                >
                  Buy Now
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}

        {isMobile && (
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={20} alignItems="center">
            <Card sx={{ borderRadius: 1, width: 'fit-content', border: 0 }}>
              <Image src="/assets/img/cat.jpg" alt="body" sx={{ p: 2 }} />
            </Card>
            <Stack>
              <Box
                sx={{
                  fontSize: 25,
                }}
              >
                <h1 style={{ color: '#000' }}>Bikaneri Namkeens !</h1>
              </Box>

              <Stack>
                <h4 style={{ color: '#666868', letterSpacing: 1 }}>
                  {`Convenience at Your Fingertips! To order Bikaneri Namkeens
                items, simply click on Blow Button or WhatsApp us and we'll take
                care of the rest!`}
                </h4>
                <Button
                  variant="contained"
                  href="/categories"
                  sx={{
                    width: 'fit-content',
                    color: '#fff',
                    background: '#520098',
                    borderRadius: 1,
                    fontWeight: 'bold',
                    p: 1.5,
                  }}
                >
                  Buy Now
                </Button>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
