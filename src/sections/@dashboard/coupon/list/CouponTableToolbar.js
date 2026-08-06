import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Button } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const INPUT_WIDTH = 160;

CouponTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onResetFilter: PropTypes.func,
  filterPublic: PropTypes.string,
  onFilterPublic: PropTypes.func,
  optionsPublic: PropTypes.arrayOf(PropTypes.string),
};

export default function CouponTableToolbar({
  isFiltered,
  filterName,
  onFilterName,

  filterPublic,
  onResetFilter,

  optionsPublic,

  onFilterPublic,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        select
        label="public"
        value={filterPublic}
        onChange={onFilterPublic}
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: { maxHeight: 220 },
            },
          },
        }}
        sx={{
          maxWidth: { md: INPUT_WIDTH },
          textTransform: 'capitalize',
        }}
      >
        {optionsPublic.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search by Coupon..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
