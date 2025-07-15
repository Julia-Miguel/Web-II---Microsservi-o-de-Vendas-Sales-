# Microsserviço de Vendas de Ingressos (Sales)

Este projeto faz parte de um sistema de Gerenciamento de Tickets e é responsável por registrar os eventos disponíveis e realizar a venda de ingressos para os usuários.

---

## Descrição da Atividade Prática 01

A proposta desta atividade foi o desenvolvimento completo do microsserviço de Vendas (Sales). Ele implementa as operações de CRUD (Create, Read, Update, Delete) para as entidades `Event` (Evento) e `Sale` (Venda).

### Funcionalidades
- **Gerenciamento de Eventos:**
  - Cadastro, consulta, atualização e remoção de eventos.
  - Um evento possui tipo (palestra, show, etc.), descrição, data, período de vendas e preço.
- **Gerenciamento de Vendas:**
  - Registro de ingressos adquiridos por um usuário para um determinado evento.
  - Controle de status de pagamento (Em aberto, Pago, Cancelado, etc.).

---

## Tecnologias Utilizadas
- **Java 17**
- **Spring Boot 3.5.0**
- **Spring Data JPA:** Para persistência de dados.
- **PostgreSQL:** Banco de dados relacional.
- **Maven:** Gerenciador de dependências.
- **Spring Cloud (Eureka Client):** Para registro e descoberta de serviços.
- **Lombok:** Para reduzir código boilerplate.

---

## Modelo de Dados

O microsserviço utiliza duas entidades principais: `EventModel` e `SaleModel`.

- **EventModel:** Armazena informações sobre o evento.
- **SaleModel:** Registra uma venda, fazendo a ligação entre um `userId` e um `eventId`.

*Para visualizar o diagrama do banco de dados, adicione a imagem do seu modelo de dados aqui.*

---

## Endpoints da API

A documentação completa de todos os endpoints disponíveis pode ser encontrada no arquivo [ENDPOINTS.md](ENDPOINTS.md).

**Porta Padrão:** `4000`

---

## Como Executar o Projeto

1.  **Pré-requisitos:**
    - JDK 17 ou superior.
    - Maven.
    - Docker (para rodar o banco de dados PostgreSQL, se estiver usando o `docker-compose.yaml`).
    - Um cliente de API como Postman ou Insomnia.

2.  **Ordem de Inicialização:**
    - Inicie o microsserviço `nameserver` (Servidor Eureka) primeiro.
    - Em seguida, inicie este microsserviço `sales`.

3.  **Execução:**
    - Navegue até a pasta raiz do projeto `sales`.
    - Execute a classe `SalesApplication.java` a partir da sua IDE ou use o Maven:
      ```bash
      mvn spring-boot:run
      ```

4.  **Testando:**
    - Use um cliente de API para fazer requisições para `http://localhost:4000`, seguindo a documentação no arquivo `ENDPOINTS.md`.


