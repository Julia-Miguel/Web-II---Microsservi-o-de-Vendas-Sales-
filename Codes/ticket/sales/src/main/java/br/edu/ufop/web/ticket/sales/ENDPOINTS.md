# Endpoints do Microsserviço de Vendas (Sales)

Este documento descreve os endpoints da API para o microsserviço de Vendas.

**Porta Padrão:** `4000`

---

## Health Check

### GET /status
- **Descrição:** Verifica se o serviço está em execução.
- **Resposta (200 OK):** `Sales Service is running on port 4000`

---

## Entidade: Evento (`/events`)

### GET /events
- **Descrição:** Retorna uma lista de todos os eventos.
- **Resposta (200 OK):** `List<EventResponse>`

### GET /events/{id}
- **Descrição:** Busca um evento pelo seu UUID.
- **Resposta (200 OK):** `EventResponse`
- **Resposta (404 Not Found):** Se o evento não for encontrado.

### POST /events
- **Descrição:** Cria um novo evento.
- **Corpo da Requisição:** `EventRequest`
- **Resposta (201 Created):** `EventResponse`

### PUT /events/{id}
- **Descrição:** Atualiza um evento existente.
- **Corpo da Requisição:** `EventRequest`
- **Resposta (200 OK):** `EventResponse`
- **Resposta (404 Not Found):** Se o evento não for encontrado.

### DELETE /events/{id}
- **Descrição:** Remove um evento.
- **Resposta (204 No Content):** Sucesso, sem corpo de resposta.

---

## Entidade: Venda (`/sales`)

### GET /sales
- **Descrição:** Retorna uma lista de todas as vendas.
- **Resposta (200 OK):** `List<SaleResponse>`

### GET /sales/{id}
- **Descrição:** Busca uma venda pelo seu UUID.
- **Resposta (200 OK):** `SaleResponse`
- **Resposta (404 Not Found):** Se a venda não for encontrada.

### POST /sales
- **Descrição:** Registra uma nova venda.
- **Corpo da Requisição:** `SaleRequest`
- **Resposta (201 Created):** `SaleResponse`

### PATCH /sales/{id}
- **Descrição:** Atualiza o status de uma venda existente (ex: de `OPEN` para `PAID`).
- **Corpo da Requisição:** `SaleRequest` (apenas o campo `saleStatus` precisa ser preenchido).
- **Resposta (200 OK):** `SaleResponse`
- **Resposta (404 Not Found):** Se a venda não for encontrada.

### DELETE /sales/{id}
- **Descrição:** Remove uma venda (deve ser usado com cuidado, geralmente o status é alterado para `CANCELED` ou `REFUNDED`).
- **Resposta (204 No Content):** Sucesso, sem corpo de resposta.