package com.smhrd.ptnv.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClovaService {

	private final String API_URL = "https://clovastudio.stream.ntruss.com/testapp/v1/chat-completions/HCX-003";
	private final String API_KEY = "nv-d5ad0526ad2b4faaa9a4b8b6e2ae10b9N6l5"; // 네이버 클라우드에서 발급받은 API 키
	private static final String REQUEST_ID = "e66e5cd20dad4453ada261c1524474a1";

	public String callClovaAPI(String userMessage) {
		RestTemplate restTemplate = new RestTemplate();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + API_KEY);
		headers.set("X-NCP-CLOVASTUDIO-REQUEST-ID", REQUEST_ID);
		headers.set("Accept", "text/event-stream");

		List<Map<String, String>> messages = new ArrayList<>();
        messages.add(createMessage("system", "병해충에 대한 정보를 제공하는 AI입니다."));
        messages.add(createMessage("user", userMessage));
        
		Map<String, Object> requestBody = new HashMap<>();
		requestBody.put("messages", messages);
		requestBody.put("topP", 0.8);
		requestBody.put("topK", 0);
		requestBody.put("maxTokens", 256);
		requestBody.put("temperature", 0.5);
		requestBody.put("repeatPenalty", 5.0);
		requestBody.put("stopBefore", new ArrayList<>());
		requestBody.put("includeAiFilters", true);
		requestBody.put("seed", 0);

		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

		try {
			ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, requestEntity,
					String.class);
			return response.getBody();
		} catch (Exception e) {
			return "API 호출 실패: " + e.getMessage();
		}
	}

	private Map<String, String> createMessage(String role, String content) {
		Map<String, String> message = new HashMap<>();
		message.put("role", role);
		message.put("content", content);
		return message;
	}

}
