// src/services/api.js
const API_URL = "http://localhost:7000/projects";

export const fetchProjects = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return await response.json();
};

// In services/api.js
export const createProject = async (formData) => {
  const response = await fetch("http://localhost:7000/Projects/create", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create project");
  }

  return await response.json();
};

export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(
      `http://localhost:7000/projects/delete/${projectId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete project");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete project error:", error);
    throw error;
  }
};
