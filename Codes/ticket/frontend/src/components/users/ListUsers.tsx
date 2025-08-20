// src/components/users/ListUsers.tsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../../services/apiService";
import type { User } from "../../types";
import '../../App.css'; 

const ListUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [sortField, setSortField] = useState<keyof User | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        getUsers().then(setUsers).catch(error => {
            console.error("Erro ao buscar usuários:", error);
        });
    }, []);

    const handleDeleteUser = async (id: string) => {
        if (!window.confirm("Deseja realmente excluir este usuário?")) return;
        try {
            await deleteUser(id);
            alert('Usuário excluído com sucesso!');
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            alert('Erro ao excluir o usuário!');
            console.error(error);
        }
    }

    const handleSort = (field: keyof User) => {
        const order = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const filteredAndSortedUsers = useMemo(() => {
        const filtered = users.filter(u => 
            u.name.toLowerCase().includes(searchName.toLowerCase()) &&
            u.email.toLowerCase().includes(searchEmail.toLowerCase())
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
    }, [users, searchName, searchEmail, sortField, sortOrder]);

    const getSortIcon = (field: keyof User) => {
        if (sortField !== field) return '⇅';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="container mt-4">
            <div className="list-container">
                <h1>Gerenciamento de Usuários</h1>

                <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por email..."
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end gap-2">
                    <Link to="/users/create" className="btn btn-success">
                        Criar Usuário
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
                            <th className="sortable" onClick={() => handleSort("name")}>
                                Nome {getSortIcon('name')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("email")}>
                                Email {getSortIcon('email')}
                            </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    Nenhum usuário encontrado
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <Link to={`/users/update/${user.id}`} className="btn btn-primary btn-sm">
                                            Editar
                                        </Link>
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)} 
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
    )
}

export default ListUsers;