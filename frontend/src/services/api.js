const API_URL = 'http://127.0.0.1:8000/';

export const fetchProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/properties/`); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};
