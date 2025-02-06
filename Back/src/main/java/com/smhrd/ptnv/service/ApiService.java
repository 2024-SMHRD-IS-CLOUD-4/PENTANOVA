package com.smhrd.ptnv.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ApiService {
	private final RestTemplate restTemplate;

	// 생성자 주입
	public ApiService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public String getDpData() throws RestClientException {
		String baseUrl = "http://ncpms.rda.go.kr/npmsAPI/service";

		UriComponents result = UriComponentsBuilder.fromUriString(baseUrl)
				.queryParam("apiKey", "2025bf1f57887434fa9bc8ee7093125f1559").queryParam("serviceCode", "SVC05")
				.queryParam("sickKey", 2).build();
		System.out.println(result);
		// GET 방식으로 API 호출하고 결과를 문자열로 반환

		return restTemplate.getForObject(result.toUri(), String.class);
	}

	public String getWeather(String city) {
		String apiKey = "48e1a487d9585689bd4c16f3a1aacb7f";
		String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
		UriComponents result = UriComponentsBuilder.fromUriString(url).build();
		return restTemplate.getForObject(result.toUri(), String.class);
	}
}
