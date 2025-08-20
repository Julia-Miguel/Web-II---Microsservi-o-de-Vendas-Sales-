package br.ufop.edu.web.ticket.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserServiceApplication {

    public static void main(String[] args) {
        // FORÇA o hostname a ser 'localhost' no momento da execução
        System.setProperty("eureka.instance.hostname", "localhost");
        SpringApplication.run(UserServiceApplication.class, args);
    }

}