// src/components/sales/CreateSaleForm.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createSale, getEvents, getUsers } from '../../services/apiService';
import type { Event, User, SaleStatus } from '../../types';
import { SaleStatuses } from '../../types';
import '../../App.css';

export const CreateSaleForm: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('');
    const [status, setStatus] = useState<SaleStatus>('OPEN');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await getUsers();
                const eventsData = await getEvents();
                setUsers(usersData);
                setEvents(eventsData);
                if (usersData.length > 0) setSelectedUserId(usersData[0].id);
                if (eventsData.length > 0) setSelectedEventId(eventsData[0].id);
            } catch (error) {
                console.error("Falha ao carregar dados para o formulário", error);
                alert("Não foi possível carregar usuários ou eventos.");
            } finally {
                setIsLoadingData(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUserId || !selectedEventId) {
            alert('Por favor, selecione um usuário e um evento.');
            return;
        }
        
        setIsLoading(true);
        
        try {
            await createSale({ userId: selectedUserId, eventId: selectedEventId, saleStatus: status });
            alert('Venda registrada com sucesso!');
            navigate('/sales');
        } catch (error) {
            alert('Falha ao registrar a venda.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="form-container">
                <div className="text-center">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h1>Registrar Nova Venda</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="user" className="form-label">Usuário</label>
                        <select 
                            className="form-control" 
                            id="user"
                            value={selectedUserId} 
                            onChange={e => setSelectedUserId(e.target.value)}
                            required
                            disabled={isLoading}
                        >
                            <option value="">Selecione um usuário</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} - {user.email}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="event" className="form-label">Evento</label>
                        <select 
                            className="form-control" 
                            id="event"
                            value={selectedEventId} 
                            onChange={e => setSelectedEventId(e.target.value)}
                            required
                            disabled={isLoading}
                        >
                            <option value="">Selecione um evento</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>
                                    {event.description} - R$ {event.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                            className="form-control" 
                            id="status"
                            value={status} 
                            onChange={e => setStatus(e.target.value as SaleStatus)}
                            disabled={isLoading}
                        >
                            {SaleStatuses.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="d-flex justify-content-start gap-2 mt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading || !selectedUserId || !selectedEventId}
                    >
                        {isLoading ? 'Registrando...' : 'Registrar Venda'}
                    </button>
                    
                    <Link to="/sales" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};