package br.edu.ufop.web.ticket.sales.dto;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import lombok.Data;

import java.util.UUID;

@Data
public class SaleRequest {
    private UUID userId;
    private UUID eventId;
    private SaleStatus saleStatus;
}