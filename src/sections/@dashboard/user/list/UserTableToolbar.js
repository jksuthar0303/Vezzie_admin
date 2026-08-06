import PropTypes from 'prop-types';
// @mui
import { Stack, InputAdornment, TextField, Button } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterAddress: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterAddress: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterAddress,
  optionsRole,
  onFilterName,
  onFilterAddress,
  onResetFilter,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search Clinte Name or Mobile or Email...."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        value={filterAddress}
        onChange={onFilterAddress}
        placeholder="Search Clint Address or Pin Code...."
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
