import PropTypes from 'prop-types';

import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

// @mui
import {
  Box,
  Stack,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
} from '@mui/material';
// routes

// components
import Iconify from '../../../../components/iconify';
//
import InvoicePDF from './InvoicePDF';
import { orderUpdate } from '../../../../Services/UserSer';

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceToolbar({ invoice }) {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(invoice?.status);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markAsPaid = async () => {
    try {
      setStatus('paid');

      await orderUpdate(invoice?._id, { status: 'paid' });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async () => {
    try {
      setStatus('cancel');

      await orderUpdate(invoice?._id, { status: 'cancel' });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="View">
            <IconButton onClick={handleOpen}>
              <Iconify icon="eva:eye-fill" />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName={invoice?.invoiceNumber}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon="eva:download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={markAsPaid}
            startIcon={<Iconify icon="eva:checkmark-fill" />}
            sx={{ alignSelf: 'flex-end' }}
          >
            Mark as Paid
          </Button>

          <Button
            onClick={cancelOrder}
            color="error"
            variant="outlined"
            sx={{ alignSelf: 'flex-end' }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
