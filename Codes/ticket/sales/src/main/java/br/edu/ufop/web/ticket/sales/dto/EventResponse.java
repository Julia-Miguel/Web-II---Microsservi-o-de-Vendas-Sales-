package br.edu.ufop.web.ticket.sales.dto;

import br.edu.ufop.web.ticket.sales.enums.EventType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class EventResponse {
    private UUID id;
    private String description;
    private EventType type;
    private LocalDateTime date;
    private LocalDateTime startSales;
    private LocalDateTime endSales;
    private Float price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}