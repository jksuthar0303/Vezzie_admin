import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Stack, Typography, Button, Box, Divider, Grid } from '@mui/material';
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
import { RHFAutocomplete, RHFTextField, RHFSwitch } from '../../../components/hook-form';
import Iconify from '../../../components/iconify/Iconify';

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
    appVersion: Yup.object().shape({
      android: Yup.object().shape({
        latestVersion: Yup.string().required('Android Latest Version is required'),
        latestBuildNumber: Yup.number().typeError('Must be a number').required('Latest Build Number is required'),
        minRequiredBuildNumber: Yup.number().typeError('Must be a number').required('Min Required Build Number is required'),
        forceUpdate: Yup.boolean(),
        updateUrl: Yup.string(),
        message: Yup.string(),
      }),
      ios: Yup.object().shape({
        latestVersion: Yup.string().required('iOS Latest Version is required'),
        latestBuildNumber: Yup.number().typeError('Must be a number').required('Latest Build Number is required'),
        minRequiredBuildNumber: Yup.number().typeError('Must be a number').required('Min Required Build Number is required'),
        forceUpdate: Yup.boolean(),
        updateUrl: Yup.string(),
        message: Yup.string(),
      }),
    }),
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

  const defaultValues = useMemo(() => {
    const rawVersion = appSetting?.appVersion;
    const isVersionObj = rawVersion && typeof rawVersion === 'object';
    const rawStringVersion = typeof rawVersion === 'string' ? rawVersion : '1.0.0';

    return {
      appTitle: appSetting?.appTitle || '',
      appSlogan: appSetting?.appSlogan || '',
      appVersion: {
        android: {
          latestVersion: isVersionObj && rawVersion.android?.latestVersion ? rawVersion.android.latestVersion : rawStringVersion,
          latestBuildNumber: isVersionObj && rawVersion.android?.latestBuildNumber != null ? rawVersion.android.latestBuildNumber : 1,
          minRequiredBuildNumber: isVersionObj && rawVersion.android?.minRequiredBuildNumber != null ? rawVersion.android.minRequiredBuildNumber : 1,
          forceUpdate: isVersionObj && rawVersion.android?.forceUpdate != null ? Boolean(rawVersion.android.forceUpdate) : false,
          updateUrl: (isVersionObj && rawVersion.android?.updateUrl) || 'https://play.google.com/store/search?q=vezzie&c=apps&hl=en_IN',
          message: (isVersionObj && rawVersion.android?.message) || 'A new version of Vezzie is available. Please update to continue!',
        },
        ios: {
          latestVersion: isVersionObj && rawVersion.ios?.latestVersion ? rawVersion.ios.latestVersion : rawStringVersion,
          latestBuildNumber: isVersionObj && rawVersion.ios?.latestBuildNumber != null ? rawVersion.ios.latestBuildNumber : 1,
          minRequiredBuildNumber: isVersionObj && rawVersion.ios?.minRequiredBuildNumber != null ? rawVersion.ios.minRequiredBuildNumber : 1,
          forceUpdate: isVersionObj && rawVersion.ios?.forceUpdate != null ? Boolean(rawVersion.ios.forceUpdate) : false,
          updateUrl: (isVersionObj && rawVersion.ios?.updateUrl) || 'https://apps.apple.com/app/idYOUR_APP_ID',
          message: (isVersionObj && rawVersion.ios?.message) || 'A new version of Vezzie is available. Please update to continue!',
        },
      },
      banner: appSetting?.banner || { imgUrl: '', routeID: '', titleLeft: '', title: '', titleRight: '' },
      banner2: appSetting?.banner2 || { imgUrl: '', routeID: '', titleLeft: '', title: '', titleRight: '' },
      carousel: appSetting?.carousel || ['', '', '', '', '', ''],
      carousel2: appSetting?.carousel2 || ['', '', '', '', '', ''],
      carousel_one_url: appSetting?.carousel_one_url || ['', '', '', '', '', ''],
      carousel_two_url: appSetting?.carousel_two_url || ['', '', '', '', '', ''],
    };
  }, [appSetting]);

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

      // Ensure build numbers are parsed as numbers
      if (data?.appVersion?.android) {
        data.appVersion.android.latestBuildNumber = Number(data.appVersion.android.latestBuildNumber) || 1;
        data.appVersion.android.minRequiredBuildNumber = Number(data.appVersion.android.minRequiredBuildNumber) || 1;
      }
      if (data?.appVersion?.ios) {
        data.appVersion.ios.latestBuildNumber = Number(data.appVersion.ios.latestBuildNumber) || 1;
        data.appVersion.ios.minRequiredBuildNumber = Number(data.appVersion.ios.minRequiredBuildNumber) || 1;
      }

      await appSettingUpdate(data);
      enqueueSnackbar('App Settings & Version Controls updated successfully!');
      navigate(PATH_DASHBOARD.appSetting.root);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || 'Failed to update settings', { variant: 'error' });
    }
  };

  const carouselLabels = ['1', '2', '3', '4', '5', '6'];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* App Info Card */}
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Typography variant="h6">General App Info :</Typography>
            <Stack spacing={3} direction={{ xs: 'column', sm: 'row' }}>
              <RHFTextField name="appTitle" label="App Title" />
              <RHFTextField name="appSlogan" label="App Slogan" />
            </Stack>
          </Stack>
        </Card>

        {/* In-App Version & Update Controls Section */}
        <Card sx={{ p: 3 }}>
          <Stack spacing={2} mb={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="eva:refresh-outline" width={24} sx={{ color: 'primary.main' }} />
              <Typography variant="h6">In-App Version & Update Controls</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Control update popups and force update rules for Android (Google Play) and iOS (App Store) independently.
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {/* ANDROID SECTION */}
            <Grid item xs={12} md={6}>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  borderColor: 'success.light',
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : '#f4fbf5'),
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="bxl:android" width={24} sx={{ color: '#2e7d32' }} />
                    <Typography variant="subtitle1" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                      Android (Google Play Store)
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack spacing={2}>
                    <RHFTextField
                      name="appVersion.android.latestVersion"
                      label="Latest Version (e.g. 1.0.5)"
                      size="small"
                    />

                    <Stack direction="row" spacing={2}>
                      <RHFTextField
                        name="appVersion.android.latestBuildNumber"
                        label="Latest Build Number (e.g. 15)"
                        type="number"
                        size="small"
                      />
                      <RHFTextField
                        name="appVersion.android.minRequiredBuildNumber"
                        label="Min Required Build (e.g. 12)"
                        type="number"
                        size="small"
                        helperText="Builds below this will be FORCE updated"
                      />
                    </Stack>

                    <RHFSwitch
                      name="appVersion.android.forceUpdate"
                      label={
                        <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                          Force update all older versions
                        </Typography>
                      }
                      helperText="If enabled, all users below latest version will be blocked until updated"
                    />

                    <RHFTextField
                      name="appVersion.android.updateUrl"
                      label="Google Play Store URL"
                      size="small"
                    />

                    <RHFTextField
                      name="appVersion.android.message"
                      label="Update Popup Message"
                      multiline
                      rows={2}
                      size="small"
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid>

            {/* IOS SECTION */}
            <Grid item xs={12} md={6}>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  borderColor: 'info.light',
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : '#f0f9ff'),
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Iconify icon="bxl:apple" width={24} sx={{ color: '#0277bd' }} />
                    <Typography variant="subtitle1" sx={{ color: '#0277bd', fontWeight: 'bold' }}>
                      iOS (Apple App Store)
                    </Typography>
                  </Stack>

                  <Divider />

                  <Stack spacing={2}>
                    <RHFTextField
                      name="appVersion.ios.latestVersion"
                      label="Latest Version (e.g. 1.0.3)"
                      size="small"
                    />

                    <Stack direction="row" spacing={2}>
                      <RHFTextField
                        name="appVersion.ios.latestBuildNumber"
                        label="Latest Build Number (e.g. 12)"
                        type="number"
                        size="small"
                      />
                      <RHFTextField
                        name="appVersion.ios.minRequiredBuildNumber"
                        label="Min Required Build (e.g. 10)"
                        type="number"
                        size="small"
                        helperText="Builds below this will be FORCE updated"
                      />
                    </Stack>

                    <RHFSwitch
                      name="appVersion.ios.forceUpdate"
                      label={
                        <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                          Force update all older versions
                        </Typography>
                      }
                      helperText="If enabled, all users below latest version will be blocked until updated"
                    />

                    <RHFTextField
                      name="appVersion.ios.updateUrl"
                      label="Apple App Store URL"
                      size="small"
                    />

                    <RHFTextField
                      name="appVersion.ios.message"
                      label="Update Popup Message"
                      multiline
                      rows={2}
                      size="small"
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Card>

        {/* Banners & Carousels */}
        <Card sx={{ p: 3 }}>
          {/* Banner 1 */}
          <Stack spacing={3} mb={4}>
            <Typography variant="h6">1st Banner :</Typography>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} alignItems="flex-end">
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

          <Divider sx={{ my: 3 }} />

          {/* Banner 2 */}
          <Stack spacing={3} mb={4}>
            <Typography variant="h6">2nd Banner :</Typography>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} alignItems="flex-end">
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

          <Divider sx={{ my: 3 }} />

          {/* Carousel 1 */}
          <Stack spacing={3} mb={4}>
            <Typography variant="h6">1st Carousel :</Typography>
            <Stack spacing={3}>
              {carouselLabels.map((label, i) => (
                <Stack key={i} spacing={3} direction={{ xs: 'column', md: 'row' }} alignItems="flex-end">
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

          <Divider sx={{ my: 3 }} />

          {/* Carousel 2 */}
          <Stack spacing={3}>
            <Typography variant="h6">2nd Carousel :</Typography>
            <Stack spacing={3}>
              {carouselLabels.map((label, i) => (
                <Stack key={i} spacing={3} direction={{ xs: 'column', md: 'row' }} alignItems="flex-end">
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

        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3, mb: 4 }}>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
