package br.edu.ufop.web.ticket.sales.controller;

import br.edu.ufop.web.ticket.sales.dto.EventRequest;
import br.edu.ufop.web.ticket.sales.dto.EventResponse;
import br.edu.ufop.web.ticket.sales.dto.SaleRequest;
import br.edu.ufop.web.ticket.sales.dto.SaleResponse;
import br.edu.ufop.web.ticket.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        return ResponseEntity.ok("Sales Service is running on port 4000");
    }

    // Endpoints for Events
    @GetMapping("/events")
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return ResponseEntity.ok(salesService.getAllEvents());
    }

    @GetMapping("/events/{id}")
    public ResponseEntity<EventResponse> getEventById(@PathVariable UUID id) {
        EventResponse event = salesService.getEventById(id);
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }

    @PostMapping("/events")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<EventResponse> createEvent(@RequestBody EventRequest request) {
        return new ResponseEntity<>(salesService.createEvent(request), HttpStatus.CREATED);
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable UUID id, @RequestBody EventRequest request) {
        EventResponse updatedEvent = salesService.updateEvent(id, request);
        return updatedEvent != null ? ResponseEntity.ok(updatedEvent) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/events/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteEvent(@PathVariable UUID id) {
        salesService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoints for Sales
    @GetMapping("/sales")
    public ResponseEntity<List<SaleResponse>> getAllSales() {
        return ResponseEntity.ok(salesService.getAllSales());
    }

    @GetMapping("/sales/{id}")
    public ResponseEntity<SaleResponse> getSaleById(@PathVariable UUID id) {
        SaleResponse sale = salesService.getSaleById(id);
        return sale != null ? ResponseEntity.ok(sale) : ResponseEntity.notFound().build();
    }

    @PostMapping("/sales")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<SaleResponse> createSale(@RequestBody SaleRequest request) {
        // CORREÇÃO: Retornar a venda criada, e não o evento.
        SaleResponse newSale = salesService.createSale(request);
        return new ResponseEntity<>(newSale, HttpStatus.CREATED);
    }

    @PatchMapping("/sales/{id}")
    public ResponseEntity<SaleResponse> updateSaleStatus(@PathVariable UUID id, @RequestBody SaleRequest request) {
        SaleResponse updatedSale = salesService.updateSaleStatus(id, request);
        return updatedSale != null ? ResponseEntity.ok(updatedSale) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/sales/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteSale(@PathVariable UUID id) {
        salesService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }
}