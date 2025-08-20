// src/services/apiService.ts
import axios from 'axios';
import type { User, CreateUserData, UpdateUserData, Event, Sale, SaleStatus } from '../types';

const API_BASE_URL = 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// --- Endpoints de Usuários ---
export const getUsers = (): Promise<User[]> => apiClient.get('/api/users/users').then(res => res.data);
export const getUserById = (id: string): Promise<User> => apiClient.get(`/api/users/users/${id}`).then(res => res.data);
export const createUser = (data: CreateUserData): Promise<User> => apiClient.post('/api/users/users', data).then(res => res.data);
export const updateUser = (data: UpdateUserData): Promise<User> => apiClient.put('/api/users/users', data).then(res => res.data);
export const deleteUser = (id: string) => apiClient.delete('/api/users/users/remove', { data: { id } });

// --- Endpoints de Eventos ---
export const getEvents = (): Promise<Event[]> => apiClient.get('/api/sales/events').then(res => res.data);
export const getEventById = (id: string): Promise<Event> => apiClient.get(`/api/sales/events/${id}`).then(res => res.data);
export const createEvent = (eventData: Omit<Event, 'id'>) => apiClient.post('/api/sales/events', eventData);
export const updateEvent = (id: string, eventData: Omit<Event, 'id'>) => apiClient.put(`/api/sales/events/${id}`, eventData);
export const deleteEvent = (id: string) => apiClient.delete(`/api/sales/events/${id}`);

// --- Endpoints de Vendas ---
export const getSales = (): Promise<Sale[]> => apiClient.get('/api/sales/sales').then(res => res.data);
export const createSale = (saleData: { userId: string; eventId: string; saleStatus: SaleStatus }) => apiClient.post('/api/sales/sales', saleData);
export const updateSaleStatus = (saleId: string, status: SaleStatus) => apiClient.patch(`/api/sales/sales/${saleId}`, { saleStatus: status });
export const deleteSale = (id: string) => apiClient.delete(`/api/sales/sales/${id}`);

