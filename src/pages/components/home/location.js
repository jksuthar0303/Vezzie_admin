import { Box, Container, Stack } from '@mui/material';
import Image from '../../../components/image/Image';

export default function Location() {
  return (
    <Box sx={{ width: 1 }}>
      <Container sx={{ width: 1, py: 20 }}>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={20} alignItems="center">
          <Stack>
            <Box
              sx={{
                fontSize: 25,
              }}
            >
              <h1>Delivering Freshness to Your Doorstep, Exclusively in Bikaner!</h1>
            </Box>

            <Stack>
              <h4 style={{ color: '#666868', letterSpacing: 1 }}>
                For customers outside our delivery area, we offer shipping options with nominal
                charges. Experience hassle-free grocery shopping wherever you are!
              </h4>
            </Stack>
          </Stack>

          <Image src="/assets/img/loc-1.png" alt="hero" />
        </Stack>
      </Container>
    </Box>
  );
}
