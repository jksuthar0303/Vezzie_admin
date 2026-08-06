import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

import {
  Card,
  TextField,
  RadioGroup,
  Autocomplete,
  Container,
  Stack,
  Typography,
  Radio,
} from '@mui/material';

import CustomBreadcrumbs from '../../components/custom-breadcrumbs';

import { clientUserList, notificationToAllUser, notificationToUser } from '../../Services/UserSer';
import { useSettingsContext } from '../../components/settings';
import { PATH_DASHBOARD } from '../../routes/paths';

export default function VezzieNotificationPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { themeStretch } = useSettingsContext();

  const [notificationType, setNotificationType] = useState('selected');

  const [selectedUser, setSelectedUser] = useState([]);

  const [notificationTitle, setNotificationTitle] = useState('');

  const [notificationBody, setNotificationBody] = useState('');

  const [notificationImage, setNotificationImage] = useState('');

  const [userList, setUserList] = useState([]);

  // Fetch the list of users when the component mounts
  const fetchUserList = async () => {
    try {
      const { data } = await clientUserList();
      setUserList(data?.users);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);

  const handleNotificationTypeChange = (event) => {
    setNotificationType(event.target.value);
  };

  const handleUserSelectChange = (event, newValue) => {
    setSelectedUser(newValue);
  };

  const handleNotificationBodyChange = (event) => {
    setNotificationBody(event.target.value);
  };

  const handleNotificationImage = (event) => {
    setNotificationImage(event.target.value);
  };

  const handleNotificationTitleChange = (event) => {
    setNotificationTitle(event.target.value);
  };

  const handleSendNotification = async () => {
    try {
      if (notificationType === 'all') {
        const notificationData = {
          data: {
            title: notificationTitle,
            body: notificationBody,
            image: notificationImage,
          },
        };
        await notificationToAllUser(notificationData);
      } else if (notificationType === 'selected') {
        const notificationData = {
          userId: selectedUser._id,
          data: {
            title: notificationTitle,
            body: notificationBody,
            image: notificationImage,
          },
        };
        console.log({ notificationData });
        await notificationToUser(notificationData);
      }
      window.location.reload();
      enqueueSnackbar('User  Notification!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Coupon: List | Vezzie</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Coupon List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Coupon',
            },
            {
              name: 'List',
            },
          ]}
        />
        <Card sx={{ p: 3 }}>
          <Stack spacing={2} mb={3}>
            <RadioGroup row name="type" spacing={4}>
              {[
                { value: 'all', label: 'All' },
                { value: 'selected', label: 'Selected' },
              ].map((item) => (
                <Stack direction="row" alignItems="center">
                  <Radio
                    key={item?.value}
                    value={item?.value}
                    onChange={handleNotificationTypeChange}
                    sx={{
                      '&:hover': { opacity: 0.72 },
                      '& svg': { width: 24, height: 24 },
                    }}
                  />
                  <Typography>{item.label}</Typography>
                </Stack>
              ))}
            </RadioGroup>

            {notificationType === 'all' ? (
              <Typography>selected all user</Typography>
            ) : (
              <Autocomplete
                name="user"
                fullWidth
                // multiple
                options={userList}
                value={userList?.find(
                  (item) => item?._id === userList?.users?.name || userList?.users?.mobile
                )}
                onChange={handleUserSelectChange}
                getOptionLabel={(option) =>
                  option?.name ? `${option?.name}  (${option?.mobile})` : option?.mobile
                }
                renderInput={(params) => (
                  <TextField {...params} label="Select User" margin="none" />
                )}
              />
            )}
          </Stack>
          <Stack spacing={3}>
            <Typography variant="body1"> Write Your Notificaion Title :</Typography>

            <TextField
              label="Notification Title"
              fullWidth
              value={notificationTitle}
              onChange={handleNotificationTitleChange}
              margin="normal"
            />
          </Stack>

          <Stack spacing={3} mt={3}>
            <Typography variant="body1"> Write Your Notificaion Message :</Typography>

            <TextField
              label="Notification Message"
              fullWidth
              multiline
              rows={4}
              value={notificationBody}
              onChange={handleNotificationBodyChange}
              margin="normal"
            />
          </Stack>

          <Stack spacing={3} mt={3}>
            <Stack direction="row" spacing={2}>
              <Typography variant="body1"> Notificaion Image :</Typography>
              <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                {' '}
                (Optional)
              </Typography>
            </Stack>

            <TextField
              name="image"
              label="Notification Image"
              value={notificationImage}
              onChange={handleNotificationImage}
              margin="normal"
            />
          </Stack>
        </Card>

        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSendNotification}
          >
            Send
          </LoadingButton>
        </Stack>
      </Container>
    </>
  );
}
