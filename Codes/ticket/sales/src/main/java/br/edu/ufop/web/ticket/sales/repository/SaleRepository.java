package br.edu.ufop.web.ticket.sales.repository;

import br.edu.ufop.web.ticket.sales.model.SaleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SaleRepository extends JpaRepository<SaleModel, UUID> {
}