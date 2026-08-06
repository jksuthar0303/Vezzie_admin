import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
} from '../../../components/hook-form';
import { couponCreate, couponUpdate } from '../../../Services/UserSer';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

CouponNewEditDialog.propTypes = {
  isEdit: PropTypes.bool,
  currentCoupon: PropTypes.object,
  openPopover: PropTypes.bool,
  handleClosePopover: PropTypes.func,
};

export default function CouponNewEditDialog({
  isEdit,
  currentCoupon,
  handleClosePopover,
  openPopover,
}) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewCouponSchema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Coupon Type is required'),
    public: Yup.string().required('Public is required'),
    limit: Yup.string().required('Limit of Coupon is required'),
    // discountAmount: Yup.string().required('Discount of amount is required'),
    minimumOrder: Yup.string().required('Minimum order is required'),
    // amountUpto: Yup.string().required('amountUpto order is required'),
  });

  const defaultValues = useMemo(
    () => ({
      type: currentCoupon?.type || '',
      code: currentCoupon?.code || '',
      description: currentCoupon?.description || '',
      public: currentCoupon?.public || '',
      limit: currentCoupon?.limit || 0,
      discountAmount: currentCoupon?.discountAmount || null,
      discountPercent: currentCoupon?.discountPercent || '',
      minimumOrder: currentCoupon?.minimumOrder || '',
      amountUpto: currentCoupon?.amountUpto || '',
      title: currentCoupon?.title || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCoupon]
  );
  console.log({ currentCoupon });

  const methods = useForm({
    resolver: yupResolver(NewCouponSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  console.log({ errors });
  const values = watch();

  useEffect(() => {
    if (isEdit && currentCoupon) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCoupon]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        console.log({ data }, 'update');

        await couponUpdate(currentCoupon?._id, data);
      } else {
        console.log({ data }, 'create');
        await couponCreate(data);
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.coupon.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log({ values });

  return (
    <Dialog open={openPopover} onClose={handleClosePopover} fullWidth>
      <DialogTitle>{!isEdit ? 'Create Coupon' : 'Edit Coupon'}</DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mt={2}>
            <Stack spacing={3} direction="row">
              <RHFTextField name="title" label="Coupon Title" />
              <RHFTextField name="code" label="Coupon Code" />
            </Stack>
            <RHFTextField name="description" multiline rows={4} label="Description" />
          </Stack>

          <Stack direction="row" spacing={8} mt={2}>
            <Stack direction="row">
              <RHFSwitch name="public" />

              <Typography variant="body2" sx={{ mt: 1 }}>
                Public
              </Typography>
            </Stack>

            <RHFRadioGroup
              row
              name="type"
              spacing={4}
              options={[
                { value: 'Amount', label: 'Amount' },
                { value: 'Percent', label: 'Percent' },
              ]}
            />
          </Stack>

          {values?.type === 'Amount' ? (
            <Stack direction="row" mt={3} spacing={3}>
              <RHFTextField name="discountAmount" label="Discount in Amount" />
            </Stack>
          ) : (
            <Stack direction="row" mt={3} spacing={3}>
              <RHFTextField name="discountPercent" label="Discount in Percent" />
              <RHFTextField name="amountUpto" label="Amount Upto" />
            </Stack>
          )}

          <Stack mt={3} direction="row" spacing={3}>
            <RHFTextField name="minimumOrder" label="Minimum Order" />
            <RHFTextField name="limit" label="Limit" />
          </Stack>

          <DialogActions>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Coupon' : 'Save Changes'}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
