const API_URL = 'https://localhost:7172/api/v1/VacationRequests';

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

// GET vacation request by id
export const getVacationRequestById = async (requestId, token) => {
  try {
    const response = await fetch(`${API_URL}/${requestId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    throw error.message || 'Failed to fetch vacation request';
  }
};

// POST(create) vacation request
export const postVacationRequest = async (requestData, token) => {
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

// PUT(update) vacation request
export const putVacationRequest = async (requestId, updatedData, token) => {
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

// DELETE vacation request
export const deleteVacationRequest = async (requestId, token) => {
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