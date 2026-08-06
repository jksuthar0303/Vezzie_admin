import PropTypes from 'prop-types';

// @mui
import { Box, Card, Link, Stack, IconButton } from '@mui/material';

// components
import Iconify from '../../../../components/iconify';

import Image from '../../../../components/image';

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.object,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function CategoryCard({ category, onEditRow, onViewRow }) {
  const { name, image } = category;

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        <Image alt={name} src={image} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }} direction="row">
        <Link onClick={onViewRow} color="inherit" variant="subtitle2" noWrap>
          {name}
        </Link>

        <IconButton color="default" onClick={onEditRow}>
          <Iconify icon="eva:edit-fill" />
        </IconButton>
      </Stack>
    </Card>
  );
}
