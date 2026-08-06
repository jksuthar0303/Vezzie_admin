import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box, Button, Card, Grid, InputAdornment,
  Stack, TextField, Typography,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import { categoryViewList, deleteMedia, productCreate, productUpdate, uploadMedia } from '../../../Services/UserSer';
import FormProvider, { RHFAutocomplete, RHFEditor, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/iconify';

ProductNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewEditForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [categoryData, setCategoryData] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadErrors, setUploadErrors] = useState({});
  const fileRefs = useRef([]);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.array().min(1).required('Image is required'),
    price: Yup.number().moreThan(0, 'Price should not be ₹0.00'),
    actualPrice: Yup.number().moreThan(0, 'Actual Price should not be ₹0.00'),
    description: Yup.string().required('Description is required'),
    unit: Yup.string().required('Unit of product is required'),
    tags: Yup.array().required('Tag is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images?.length ? currentProduct.images : [''],
      price: currentProduct?.price || 0,
      actualPrice: currentProduct?.actualPrice || 0,
      category: currentProduct?.category || null,
      unit: currentProduct?.unit || '',
      tags: currentProduct?.tags || [''],
    }),
    [currentProduct]
  );

  const methods = useForm({ resolver: yupResolver(NewProductSchema), defaultValues });
  const { reset, control, watch, setValue, handleSubmit, formState: { isSubmitting, errors } } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: 'images' });
  const values = watch();

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  useEffect(() => {
    categoryViewList()
      .then(({ data }) => setCategoryData(data?.categorys))
      .catch(console.error);
  }, []);

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingIndex(index);
    setUploadErrors((prev) => ({ ...prev, [index]: '' }));
    try {
      const oldUrl = values.images[index];
      const { data } = await uploadMedia(file, 'products');
      if (isEdit && oldUrl && oldUrl.startsWith('https://')) {
        await deleteMedia(oldUrl).catch(() => {});
      }
      setValue(`images.${index}`, data.url, { shouldValidate: true });
    } catch (err) {
      setUploadErrors((prev) => ({ ...prev, [index]: 'Upload failed. Try again.' }));
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleRemove = async (index) => {
    const url = values.images[index];
    if (url && url.startsWith('https://')) {
      await deleteMedia(url).catch(() => {});
    }
    remove(index);
  };

  const onSubmit = async (data) => {
    try {
      await (!isEdit ? productCreate(data) : productUpdate(currentProduct?._id, data));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.product.view(values?.category));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Product Name" />

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Description</Typography>
                <RHFEditor simple name="description" />
              </Stack>

              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Images</Typography>
                {fields.map((item, index) => {
                  const hasUrl = values.images[index] && values.images[index].startsWith('https://');
                  let uploadBtnLabel = 'Upload Image';
                  if (uploadingIndex === index) uploadBtnLabel = 'Uploading...';
                  else if (hasUrl) uploadBtnLabel = 'Change Image';
                  return (
                  <Stack key={item.id} spacing={1}>
                    {hasUrl && (
                      <Box
                        component="img"
                        src={values.images[index]}
                        alt={`product-${index}`}
                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
                      />
                    )}
                    <input
                      ref={(el) => { fileRefs.current[index] = el; }}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileChange(e, index)}
                    />
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => fileRefs.current[index]?.click()}
                        disabled={uploadingIndex === index}
                      >
                        {uploadBtnLabel}
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Iconify icon="eva:trash-2-outline" />}
                        onClick={() => handleRemove(index)}
                        disabled={uploadingIndex === index}
                      >
                        Remove
                      </Button>
                    </Stack>
                    {uploadErrors[index] && (
                      <Typography variant="caption" color="error">{uploadErrors[index]}</Typography>
                    )}
                  </Stack>
                  );
                })}

                <Box>
                  <Button
                    size="small"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => append('')}
                  >
                    Add Image
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <RHFAutocomplete
                  name="category"
                  label="Category"
                  value={categoryData?.find((c) => c?._id === values?.category)}
                  onChange={(e, value) => setValue('category', value?._id)}
                  options={categoryData?.map((option) => option)}
                  getOptionLabel={(option) => option?.name}
                />
                <RHFTextField
                  name="unit"
                  label="Product Unit"
                  onChange={(event) => setValue('unit', String(event.target.value), { shouldValidate: true })}
                />
                <RHFAutocomplete
                  name="tags"
                  label="Tags"
                  multiple
                  freeSolo
                  filterSelectedOptions
                  getOptionLabel={(option) => option}
                  options={[]}
                  ChipProps={{ size: 'small' }}
                  renderInput={(params) => <TextField {...params} label="Tags" />}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Sale Price"
                  placeholder="0.00"
                  onChange={(event) => setValue('price', String(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Box component="span" sx={{ color: 'text.disabled' }}>₹</Box></InputAdornment>,
                    type: 'string',
                  }}
                />
                <RHFTextField
                  name="actualPrice"
                  label="Actual Price"
                  placeholder="0.00"
                  onChange={(event) => setValue('actualPrice', String(event.target.value), { shouldValidate: true })}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Box component="span" sx={{ color: 'text.disabled' }}>₹</Box></InputAdornment>,
                    type: 'string',
                  }}
                />
              </Stack>
            </Card>

            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting || uploadingIndex !== null}
            >
              {!isEdit ? 'Create Product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
