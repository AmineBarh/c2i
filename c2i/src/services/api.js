import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Projects/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};