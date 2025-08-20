// src/components/events/CreateEventForm.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/apiService';
import type { EventType } from '../../types';
import { EventTypes } from '../../types';
import '../../App.css';

export const CreateEventForm: React.FC = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [type, setType] = useState<EventType>('CONCERT');
    const [date, setDate] = useState('');
    const [startSales, setStartSales] = useState('');
    const [endSales, setEndSales] = useState('');
    const [price, setPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const eventData = { 
                description, 
                type, 
                date: `${date}:00`, 
                startSales: `${startSales}:00`, 
                endSales: `${endSales}:00`, 
                price 
            };
            await createEvent(eventData);
            alert('Evento criado com sucesso!');
            navigate('/events');
        } catch (error) {
            alert('Erro ao criar evento!');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Criar Evento</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="description" className="form-label">Descrição</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="description" 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            required 
                            placeholder="Digite a descrição do evento"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <select 
                            className="form-control" 
                            id="type" 
                            value={type} 
                            onChange={e => setType(e.target.value as EventType)}
                            disabled={isLoading}
                        >
                            {EventTypes.map(eventType => (
                                <option key={eventType} value={eventType}>{eventType}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="date" className="form-label">Data do Evento</label>
                        <input 
                            type="datetime-local" 
                            className="form-control" 
                            id="date" 
                            value={date} 
                            onChange={e => setDate(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="price" className="form-label">Preço</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            id="price" 
                            value={price} 
                            onChange={e => setPrice(parseFloat(e.target.value))} 
                            required 
                            placeholder="0.00"
                            disabled={isLoading}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="startSales" className="form-label">Início das Vendas</label>
                        <input 
                            type="datetime-local" 
                            className="form-control" 
                            id="startSales" 
                            value={startSales} 
                            onChange={e => setStartSales(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="endSales" className="form-label">Fim das Vendas</label>
                        <input 
                            type="datetime-local" 
                            className="form-control" 
                            id="endSales" 
                            value={endSales} 
                            onChange={e => setEndSales(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                </div>
                
                <div className="d-flex justify-content-start gap-2 mt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Criando...' : 'Criar Evento'}
                    </button>
                    
                    <Link to="/events" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};