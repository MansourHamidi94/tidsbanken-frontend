const API_URL = 'https://localhost:7172/api/v1/IneligiblePeriods';

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

// Function to retrieve an ineligible period by ID.
export const getIneligiblePeriods = async (token) => {
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

// Function to create a new ineligible Period.
export const postIneligiblePeriod = async (requestData, token) => {
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

// Function to update an existing ineligible period.
export const putIneligiblePeriod = async (requestId, updatedData, token) => {
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

// Function to delete an ineligible period.
export const deleteIneligiblePeriod = async (requestId, token) => {
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