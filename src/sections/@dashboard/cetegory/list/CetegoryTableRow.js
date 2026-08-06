import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Stack, TableRow, MenuItem, TableCell, IconButton, Link } from '@mui/material';

// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

CetegoryTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function CetegoryTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const { name, image, products } = row;

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="fe:arrow-down" />
          </IconButton>
          {/* <Checkbox checked={selected} onClick={onSelectRow} /> */}
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Image
              disabledEffect
              visibleByDefault
              alt={name}
              src={image}
              sx={{ borderRadius: 1.5, width: 48, height: 48 }}
            />

            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onViewRow}
              sx={{ cursor: 'pointer' }}
            >
              {name}
            </Link>
          </Stack>
        </TableCell>

        <TableCell align="left">{products}</TableCell>

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
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>
    </>
  );
}
