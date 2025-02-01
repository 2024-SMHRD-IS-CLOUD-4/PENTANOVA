package com.smhrd.ptnv.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
    	registry.addMapping("/**")
        	.allowedOriginPatterns("http://211.188.53.71:3000", "http://localhost:3000", "http://211.188.53.71")
        	.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        	.allowedHeaders("*")
        	.allowCredentials(true);

    }
}
