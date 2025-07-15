package br.edu.ufop.web.ticket.sales.service;

import br.edu.ufop.web.ticket.sales.dto.EventRequest;
import br.edu.ufop.web.ticket.sales.dto.EventResponse;
import br.edu.ufop.web.ticket.sales.dto.SaleRequest;
import br.edu.ufop.web.ticket.sales.dto.SaleResponse;
import br.edu.ufop.web.ticket.sales.model.EventModel;
import br.edu.ufop.web.ticket.sales.model.SaleModel;
import br.edu.ufop.web.ticket.sales.repository.EventRepository;
import br.edu.ufop.web.ticket.sales.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SalesService {

    private final EventRepository eventRepository;
    private final SaleRepository saleRepository;

    // Event CRUD
    public List<EventResponse> getAllEvents() {
        return eventRepository.findAll().stream().map(this::toEventResponse).collect(Collectors.toList());
    }

    public EventResponse getEventById(UUID id) {
        return eventRepository.findById(id).map(this::toEventResponse).orElse(null);
    }

    public EventResponse createEvent(EventRequest request) {
        EventModel event = new EventModel();
        BeanUtils.copyProperties(request, event);
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    public EventResponse updateEvent(UUID id, EventRequest request) {
        EventModel event = eventRepository.findById(id).orElse(null);
        if (event == null) {
            return null;
        }
        BeanUtils.copyProperties(request, event);
        event = eventRepository.save(event);
        return toEventResponse(event);
    }

    public void deleteEvent(UUID id) {
        eventRepository.deleteById(id);
    }

    // Sale CRUD
    public List<SaleResponse> getAllSales() {
        return saleRepository.findAll().stream().map(this::toSaleResponse).collect(Collectors.toList());
    }

    public SaleResponse getSaleById(UUID id) {
        return saleRepository.findById(id).map(this::toSaleResponse).orElse(null);
    }

    public SaleResponse createSale(SaleRequest request) {
        EventModel event = eventRepository.findById(request.getEventId()).orElse(null);
        if (event == null) {
            // Poderia lançar uma exceção de evento não encontrado
            return null;
        }

        SaleModel sale = new SaleModel();
        sale.setUserId(request.getUserId());
        sale.setEvent(event);
        sale.setSaleDate(LocalDateTime.now());
        sale.setSaleStatus(request.getSaleStatus());

        sale = saleRepository.save(sale);
        return toSaleResponse(sale);
    }

    public SaleResponse updateSaleStatus(UUID id, SaleRequest request) {
        SaleModel sale = saleRepository.findById(id).orElse(null);
        if (sale == null) {
            return null;
        }
        sale.setSaleStatus(request.getSaleStatus());
        sale = saleRepository.save(sale);
        return toSaleResponse(sale);
    }

    public void deleteSale(UUID id) {
        saleRepository.deleteById(id);
    }
    
    // Converters
    private EventResponse toEventResponse(EventModel event) {
        EventResponse response = new EventResponse();
        BeanUtils.copyProperties(event, response);
        return response;
    }

    private SaleResponse toSaleResponse(SaleModel sale) {
        SaleResponse response = new SaleResponse();
        BeanUtils.copyProperties(sale, response);
        if (sale.getEvent() != null) {
            response.setEventId(sale.getEvent().getId());
        }
        return response;
    }
}