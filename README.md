# Sistema de Gerenciamento de Ingressos (TicketSys)

Este projeto é um sistema completo de Gerenciamento de Ingressos construído com uma arquitetura de microsserviços.  
Ele é composto por um backend robusto responsável pelos dados e regras de negócio, e uma interface de frontend moderna para administração.

---

## Descrição da Atividade Prática

A proposta desta atividade foi o desenvolvimento de um **sistema completo de gerenciamento de ingressos**, utilizando microsserviços no backend e uma SPA moderna no frontend.  
Cada microsserviço possui uma responsabilidade específica e todos se comunicam via **API Gateway**.

### Funcionalidades
- **Users Service:**
  - Cadastro, consulta, atualização e remoção de usuários.
- **Sales Service:**
  - Cadastro e gerenciamento de eventos (shows, palestras, etc.).
  - Registro e controle das vendas de ingressos feitas por usuários.
- **Nameserver (Eureka):**
  - Registro e descoberta dos microsserviços na rede.
- **API Gateway:**
  - Roteamento de requisições do frontend para os microsserviços corretos.
- **Frontend (React SPA):**
  - Interface administrativa para gerenciar usuários e vendas de ingressos.
  - Suporte a tema claro/escuro.

---

## Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.5.0**
- **Spring Cloud (Eureka, Gateway)**
- **Spring Data JPA** para persistência de dados
- **PostgreSQL** como banco de dados
- **Maven** para gerenciamento de dependências
- **Lombok** para redução de código boilerplate

### Frontend
- **React 19 com TypeScript**
- **Vite** como ferramenta de build e servidor de desenvolvimento
- **React Router** para roteamento de páginas
- **Axios** para requisições HTTP
- **Bootstrap 5** para estilização responsiva

---

## Arquitetura do Sistema

O sistema segue uma arquitetura de microsserviços:

- **nameserver**: responsável pelo registro e descoberta de serviços.  
- **users-service**: microsserviço de usuários.  
- **sales-service**: microsserviço de vendas.  
- **gateway**: ponto de entrada único do backend.  
- **frontend**: aplicação React SPA para interação do usuário/admin.  

---

## Como Executar o Projeto

### 1. Pré-requisitos
- JDK 17 ou superior  
- Maven  
- Node.js e npm (ou yarn)  
- Docker (opcional, para rodar o PostgreSQL facilmente)  

### 2. Ordem de Inicialização
1. **Nameserver (Eureka):**
   - Navegue até `Codes/ticket/nameserver`  
   - Execute:
     ```bash
     mvn spring-boot:run
     ```
   - Verifique em [http://localhost:8761](http://localhost:8761) se o Eureka está online.

2. **Microsserviços (Users e Sales):**
   - Em terminais separados:  
     ```bash
     cd Codes/ticket/user
     mvn spring-boot:run
     ```
     ```bash
     cd Codes/ticket/sales
     mvn spring-boot:run
     ```
   - Confirme no painel do Eureka que ambos os serviços foram registrados.

3. **API Gateway:**
   - Após os serviços estarem registrados, execute:
     ```bash
     cd Codes/ticket/gateway
     mvn spring-boot:run
     ```

4. **Frontend (React):**
   - Instale dependências:
     ```bash
     cd Codes/ticket/frontend
     npm install
     ```
   - Inicie o servidor:
     ```bash
     npm run dev
     ```
   - A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).
