package com.smhrd.ptnv.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.service.ApiService;
import com.smhrd.ptnv.service.ClovaService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ApiController {
	
	private final ApiService service;
	private final ClovaService clovaService;
	
	@GetMapping("/getDpApi")
	public String getMethodName() {
		service.getDpData();
		return new String();
	}
	
	@GetMapping("/weatherApi")
	public String getWeather(@RequestParam String city) {
		String result = service.getWeather(city);
		return result;
	}
	
	@GetMapping("/clovaApi")
    public String callClovaAPI(@RequestParam String query) {
        String result = clovaService.callClovaAPI(query);
        return result;
    }
}