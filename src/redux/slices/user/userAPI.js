
export const checkUserExists = async (token) => {
  const apiUrl = 'https://localhost:7172/api/v1/Users/getUser';
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return userData; // Assuming the response body contains user data when user exists
    } else if (response.status === 404) {
      return null; // User does not exist in the database
    } else {
      throw new Error('Error checking user in the database');
    }
  } catch (error) {
    console.error('Error in checkUserExists:', error);
    throw error; // Re-throwing the error to be caught in the calling function
  }
}


export const createUser = async (token) => {
  const apiUrl = 'https://localhost:7172/api/v1/Users/register';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseBody = await response.json(); // Assuming the response is in JSON format

    if (response.ok) {
      return responseBody; // Return the response body directly
    } else if (response.status === 404) {
      return false; // It might be worth re-evaluating what should be returned in this case
    } else {
      const error = new Error('Error creating user');
      error.responseBody = responseBody;
      throw error;
    }
  } catch (error) {
    throw error; // Re-throw the error to be handled by the calling code
  }
}