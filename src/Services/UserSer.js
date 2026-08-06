import { HOST_API_KEY } from '../config-global';
import axios from '../utils/axios';

export const updateUser = async (data) => {
  if (data?.avatar) {
    const bodyFormData = new FormData();
    bodyFormData.append('avatar', data?.avatar);
    console.log({});
    await axios.post('/api/user/profile/avatar', bodyFormData);
  }
  delete data?.avatar;
  const response = await axios.post('/api/user/profile/update', data);
  return response;
};

export const getUserAvatar = (userId) => `${HOST_API_KEY}/api/user/profile/avatar/${userId}`;

// for clint view list
export const clientUserList = async () => {
  const response = await axios.get('/api/user/list');
  return response;
};

// for clint order list
export const getOrderViewList = async (params) => {
  const response = await axios.get('/api/order/admin/list', { params });
  return response;
};

// for clint order view
export const getOrderView = async (orderId) => {
  const response = await axios.get(`/api/order/view/${orderId}`);
  return response;
};

// for vezzie order update
export const orderUpdate = async (orId, data) => {
  const response = await axios.post(`/api/order/update/${orId}`, data);
  return response;
};

// for vezzie product create
export const productCreate = async (data) => {
  const response = await axios.post('/api/product/create', data);
  return response;
};

// for vezzie product update
export const productUpdate = async (proId, data) => {
  const response = await axios.post(`/api/product/update/${proId}`, data);
  return response;
};

// for Product View
export const getProductId = async (id) => {
  const response = await axios.get(`/api/product/view/${id}`);
  return response;
};

// for vezzie product list
export const productViewList = async (id) => {
  const response = await axios.get(`/api/product/list?category=${id}`);
  return response;
};

// for vezzie cetegory create
export const cetegoryCreate = async (data) => {
  const response = await axios.post('/api/category/create', data);
  return response;
};

// for vezzie cetegory update
export const cetegoryUpdate = async (catId, data) => {
  const response = await axios.post(`/api/category/update/${catId}`, data);
  return response;
};

// for vezzie cetegory view list
export const categoryViewList = async () => {
  const response = await axios.get('/api/category/list');
  return response;
};

// for vezzie category update order
export const categoryUpdateOrder = async (orderedIds) => {
  const response = await axios.post('/api/category/update-order', { orderedIds });
  return response;
};

// for vezzie product update order
export const productUpdateOrder = async (orderedIds) => {
  const response = await axios.post('/api/product/update-order', { orderedIds });
  return response;
};

// for vezzie coupon create
export const couponCreate = async (data) => {
  const response = await axios.post('/api/admin/coupon/create', data);
  return response;
};

// for vezzie coupon view list
export const couponViewList = async () => {
  const response = await axios.get('/api/admin/coupon/list');
  return response;
};

// for Vezzie coupon delete
export const couponDelete = async (couponId) => {
  const response = await axios.delete(`/api/coupon/delete/${couponId}`);
  return response;
};

// for vezzie coupon update
export const couponUpdate = async (couponId, data) => {
  const response = await axios.post(`/api/coupon/update/${couponId}`, data);
  return response;
};

// for vezzie banner post
export const appSettingView = async () => {
  const response = await axios.get('/api/app/setting/view');
  return response;
};

// for vezzie banner update
export const appSettingUpdate = async (data) => {
  console.log({ data });
  const response = await axios.post('/api/app/setting/update', data);
  console.log({ response });
  return response;
};

// for vezzie notification to user
export const notificationToUser = async (data) => {
  const response = await axios.post(`/api/notification/send`, data);
  return response;
};

// for vezzie notification to all user
export const notificationToAllUser = async (data) => {
  const response = await axios.post('/api/notification/send', data);

  return response;
};

// Upload a media file to S3, returns { url }
export const uploadMedia = async (file, folder) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  const response = await axios.post('/api/media/upload', formData);
  return response;
};

// Delete a media file from S3 by URL
export const deleteMedia = async (url) => {
  const response = await axios.delete('/api/media/delete', { data: { url } });
  return response;
};
