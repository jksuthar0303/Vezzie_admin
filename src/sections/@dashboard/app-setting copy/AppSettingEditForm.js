import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Stack, Typography, Button, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../../components/hook-form/FormProvider';
import { appSettingUpdate, categoryViewList, deleteMedia, uploadMedia } from '../../../Services/UserSer';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { RHFAutocomplete, RHFTextField } from '../../../components/hook-form';

VezzieAppSettingEditForm.propTypes = {
  isEdit: PropTypes.bool,
  appSetting: PropTypes.object,
};

// Reusable single-image picker
function ImagePicker({ label, value, onChange, folder }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const { data } = await uploadMedia(file, folder);
      if (value) await deleteMedia(value).catch(() => {});
      onChange(data.url);
    } catch {
      setError('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  let btnLabel = 'Upload';
  if (uploading) btnLabel = 'Uploading...';
  else if (value) btnLabel = 'Change';

  return (
    <Stack spacing={1} flex={1}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      {value && (
        <Box
          component="img"
          src={value}
          alt={label}
          sx={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
        />
      )}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      <Button variant="outlined" size="small" onClick={() => fileRef.current?.click()} disabled={uploading}>
        {btnLabel}
      </Button>
      {error && <Typography variant="caption" color="error">{error}</Typography>}
    </Stack>
  );
}

ImagePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  folder: PropTypes.string,
};

export default function VezzieAppSettingEditForm({ appSetting, isEdit }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const NewAppSchema = Yup.object().shape({
    appTitle: Yup.string().required('App Title is required'),
    appSlogan: Yup.string().required('App Slogan is required'),
    appVersion: Yup.string().required('App Version is required'),
    banner: Yup.object().shape({
      title: Yup.string().required('Banner Title is required'),
      titleLeft: Yup.string().required('Banner Title Left is required'),
      titleRight: Yup.string().required('Banner Title Right is required'),
    }).required(),
    banner2: Yup.object().shape({
      title: Yup.string().required('Banner2 Title is required'),
      titleLeft: Yup.string().required('Banner2 Title Left is required'),
      titleRight: Yup.string().required('Banner2 Title Right is required'),
    }).required(),
    carousel: Yup.array().of(Yup.string().required()).required(),
    carousel2: Yup.array().of(Yup.string().required()).required(),
  });

  const defaultValues = useMemo(() => ({
    appTitle: appSetting?.appTitle || '',
    appSlogan: appSetting?.appSlogan || '',
    appVersion: appSetting?.appVersion || '',
    banner: appSetting?.banner || { imgUrl: '', routeID: '', titleLeft: '', title: '', titleRight: '' },
    banner2: appSetting?.banner2 || { imgUrl: '', routeID: '', titleLeft: '', title: '', titleRight: '' },
    carousel: appSetting?.carousel || ['', '', '', '', '', ''],
    carousel2: appSetting?.carousel2 || ['', '', '', '', '', ''],
    carousel_one_url: appSetting?.carousel_one_url || ['', '', '', '', '', ''],
    carousel_two_url: appSetting?.carousel_two_url || ['', '', '', '', '', ''],
  }), [appSetting]);

  const methods = useForm({ resolver: yupResolver(NewAppSchema), defaultValues });
  const { reset, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = methods;
  const values = watch();

  useEffect(() => {
    if (isEdit && appSetting) reset(defaultValues);
    if (!isEdit) reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, appSetting]);

  useEffect(() => {
    categoryViewList()
      .then(({ data }) => setCategory(data?.categorys || []))
      .catch(console.error);
  }, []);

  const onSubmit = async (data) => {
    try {
      if (data?.banner?.routeID?._id) data.banner.routeID = data.banner.routeID._id;
      if (data?.banner2?.routeID?._id) data.banner2.routeID = data.banner2.routeID._id;
      await appSettingUpdate(data);
      enqueueSnackbar('Update success!');
      navigate(PATH_DASHBOARD.appSetting.root);
    } catch (error) {
      console.log(error);
    }
  };

  const carouselLabels = ['1', '2', '3', '4', '5', '6'];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        {/* App Info */}
        <Stack spacing={3} mb={3}>
          <Typography variant="h6">App Setting :</Typography>
          <Stack spacing={3} direction="row">
            <RHFTextField name="appTitle" label="App Title" />
            <RHFTextField name="appSlogan" label="App Slogan" />
            <RHFTextField name="appVersion" label="App Version" />
          </Stack>
        </Stack>

        {/* Banner 1 */}
        <Stack spacing={3} mb={3}>
          <Typography variant="h6">1st Banner :</Typography>
          <Stack spacing={3} direction="row" alignItems="flex-end">
            <ImagePicker
              label="Banner Image"
              value={values.banner?.imgUrl}
              onChange={(url) => setValue('banner.imgUrl', url)}
              folder="banners"
            />
            <RHFAutocomplete
              fullWidth
              name="banner.routeID"
              value={category?.find((e) => e?._id === values?.banner?.routeID)}
              onChange={(e, newValue) => setValue('banner.routeID', newValue?._id)}
              options={category}
              label="Category"
              getOptionLabel={(option) => option?.name}
            />
            <RHFTextField name="banner.titleLeft" label="Title Left" />
            <RHFTextField name="banner.title" label="Title" />
            <RHFTextField name="banner.titleRight" label="Title Right" />
          </Stack>
        </Stack>

        {/* Banner 2 */}
        <Stack spacing={3} mb={3}>
          <Typography variant="h6">2nd Banner :</Typography>
          <Stack spacing={3} direction="row" alignItems="flex-end">
            <ImagePicker
              label="Banner Image"
              value={values.banner2?.imgUrl}
              onChange={(url) => setValue('banner2.imgUrl', url)}
              folder="banners"
            />
            <RHFAutocomplete
              fullWidth
              name="banner2.routeID"
              value={category?.find((e) => e?._id === values?.banner2?.routeID)}
              onChange={(e, newValue) => setValue('banner2.routeID', newValue?._id)}
              options={category}
              label="Category"
              getOptionLabel={(option) => option?.name}
            />
            <RHFTextField name="banner2.titleLeft" label="Title Left" />
            <RHFTextField name="banner2.title" label="Title" />
            <RHFTextField name="banner2.titleRight" label="Title Right" />
          </Stack>
        </Stack>

        {/* Carousel 1 */}
        <Stack spacing={3} mb={3}>
          <Typography variant="h6">1st Carousel :</Typography>
          <Stack spacing={3}>
            {carouselLabels.map((label, i) => (
              <Stack key={i} spacing={3} direction="row" alignItems="flex-end">
                <ImagePicker
                  label={label}
                  value={values.carousel_one_url?.[i]}
                  onChange={(url) => {
                    const arr = [...(values.carousel_one_url || [])];
                    arr[i] = url;
                    setValue('carousel_one_url', arr);
                  }}
                  folder="carousel"
                />
                <RHFAutocomplete
                  fullWidth
                  name={`carousel[${i}]`}
                  value={category?.find((e) => e?._id === values?.carousel?.[i])}
                  onChange={(e, newValue) => setValue(`carousel[${i}]`, newValue?._id)}
                  options={category}
                  label="Category"
                  getOptionLabel={(option) => option?.name}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* Carousel 2 */}
        <Stack spacing={3}>
          <Typography variant="h6">2nd Carousel :</Typography>
          <Stack spacing={3}>
            {carouselLabels.map((label, i) => (
              <Stack key={i} spacing={3} direction="row" alignItems="flex-end">
                <ImagePicker
                  label={label}
                  value={values.carousel_two_url?.[i]}
                  onChange={(url) => {
                    const arr = [...(values.carousel_two_url || [])];
                    arr[i] = url;
                    setValue('carousel_two_url', arr);
                  }}
                  folder="carousel"
                />
                <RHFAutocomplete
                  fullWidth
                  name={`carousel2[${i}]`}
                  value={category?.find((e) => e?._id === values?.carousel2?.[i])}
                  onChange={(e, newValue) => setValue(`carousel2[${i}]`, newValue?._id)}
                  options={category}
                  label="Category"
                  getOptionLabel={(option) => option?.name}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
