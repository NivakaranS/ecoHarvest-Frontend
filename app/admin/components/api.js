// utils/apis.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",   // adjust
    withCredentials: true,             // <‑‑ always send cookies
});

export const INVENTORY = {
    LIST: () => api.get("/inventory"),
    CREATE: body => api.post("/inventory", body),
    UPDATE: (id, body) => api.put(`/inventory/${id}`, body),
    DELETE: id => api.delete(`/inventory/${id}`),
};

export const VEHICLE = {
    LIST: () => api.get("/vehicle"),
    CREATE: body => api.post("/vehicle", body),
    UPDATE: (id, body) => api.put(`/vehicle/${id}`, body),
    DELETE: id => api.delete(`/vehicle/${id}`),
};