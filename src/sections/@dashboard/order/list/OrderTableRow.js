import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Link,
  Stack,
  Button,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Chip,
} from '@mui/material';

// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { CustomAvatar } from '../../../../components/custom-avatar';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { useSnackbar } from '../../../../components/snackbar';
import { fDateTime } from '../../../../utils/formatTime';
import { orderUpdate } from '../../../../Services/UserSer';

// ----------------------------------------------------------------------

OrderTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function OrderTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { address, paymentMode, status, total, subTotal, createdAt, invoiceNumber } = row;

  // eslint-disable-next-line no-unused-vars
  const [orderStatusUpdate, setOrderStatusUpdate] = useState(row?.status);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const markAsPaid = async () => {
    try {
      setOrderStatusUpdate('paid');

      await orderUpdate(row?._id, { status: 'paid' });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async () => {
    try {
      setOrderStatusUpdate('cancel');

      await orderUpdate(row?._id, { status: 'cancel' });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const copyAddressLink = () => {
    const { lat, lng, addressLineOne, addressLineTwo, city, state } = address || {};
    let mapsUrl;

    if (lat && lng) {
      mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    } else {
      // Fallback: use text address for search
      const fullAddress = [addressLineOne, addressLineTwo, city, state].filter(Boolean).join(', ');
      mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(fullAddress)}`;
    }

    navigator.clipboard.writeText(mapsUrl).then(() => {
      enqueueSnackbar('Maps link copied to clipboard!', { variant: 'success' });
    }).catch(() => {
      enqueueSnackbar('Failed to copy link', { variant: 'error' });
    });

    handleClosePopover();
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell width={12}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={address?.name} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {address?.name ? address?.name : address?.mobile}
              </Typography>

              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {invoiceNumber}
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Chip label={`mobile: ${address?.mobile}`} />
        </TableCell>

        <TableCell align="left">
          <Chip label={fDateTime(createdAt)} />
        </TableCell>

        <TableCell align="center">
          <Chip label={paymentMode} />
        </TableCell>

        <TableCell align="center">
          <Stack spacing={1}>
            <Chip label={`SubTotal: ${subTotal} ₹`} />
            <Chip label={`Total: ${total} ₹`} />
          </Stack>
        </TableCell>

        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {address.addressLineOne}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'unpaid' && 'warning') ||
              (status === 'cancel' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem onClick={markAsPaid}>
          <Iconify icon="eva:edit-fill" />
          Mark as Paid
        </MenuItem>
        <MenuItem onClick={copyAddressLink}>
          <Iconify icon="eva:copy-fill" />
          Copy Address
        </MenuItem>

        <MenuItem onClick={cancelOrder}>
          <Iconify icon="mdi:cancel-bold" />
          Cancel
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
