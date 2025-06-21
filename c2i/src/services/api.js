// src/services/api.js
const API_URL = 'http://localhost:7000/projects';

export const fetchProjects = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return await response.json();
};

export const createProject = async (projectData, imageFile) => {
  const formData = new FormData();

  // Append all text fields
  Object.entries(projectData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Append image
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    body: formData
    // Don't set Content-Type header! Browser handles it automatically
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to add project: ${errorText}`);
  }

  return await response.json();
};

export const deleteProject = async (projectId) => {
  const response = await fetch(`${API_URL}/delete/${projectId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete project');
  return await response.json();
};