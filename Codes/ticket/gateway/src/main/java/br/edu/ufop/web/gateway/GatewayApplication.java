package br.edu.ufop.web.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {

	public static void main(String[] args) {
		System.setProperty("eureka.instance.hostname", "localhost");
		SpringApplication.run(GatewayApplication.class, args);
	}

}