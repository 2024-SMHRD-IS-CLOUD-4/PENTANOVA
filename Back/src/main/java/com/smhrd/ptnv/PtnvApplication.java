package com.smhrd.ptnv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class PtnvApplication {

	public static void main(String[] args) {
		SpringApplication.run(PtnvApplication.class, args);
	}

}
