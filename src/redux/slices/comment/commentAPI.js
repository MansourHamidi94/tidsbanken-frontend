const API_URL = 'https://localhost:7172/api/v1/VacationRequests/1/Comments';

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

// GET comment
export const getComment = async (token) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${token}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching ineligible periods:', error);
    throw error;
  }
};

// POST(create) comment
export const postComment = async (requestData, token) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(requestData),
    });
    return handleResponse(response);
  } catch (error) {
    throw error.message || 'Failed to create vacation request';
  }
};

// PUT(update) comment
export const putComment = async (requestId, updatedData, token) => {
  try {
    const response = await fetch(`${API_URL}/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
  } catch (error) {
    throw error.message || 'Failed to update vacation request';
  }
};

// DELETE comment
export const deleteComment = async (requestId, token) => {
  try {
    const response = await fetch(`${API_URL}/${requestId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw error.message || 'Failed to delete vacation request';
  }
};