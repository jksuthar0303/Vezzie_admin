import PropTypes from 'prop-types';
// @mui
import { Stack, Checkbox, TableRow, TableCell, Typography } from '@mui/material';
// components
import { CustomAvatar } from '../../../../components/custom-avatar';
import { getUserAvatar } from '../../../../Services/UserSer';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onSelectRow }) {
  const { _id, name, mobile, state, pinCode, email, city, address } = row;

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar src={getUserAvatar(_id)} alt={name} name={name} />
            <div>
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>

              <Typography noWrap variant="body2" sx={{ color: 'text.disabled', cursor: 'pointer' }}>
                {email}
              </Typography>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{mobile}</TableCell>
        <TableCell align="left">{address}</TableCell>
        <TableCell align="left">{city}</TableCell>
        <TableCell align="left">{pinCode}</TableCell>
        <TableCell align="left">{state}</TableCell>
      </TableRow>

      {/* <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      /> */}
    </>
  );
}
