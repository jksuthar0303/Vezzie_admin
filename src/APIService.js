import axios from 'axios';

export const getUsersRegister = async () => {
  try {
    const response = await axios.get('api/user/register');
    return response.data;
  } catch (error) {
    // Handle error
    console.log(error);
    throw error;
  }
};
