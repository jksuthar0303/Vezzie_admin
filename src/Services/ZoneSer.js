import axios from '../utils/axios';

/**
 * Fetch all delivery zones
 * @param {Object} params { status, city }
 */
export const getZonesList = async (params = {}) => {
  const response = await axios.get('/api/zones', { params });
  return response.data;
};

/**
 * Create a new delivery zone
 * @param {Object} data { name, city, status, color, coordinates }
 */
export const createZone = async (data) => {
  const response = await axios.post('/api/zones', data);
  return response.data;
};

/**
 * Update an existing delivery zone
 * @param {string} id
 * @param {Object} data { name, city, status, color, coordinates }
 */
export const updateZone = async (id, data) => {
  const response = await axios.put(`/api/zones/${id}`, data);
  return response.data;
};

/**
 * Delete a delivery zone
 * @param {string} id
 */
export const deleteZone = async (id) => {
  const response = await axios.delete(`/api/zones/${id}`);
  return response.data;
};
