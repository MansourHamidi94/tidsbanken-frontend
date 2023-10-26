const API_URL = 'https://localhost:7172/api/v1/VacationRequests';

// A helper function to handle responses from the API.
const handleResponse = async (response) => {
  // Parsing the JSON response.
  const data = await response.json();
  
  // If the response status is OK, return the data.
  if (response.ok) {
    return data;
  }
  
  // If the response status is not OK, create an error, attach the data to it, and throw it.
  const error = new Error(response.statusText);
  error.data = data;
  throw error;
};


// Function to fetch a vacation request by ID.
export const getVacationRequestById = async (requestId, token) => {
  try {
    // Making a GET request to the API with the provided ID and token.
    const response = await fetch(`${API_URL}/${requestId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`  // Attaching the token to the request headers.
      }
    });
    // Handling the API response.
    return handleResponse(response);
  } catch (error) {
    // In case of an error, throwing an error message.
    throw error.message || 'Failed to fetch vacation request';
  }
};


// Function to create a new vacation request.
export const postVacationRequest = async (requestData, token) => {
  try {
    // Making a POST request to the API with the provided data and token.
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  // Attaching the token to the request headers.
      },
      body: JSON.stringify(requestData),  // Converting the request data to a JSON string.
    });
    // Handling the API response.
    return handleResponse(response);
  } catch (error) {
    // In case of an error, throwing an error message.
    throw error.message || 'Failed to create vacation request';
  }
};


// Function to update an existing vacation request.
export const putVacationRequest = async (requestId, updatedData, token) => {
  try {
    // Making a PUT request to the API with the provided ID, updated data, and token.
    const response = await fetch(`${API_URL}/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`  // Attaching the token to the request headers.
      },
      body: JSON.stringify(updatedData),  // Converting the updated data to a JSON string.
    });
    // Handling the API response.
    return handleResponse(response);
  } catch (error) {
    // In case of an error, throwing an error message.
    throw error.message || 'Failed to update vacation request';
  }
};


// Function to delete a vacation request.
export const deleteVacationRequest = async (requestId, token) => {
  try {
    // Making a DELETE request to the API with the provided ID and token.
    const response = await fetch(`${API_URL}/${requestId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`  // Attaching the token to the request headers.
      }
    });
    // Handling the API response.
    return handleResponse(response);
  } catch (error) {
    // In case of an error, throwing an error message.
    throw error.message || 'Failed to delete vacation request';
  }
};