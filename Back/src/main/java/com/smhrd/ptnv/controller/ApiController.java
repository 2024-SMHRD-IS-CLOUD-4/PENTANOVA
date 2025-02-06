package com.smhrd.ptnv.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.service.ApiService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ApiController {
	
	private final ApiService service;
	
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
}