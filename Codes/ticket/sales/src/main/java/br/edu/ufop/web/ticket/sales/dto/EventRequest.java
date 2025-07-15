package br.edu.ufop.web.ticket.sales.dto;

import br.edu.ufop.web.ticket.sales.enums.EventType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventRequest {
    private String description;
    private EventType type;
    private LocalDateTime date;
    private LocalDateTime startSales;
    private LocalDateTime endSales;
    private Float price;
}