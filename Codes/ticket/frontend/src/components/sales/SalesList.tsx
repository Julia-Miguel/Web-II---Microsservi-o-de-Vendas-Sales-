// src/components/sales/SalesList.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getSales, updateSaleStatus, deleteSale } from '../../services/apiService';
import type { Sale, SaleStatus } from '../../types';
import { SaleStatuses } from '../../types';
import '../../App.css';

export const SalesList: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [searchUserId, setSearchUserId] = useState('');
    const [searchEventId, setSearchEventId] = useState('');
    const [sortField, setSortField] = useState<keyof Sale | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [error, setError] = useState<string | null>(null);

    const fetchSales = async () => {
        try {
            const data = await getSales();
            setSales(data);
            setError(null);
        } catch (err) {
            setError('Falha ao buscar as vendas.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSales();
    }, []);

    const handleStatusChange = async (saleId: string, newStatus: SaleStatus) => {
        try {
            await updateSaleStatus(saleId, newStatus);
            fetchSales(); 
        } catch (err) {
            alert('Falha ao atualizar o status.');
            console.error(err);
        }
    };

    const handleDeleteSale = async (id: string) => {
        if (!window.confirm("Deseja realmente excluir esta venda?")) return;
        
        try {
            await deleteSale(id);
            alert('Venda excluída com sucesso!');
            fetchSales();
        } catch (error) {
            alert('Erro ao excluir a venda!');
            console.error(error);
        }
    }

    const handleSort = (field: keyof Sale) => {
        const order = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const filteredAndSortedSales = useMemo(() => {
        const filtered = sales.filter(s => 
            s.userId.toLowerCase().includes(searchUserId.toLowerCase()) &&
            s.eventId.toLowerCase().includes(searchEventId.toLowerCase())
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
    }, [sales, searchUserId, searchEventId, sortField, sortOrder]);

    const getSortIcon = (field: keyof Sale) => {
        if (sortField !== field) return '⇅';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
                <Link to="/" className="btn btn-secondary">Voltar</Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="list-container">
                <h1>Gerenciamento de Vendas</h1>

                <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por ID do usuário..."
                            value={searchUserId}
                            onChange={(e) => setSearchUserId(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por ID do evento..."
                            value={searchEventId}
                            onChange={(e) => setSearchEventId(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end gap-2">
                    <Link to="/sales/create" className="btn btn-success">
                        Registrar Nova Venda
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
                                ID da Venda {getSortIcon('id')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("userId")}>
                                ID do Usuário {getSortIcon('userId')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("eventId")}>
                                ID do Evento {getSortIcon('eventId')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("saleStatus")}>
                                Status {getSortIcon('saleStatus')}
                            </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedSales.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Nenhuma venda encontrada
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedSales.map((sale) => (
                                <tr key={sale.id}>
                                    <td>{sale.id}</td>
                                    <td>{sale.userId}</td>
                                    <td>{sale.eventId}</td>
                                    <td>
                                        <select 
                                            className="form-select form-select-sm"
                                            value={sale.saleStatus} 
                                            onChange={(e) => handleStatusChange(sale.id, e.target.value as SaleStatus)}
                                            aria-label="Status da venda"
                                        >
                                            {SaleStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <button 
                                            onClick={() => handleDeleteSale(sale.id)} 
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
};