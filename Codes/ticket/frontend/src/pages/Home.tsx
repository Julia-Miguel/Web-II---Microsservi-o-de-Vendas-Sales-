// src/pages/Home.tsx
import '../App.css';

const Home = () => {
    return (
        <div className="form-container">
            <h1>Bem-vindo ao Sistema de Gerenciamento de Ingressos</h1>
            <p style={{ maxWidth: '600px', lineHeight: '1.6', margin: '20px auto' }}>
                Esta é a área administrativa do seu sistema. Utilize a barra de navegação acima para gerenciar usuários, cadastrar novos eventos, registrar vendas e visualizar relatórios detalhados.
            </p>
        </div>
    );
}

export default Home;