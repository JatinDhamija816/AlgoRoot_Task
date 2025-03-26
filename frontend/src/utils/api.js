import axios from "axios";

const API_BASE_URL = "https://algoroot-task.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const handleRequest = async (requestFunc) => {
  try {
    const response = await requestFunc();
    return response.data.data;
  } catch (error) {
    if (!error.response) {
      console.error("Network Error:", error.message);
      throw new Error("Network error. Please check your connection.");
    }

    const { status, data } = error.response;
    let errorMessage = data?.message || "Something went wrong";

    if (status === 400) errorMessage = "Bad request. Please check your input.";
    if (status === 404) errorMessage = "Requested resource not found.";
    if (status === 500) errorMessage = "Server error. Try again later.";

    console.error("API Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const createTask = (taskData) =>
  handleRequest(() => api.post("/tasks", taskData));

export const fetchTasks = () => handleRequest(() => api.get("/tasks"));

export const getTaskById = (taskId) =>
  handleRequest(() => api.get(`/tasks/${taskId}`));

export const updateTask = (taskId, updatedData) =>
  handleRequest(() => api.put(`/tasks/${taskId}`, updatedData));

export const updateTaskStatus = (taskId, field) =>
  handleRequest(() => api.patch(`/tasks/${taskId}/status`, { field }));

export const deleteTaskApi = (taskId) =>
  handleRequest(() => api.delete(`/tasks/${taskId}`));
