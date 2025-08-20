// src/components/users/UpdateUser.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/apiService';
import '../../App.css';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        if (id) {
            getUserById(id)
                .then(response => {
                    setName(response.name);
                    setEmail(response.email);
                    setCity(response.city || '');
                    setCreditCardNumber(response.creditCardNumber || '');
                })
                .catch(error => {
                    console.error('Erro ao carregar usuário:', error);
                    alert('Usuário não encontrado!');
                    navigate('/users');
                })
                .finally(() => {
                    setIsLoadingData(false);
                });
        }
    }, [id, navigate]);

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        
        setIsLoading(true);
        const data = { id, name, email, city, creditCardNumber };
        
        try {
            await updateUser(data);
            alert("Usuário atualizado com sucesso!");
            navigate('/users');
        } catch (error) {
            alert("Erro na atualização do usuário!");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const formatCreditCard = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
        return formattedValue.substring(0, 19);
    };

    const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCreditCard(e.target.value);
        setCreditCardNumber(formatted);
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
            <h1>Editar Usuário</h1>
            
            <form onSubmit={handleUpdateUser}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="city" className="form-label">Cidade</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="city" 
                            value={city} 
                            onChange={e => setCity(e.target.value)} 
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="creditCardNumber" className="form-label">Cartão de Crédito</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="creditCardNumber" 
                            value={creditCardNumber} 
                            onChange={handleCreditCardChange}
                            disabled={isLoading}
                            maxLength={19}
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
                    
                    <Link to="/users" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;