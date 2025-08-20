// src/components/events/ListEvents.tsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getEvents, deleteEvent } from "../../services/apiService";
import type { Event } from "../../types";
import '../../App.css';

const ListEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [searchDescription, setSearchDescription] = useState('');
    const [searchType, setSearchType] = useState('');
    const [sortField, setSortField] = useState<keyof Event | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        getEvents().then(setEvents).catch(error => {
            console.error("Erro ao buscar eventos:", error);
        });
    }, []);

    const handleDeleteEvent = async (id: string) => {
        if (!window.confirm("Deseja realmente excluir este evento?")) return;
        try {
            await deleteEvent(id);
            alert('Evento excluído com sucesso!');
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            alert('Erro ao excluir o evento!');
            console.error(error);
        }
    }

    const handleSort = (field: keyof Event) => {
        const order = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const filteredAndSortedEvents = useMemo(() => {
        const filtered = events.filter(e => 
            e.description.toLowerCase().includes(searchDescription.toLowerCase()) &&
            e.type.toLowerCase().includes(searchType.toLowerCase())
        );

        if (sortField) {
            filtered.sort((a, b) => {
                const aVal = a[sortField] || '';
                const bVal = b[sortField] || '';
                if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [events, searchDescription, searchType, sortField, sortOrder]);

    const getSortIcon = (field: keyof Event) => {
        if (sortField !== field) return '⇅';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="container mt-4">
            <div className="list-container">
                <h1>Gerenciamento de Eventos</h1>

                <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por descrição..."
                            value={searchDescription}
                            onChange={(e) => setSearchDescription(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por tipo..."
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end gap-2">
                    <Link to="/events/create" className="btn btn-success">
                        Criar Evento
                    </Link>
                    <Link to="/" className="btn btn-secondary">
                        Voltar
                    </Link>
                </div>
            </div>

            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="sortable" onClick={() => handleSort("id")}>
                                ID {getSortIcon('id')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("description")}>
                                Descrição {getSortIcon('description')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("type")}>
                                Tipo {getSortIcon('type')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("date")}>
                                Data {getSortIcon('date')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("price")}>
                                Preço {getSortIcon('price')}
                            </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedEvents.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Nenhum evento encontrado
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedEvents.map(event => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>{event.description}</td>
                                    <td>{event.type}</td>
                                    <td>{new Date(event.date).toLocaleString()}</td>
                                    <td>R$ {event.price.toFixed(2)}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <Link to={`/events/update/${event.id}`} className="btn btn-primary btn-sm">
                                            Editar
                                        </Link>
                                        <button 
                                            onClick={() => handleDeleteEvent(event.id)} 
                                            className="btn btn-danger btn-sm"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEvents;