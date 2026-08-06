import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Box, Card, Link, Stack, Typography, IconButton } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ProductCard({ product }) {
  const { name, images, price, actualPrice, unit } = product;
  const navigate = useNavigate();

  const imgList = Array.isArray(images) ? images.filter(Boolean) : [images].filter(Boolean);
  const [current, setCurrent] = useState(0);

  const handleEdit = () => navigate(PATH_DASHBOARD.product.edit(product._id));

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + imgList.length) % imgList.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % imgList.length);
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 1, position: 'relative' }}>
        <Image
          alt={name}
          src={imgList[current]}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
        />

        {imgList.length > 1 && (
          <>
            <IconButton
              size="small"
              onClick={prev}
              sx={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.4)', color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
                zIndex: 1,
              }}
            >
              <Iconify icon="eva:chevron-left-fill" width={18} />
            </IconButton>

            <IconButton
              size="small"
              onClick={next}
              sx={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.4)', color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
                zIndex: 1,
              }}
            >
              <Iconify icon="eva:chevron-right-fill" width={18} />
            </IconButton>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={0.5}
              sx={{ position: 'absolute', bottom: 12, width: '100%', left: 0 }}
            >
              {imgList.map((_, i) => (
                <Box
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  sx={{
                    width: i === current ? 16 : 6,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: i === current ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'width 0.2s',
                  }}
                />
              ))}
            </Stack>
          </>
        )}
      </Box>

      <Stack spacing={1} sx={{ p: 2, flexGrow: 1 }}>
        <Link onClick={handleEdit} color="inherit" variant="subtitle2" noWrap sx={{ cursor: 'pointer' }}>
          {name}
        </Link>

        <Typography color="text.secondary" variant="caption">
          {`Unit: ${unit}`}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 'auto' }}>
          <Typography variant="subtitle2">{`₹${price}`}</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            {`₹${actualPrice}`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
