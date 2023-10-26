const BASE_URL = 'https://localhost:7172/api/v1/Users';

// Response handler 
const handleResponse = async (response) => {
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  const error = new Error(response.statusText);
  error.data = data;
  throw error;
};

// GET User from Database
export const getUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/getUser`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in getUser:', error);
    throw error;
  }
};

// POST(create) User to Database
export const PostUser = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error in PostUser:', error);
    throw error;
  }
};