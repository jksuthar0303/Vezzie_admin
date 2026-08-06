import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container component={MotionViewport}>
      <Box
        sx={{
          mb: 8,
          height: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image
          objectFit="contain"
          sx={{ aspectRatio: '1/1', objectFit: 'contain', height: '100%' }}
          src="/assets/images/about/about.jpeg"
          alt="about-vision"
        />
      </Box>

      <m.div variants={varFade().inUp}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          The Heighest Quality Of Products
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="body" sx={{ textAlign: 'start', maxWidth: 800, mx: 'auto' }}>
          At Vezzie, we never compromise on quality. Our commitment to bringing you the highest
          quality products is unwavering.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ my: 3 }}>
          Fast Delivery at Your Door Step
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            // mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
            textAlign: 'start',
          }}
        >
          We are delivering your grocery at your doorstep in just 30 to 45 minutes only in Bikaner.
        </Typography>
      </m.div>
    </Container>
  );
}
