package br.edu.ufop.web.ticket.sales.dto;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class SaleResponse {
    private UUID id;
    private UUID userId;
    private UUID eventId;
    private LocalDateTime saleDate;
    private SaleStatus saleStatus;
    private LocalDateTime createdAt;
}