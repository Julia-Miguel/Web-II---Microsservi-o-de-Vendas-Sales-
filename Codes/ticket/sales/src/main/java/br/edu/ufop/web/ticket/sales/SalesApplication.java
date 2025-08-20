package br.edu.ufop.web.ticket.sales;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SalesApplication {

    public static void main(String[] args) {
        System.setProperty("eureka.instance.hostname", "localhost");
        SpringApplication.run(SalesApplication.class, args);
    }

}