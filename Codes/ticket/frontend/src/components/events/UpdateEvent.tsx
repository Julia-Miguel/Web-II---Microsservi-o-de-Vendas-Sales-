// src/components/events/UpdateEvent.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../../services/apiService';
import { EventTypes } from '../../types';
import type { Event } from '../../types';
import '../../App.css';

const UpdateEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [description, setDescription] = useState('');
    const [type, setType] = useState<Event['type']>('CONCERT');
    const [date, setDate] = useState('');
    const [startSales, setStartSales] = useState('');
    const [endSales, setEndSales] = useState('');
    const [price, setPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (id) {
            getEventById(id)
                .then(data => {
                    const formatDate = (dateStr: string) => dateStr ? dateStr.substring(0, 16) : '';
                    setDescription(data.description);
                    setType(data.type);
                    setDate(formatDate(data.date));
                    setStartSales(formatDate(data.startSales));
                    setEndSales(formatDate(data.endSales));
                    setPrice(data.price);
                })
                .catch(error => {
                    console.error('Erro ao carregar evento:', error);
                    alert('Evento não encontrado!');
                    navigate('/events');
                })
                .finally(() => {
                    setIsLoadingData(false);
                });
        }
    }, [id, navigate]);

    const handleUpdateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        
        setIsLoading(true);
        
        try {
            const payload = {
                description,
                type,
                date: `${date}:00`,
                startSales: `${startSales}:00`,
                endSales: `${endSales}:00`,
                price
            };
            await updateEvent(id, payload);
            alert("Evento atualizado com sucesso!");
            navigate('/events');
        } catch (error) {
            alert("Erro na atualização do evento!");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoadingData) {
        return (
            <div className="form-container">
                <div className="text-center">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h1>Editar Evento</h1>
            
            <form onSubmit={handleUpdateEvent}>
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
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <select 
                            className="form-control" 
                            id="type" 
                            value={type} 
                            onChange={e => setType(e.target.value as Event['type'])}
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
                        {isLoading ? 'Atualizando...' : 'Atualizar'}
                    </button>
                    
                    <Link to="/events" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateEvent;