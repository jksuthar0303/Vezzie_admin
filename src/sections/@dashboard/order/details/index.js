/* eslint-disable no-unsafe-optional-chaining */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Stack,
} from '@mui/material';

// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
import InvoiceToolbar from './InvoiceToolbar';
import { fDateTime } from '../../../../utils/formatTime';
//

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

OrderDetails.propTypes = {
  order: PropTypes.object,
};

export default function OrderDetails({ order }) {
  if (!order) {
    return null;
  }
  console.log({ order });
  const {
    products,
    status,
    subTotal,
    total,
    address,
    paymentMode,
    discount,
    deliveryCharge,
    invoiceNumber,
    createdAt,
    tipAmount,
  } = order;

  return (
    <>
      <InvoiceToolbar invoice={order} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            {products?.map((row) => (
              <Image disabledEffect alt="logo" src={row?.product?.images} sx={{ maxWidth: 150 }} />
            ))}
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (status === 'paid' && 'success') ||
                  (status === 'unpaid' && 'warning') ||
                  (status === 'cancel' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>

              <Stack spacing={1}>
                <Typography variant="body2" color="default">
                  {invoiceNumber}
                </Typography>
                <Typography variant="body2" color="default">
                  {fDateTime(createdAt)}
                </Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Stack spacing={2}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Order to :-
              </Typography>

              <Typography variant="body2">Name : {address.name}</Typography>

              <Typography variant="body2">Mail : {address.email}</Typography>

              <Typography variant="body2">
                Address : {address?.addressLineOne}, {address?.addressLineTwo}
              </Typography>

              <Typography variant="body2">Phone : {address.mobile}</Typography>

              <Typography variant="body2">payment Mode : {paymentMode}</Typography>
            </Stack>
          </Grid>
        </Grid>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Products</TableCell>
                  {/* <TableCell align="left">Unit</TableCell> */}

                  <TableCell align="left">Qty</TableCell>

                  <TableCell align="right">Unit price</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">
                          {row?.product?.name} ({row?.product?.unit})
                        </Typography>

                        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {row.description}
                        </Typography> */}
                      </Box>
                    </TableCell>

                    {/* <TableCell align="left">{row?.product?.unit}</TableCell> */}

                    <TableCell align="left">{row.qty}</TableCell>

                    <TableCell align="right">₹ {fCurrency(row?.product?.price)}</TableCell>

                    <TableCell align="right">
                      ₹ {fCurrency(row?.product?.price * row?.qty)}
                    </TableCell>
                  </TableRow>
                ))}

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 3 }} />
                    Subtotal
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />₹ {fCurrency(subTotal)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 3 }} />
                    Delivery Charge
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />₹ {deliveryCharge && fCurrency(deliveryCharge)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 3 }} />
                    Tip Amount
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />₹ {tipAmount && fCurrency(tipAmount)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 3 }} />
                    Discount
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />₹ {discount && fCurrency(-discount)}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'h6' }}>
                    Total
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                    ₹ {fCurrency(total)}
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />
      </Card>
    </>
  );
}
