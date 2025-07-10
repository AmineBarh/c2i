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
// Add these to your existing api.js
export const fetchtrainings = async () => {
  const response = await fetch("http://localhost:7000/training");
  if (!response.ok) throw new Error("Failed to fetch trainings");
  return await response.json();
};

export const createtraining = async (trainingData) => {
  const formData = new FormData();
  Object.entries(trainingData).forEach(([key, value]) => {
    if (key === "media" && value) {
      formData.append("media", value);
    } else if (Array.isArray(value)) {
      formData.append(key, value.join(",")); // ✅ This creates "value1,value2,value3"
    } else {
      formData.append(key, value);
    }
  });

  const response = await fetch("http://localhost:7000/training/create", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create training");
  }

  return await response.json();
};

export const updatetraining = async (id, trainingData) => {
  const formData = new FormData();
  Object.entries(trainingData).forEach(([key, value]) => {
    if (key === "media" && value) {
      formData.append("media", value);
    } else if (Array.isArray(value)) {
      formData.append(key, value.join(",")); // ✅ This creates "value1,value2,value3"
    } else {
      formData.append(key, value);
    }
  });

  const response = await fetch(`http://localhost:7000/training/update/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update training");
  }

  return await response.json();
};

export const deletetraining = async (id) => {
  const response = await fetch(`http://localhost:7000/training/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete training");
  }

  return await response.json();
};
