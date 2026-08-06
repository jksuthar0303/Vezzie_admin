import PropTypes from 'prop-types';
import { useState } from 'react';

// @mui
import {
  Stack,
  Button,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// utils

// components

import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Markdown from '../../../../components/markdown';

// ----------------------------------------------------------------------

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const { name, actualPrice, unit, category, description, price } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        <TableCell width={8}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Image
              disabledEffect
              visibleByDefault
              alt={name}
              src={images}
              sx={{ borderRadius: 1.5, width: 48, height: 48 }}
            /> */}

            <Typography
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onViewRow}
              sx={{ cursor: 'pointer' }}
            >
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{category}</TableCell>
        <TableCell align="left">
          <Markdown children={description} />
        </TableCell>
        <TableCell align="left">{unit}</TableCell>
        <TableCell align="left">{price}</TableCell>
        <TableCell align="left">{actualPrice}</TableCell>

        {/* <TableCell align="center">
          <Label
            variant="soft"
            color={
              (inventoryType === 'out_of_stock' && 'error') ||
              (inventoryType === 'low_stock' && 'warning') ||
              'success'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {inventoryType ? sentenceCase(inventoryType) : ''}
          </Label>
        </TableCell> */}

        {/* <TableCell align="right">{fCurrency(price)}</TableCell> */}

        <TableCell align="right">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
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
