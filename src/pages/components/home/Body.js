import { Box, Container, Stack } from '@mui/material';
import Image from '../../../components/image/Image';

export default function Body() {
  return (
    <Box sx={{ width: 1, bgcolor: '#f5f5f5' }}>
      <Container sx={{ width: 1, py: 20 }}>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={20} alignItems="center">
          <Image src="/assets/img/body-1.png" alt="body" sx={{ p: 2 }} />
          <Stack>
            <Box
              sx={{
                fontSize: 25,
              }}
            >
              <h1 style={{ color: '#000' }}>
                Get Ready for a Fresh Shopping Experience: Our Grocery App is Coming Soon!
              </h1>
            </Box>

            <Stack>
              <h4 style={{ color: '#666868', letterSpacing: 1 }}>
                {` Convenience at Your Fingertips! To order any items, simply
                WhatsApp us and we'll take care of the rest!`}
              </h4>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
