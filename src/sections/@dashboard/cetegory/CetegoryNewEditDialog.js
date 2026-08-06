import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { cetegoryCreate, cetegoryUpdate, deleteMedia, uploadMedia } from '../../../Services/UserSer';

CategoryNewEditDialog.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
  openPopover: PropTypes.bool,
  handleClosePopover: PropTypes.func,
};

export default function CategoryNewEditDialog({ isEdit, currentProduct, handleClosePopover, openPopover }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(
    () => ({ name: currentProduct?.name || '' }),
    [currentProduct]
  );

  const methods = useForm({ resolver: yupResolver(NewProductSchema), defaultValues });
  const { reset, handleSubmit, formState: { isSubmitting } } = methods;

  useEffect(() => {
    reset(defaultValues);
    setImageUrl(currentProduct?.image || '');
    setUploadError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError('');
    try {
      const { data } = await uploadMedia(file, 'categories');
      if (isEdit && imageUrl) {
        await deleteMedia(imageUrl).catch(() => {});
      }
      setImageUrl(data.url);
    } catch (err) {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (!imageUrl) {
        setUploadError('Please upload an image');
        return;
      }
      await (!isEdit
        ? cetegoryCreate({ ...data, image: imageUrl })
        : cetegoryUpdate(currentProduct?._id, { ...data, image: imageUrl }));
      reset();
      setImageUrl('');
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.category.root);
    } catch (error) {
      console.error(error);
    }
  };

  let uploadBtnLabel = 'Upload Image';
  if (uploading) uploadBtnLabel = 'Uploading...';
  else if (imageUrl) uploadBtnLabel = 'Change Image';

  return (
    <Dialog open={openPopover} onClose={handleClosePopover} fullWidth>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{!isEdit ? 'Create Category' : 'Edit Category'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} mt={3}>
            <RHFTextField name="name" label="Category Name" />

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>Category Image</Typography>
              {imageUrl && (
                <Box
                  component="img"
                  src={imageUrl}
                  alt="category"
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
                />
              )}
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              <Button
                variant="outlined"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploadBtnLabel}
              </Button>
              {uploadError && <Typography variant="caption" color="error">{uploadError}</Typography>}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting || uploading}>
            {!isEdit ? 'Create Category' : 'Save Changes'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
