// src/types.ts

// Usando 'type' em vez de 'enum' para maior compatibilidade
export type EventType = 'CONFERENCE' | 'CONCERT' | 'THEATER' | 'COURSE';
export type SaleStatus = 'OPEN' | 'PAID' | 'CANCELED' | 'REFUNDED';

// Criando arrays para podermos listar os valores facilmente nos formulários
export const EventTypes: EventType[] = ['CONFERENCE', 'CONCERT', 'THEATER', 'COURSE'];
export const SaleStatuses: SaleStatus[] = ['OPEN', 'PAID', 'CANCELED', 'REFUNDED'];

export interface Event {
    id: string;
    description: string;
    type: EventType;
    date: string;
    startSales: string;
    endSales: string;
    price: number;
}

export interface Sale {
    id: string;
    userId: string;
    eventId: string;
    saleDate: string;
    saleStatus: SaleStatus;
}

export interface User {
    id: string;
    name: string;
    email: string;
    city?: string;
    creditCardNumber?: string; 
}

export type CreateUserData = Omit<User, 'id'> & { password?: string };

export type UpdateUserData = User & { password?: string };