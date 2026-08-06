import { Helmet } from 'react-helmet-async';
import { m, useScroll, useSpring } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import Image from '../components/image/Image';
import { Products } from './components/home/Product';

// ----------------------------------------------------------------------

export default function BikaneriNamkeensPage() {
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

  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleProductHover = (productId) => {
    setHoveredProductId(productId);
  };

  const handleProductHoverEnd = () => {
    setHoveredProductId(null);
  };

  // to whatsapp chat
  const handleClick = (p) => {
    const message = `I'm interested in the product: ${p.name}. Please provide more information.`;
    const phone = '917424808477';

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title> Bikaneri Namkeens | Vezzie</title>
      </Helmet>

      {progress}

      <Box>
        <Container sx={{ width: 1, py: 10 }}>
          <Stack direction={{ sm: 'row', md: 'column' }} spacing={5} alignItems="center">
            <Stack sx={{ color: isLight ? '#000' : '#fff' }}>
              <h1>Bikaneri Namkeens</h1>
            </Stack>
            <Stack>
              <Divider />
              <Box
                width={1}
                p={5}
                gap={10}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                }}
              >
                {Products.map((p) => (
                  <Grid
                    key={p.id}
                    className="product"
                    onMouseEnter={() => handleProductHover(p.id)}
                    onMouseLeave={handleProductHoverEnd}
                  >
                    <Box className="product-images">
                      {hoveredProductId === p.id ? (
                        <Image src={p.image2} ratio="4/3" alt={p.name} />
                      ) : (
                        <Image src={p.image1} ratio="4/3" alt={p.name} />
                      )}
                    </Box>
                    <Stack spacing={3} mt={3}>
                      <Typography fontWeight="bold">{p.name}</Typography>
                      <Stack spacing={5} direction="row" justifyContent="center">
                        <Typography fontWeight="bold">Rs. {p.price} ₹</Typography>
                        <Button
                          variant="contained"
                          onClick={() => handleClick(p)}
                          sx={{
                            width: 'fit-content',
                            color: '#fff',
                            background: '#520098',
                            borderRadius: 3,
                            fontWeight: 'bold',
                          }}
                        >
                          Buy Now
                        </Button>
                      </Stack>
                    </Stack>
                  </Grid>
                ))}
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
