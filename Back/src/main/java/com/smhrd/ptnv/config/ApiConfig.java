package com.smhrd.ptnv.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import com.smhrd.ptnv.service.ApiService;

@Configuration
public class ApiConfig {

	public static void main(String[] args) {
        SpringApplication.run(ApiConfig.class, args);
    }

    // RestTemplate 빈 등록
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    // 애플리케이션 시작 시 ApiService의 getApiData() 실행
//    @Bean
//    public CommandLineRunner run(ApiService apiService) {
//        return args -> {
//            String result = apiService.getDpData();
//            System.out.println("API 결과: " + result);
//        };
//    }
}
