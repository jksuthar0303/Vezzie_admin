import { Box, Button, Container, Stack } from '@mui/material';
import { Icon } from '@iconify/react';

export default function Footer() {
  const phoneNumber = '919511513819';

  const handleWhatsAppChat = () => {
    // Create the WhatsApp chat URL
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    // Open the WhatsApp chat in a new window or tab
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenLocation = () => {
    const latitude = 28.0343189;
    const longitude = 73.2707186;

    // Create the location URL
    const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

    // Open the location in a new window or tab
    window.open(locationUrl, '_blank');
  };

  const handleOpenEmail = () => {
    const email = 'info.vizze@gmail.com';

    // Create the mailto: link
    const mailtoUrl = `mailto:${email}`;

    // Open the email client
    window.open(mailtoUrl);
  };

  return (
    <Box sx={{ bgcolor: '#232223' }}>
      <Container>
        <Stack direction={{ sm: 'column', md: 'row' }} alignItems="center">
          {/* phn, add, mail */}

          <Stack spacing={4} sx={{ width: 1, py: 5 }}>
            <Stack direction="row" sx={{ maxWidth: 300 }}>
              <Icon icon="mdi:location" fontSize={50} color="#aaa" />
              <Button
                onClick={handleOpenLocation}
                sx={{ color: '#aaa', fontWeight: 'bold', fontSize: 15 }}
              >
                Antyodya Nagar, Bikaner Rajastan - 334001
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} p={0}>
              <Icon icon="formkit:whatsapp" fontSize={30} color="#43cba4" />
              <Button
                onClick={handleWhatsAppChat}
                sx={{
                  color: '#aaa',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                +919511513819
              </Button>
            </Stack>

            <Stack direction="row" spacing={3}>
              <Icon icon="icon-park-solid:mail-open" color="#aaa" fontSize={25} />
              <Button
                onClick={handleOpenEmail}
                sx={{ color: '#aaa', fontWeight: 'bold', fontSize: 15 }}
              >
                info.vizze@gmail.com
              </Button>
            </Stack>
          </Stack>

          {/* home, del add, con  */}
          <Stack sx={{ width: 1, py: 4 }} spacing={6}>
            <h2 style={{ color: '#fff' }}>HELP CENTER</h2>
            <Button size="medium" sx={{ color: '#aaa', width: 'fit-content' }} href="/">
              <h3>Home</h3>
            </Button>

            <Button size="small" sx={{ color: '#aaa', width: 'fit-content' }} href="/terms-of-use">
              <h3>Terms of Use</h3>
            </Button>
          </Stack>

          {/* founder */}
          <Stack sx={{ color: '#aaa', width: 1, py: 5 }} spacing={5}>
            <h3 style={{ color: '#fff', letterSpacing: 3 }}>VEZZIE</h3>
            <h3>Founder :- Vishnu Swami</h3>
            <h4>
              {/* (A convenient online grocery solution for busy individuals,
              bringing fresh produce and pantry essentials right to your
              doorstep). */}
              (Vezzie was founded in february 2023 with the aim of Done for early distribution of
              ration and other items. In which the company works to make grocery delivery as soon as
              possible in its limited area. )
            </h4>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
