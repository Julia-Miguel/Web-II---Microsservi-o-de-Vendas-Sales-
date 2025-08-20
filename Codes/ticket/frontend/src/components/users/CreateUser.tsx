// src/components/users/CreateUser.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../services/apiService';
import '../../App.css';

const CreateUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        const data = { name, email, password, city, creditCardNumber };

        try {
            await createUser(data);
            alert('Usuário criado com sucesso!');
            navigate('/users');
        } catch (error) {
            alert('Erro ao criar usuário!');
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

    return (
        <div className="form-container">
            <h1>Criar Usuário</h1>
            
            <form onSubmit={handleCreateUser}>
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
                            placeholder="Digite o nome completo"
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
                            placeholder="exemplo@email.com"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            placeholder="Digite uma senha segura"
                            disabled={isLoading}
                            minLength={6}
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
                            placeholder="Digite sua cidade"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-12 mb-3">
                        <label htmlFor="creditCardNumber" className="form-label">Cartão de Crédito</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="creditCardNumber" 
                            value={creditCardNumber} 
                            onChange={handleCreditCardChange}
                            placeholder="0000 0000 0000 0000"
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
                        {isLoading ? 'Criando...' : 'Criar Usuário'}
                    </button>
                    
                    <Link to="/users" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;