const API_URL = 'https://localhost:7172/api/v1/VacationRequests/1/Comments';

// A helper function to handle responses from the API.
const handleResponse = async (response) => {
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  const error = new Error(response.statusText);
  error.data = data;
  throw error;
};

// Function to retrieve a comment by ID.
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

// Function to create a new comment.
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

// Function to update an existing comment.
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

// Function to delete a comment.
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