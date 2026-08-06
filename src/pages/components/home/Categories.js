import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Products } from './Product';
import Image from '../../../components/image/Image';

export default function Categories() {
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
    <Box>
      <Container sx={{ width: 1, py: 10 }}>
        <Stack direction={{ sm: 'row', md: 'column' }} spacing={5} alignItems="center">
          <Stack sx={{ color: '#232223' }}>
            <h1>Bikaneri Namkeens</h1>
          </Stack>
          <Stack>
            <Divider sx={{ my: 3 }} />
            <Box
              width={1}
              p={5}
              gap={3}
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
                      <>
                        <Image src={p.image2} ratio="4/3" alt={p.name} />
                      </>
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
  );
}
