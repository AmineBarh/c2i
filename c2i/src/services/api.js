const BASE_URL = process.env.REACT_APP_API_URL;

const API_URL = `${BASE_URL}/projects`;

export const fetchProjects = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return await response.json();
};

export const createProject = async (formData) => {
  const response = await fetch(`${BASE_URL}/Projects/create`, {
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
  const response = await fetch(`${BASE_URL}/projects/delete/${projectId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete project");
  }
  return await response.json();
};

// Training APIs
export const fetchtrainings = async () => {
  const response = await fetch(`${BASE_URL}/training`);
  if (!response.ok) throw new Error("Failed to fetch trainings");
  return await response.json();
};

export const createtraining = async (trainingData) => {
  const formData = new FormData();
  Object.entries(trainingData).forEach(([key, value]) => {
    if (key === "media" && value) {
      formData.append("media", value);
    } else if (Array.isArray(value)) {
      formData.append(key, value.join(","));
    } else {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${BASE_URL}/training/create`, {
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
      formData.append(key, value.join(","));
    } else {
      formData.append(key, value);
    }
  });

  const response = await fetch(`${BASE_URL}/training/update/${id}`, {
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
  const response = await fetch(`${BASE_URL}/training/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete training");
  }
  return await response.json();
};
