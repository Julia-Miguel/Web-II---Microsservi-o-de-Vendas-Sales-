package br.edu.ufop.web.ticket.sales.model;

import br.edu.ufop.web.ticket.sales.enums.EventType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "events")
@Getter
@Setter
public class EventModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String description;

    @Enumerated(EnumType.STRING)
    private EventType type;

    private LocalDateTime date;
    private LocalDateTime startSales;
    private LocalDateTime endSales;
    private Float price;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "event")
    private List<SaleModel> sales;

    @PrePersist
    public void onPrePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onPreUpdate() {
        updatedAt = LocalDateTime.now();
    }
}