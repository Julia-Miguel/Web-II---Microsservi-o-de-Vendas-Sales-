package br.edu.ufop.web.ticket.sales.enums;

import lombok.Getter;

@Getter
public enum SaleStatus {
    OPEN,
    PAID,
    CANCELED,
    REFUNDED;
}