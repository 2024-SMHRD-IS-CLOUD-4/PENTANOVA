package com.smhrd.ptnv.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.smhrd.ptnv.model.loginResponseDto;
import com.smhrd.ptnv.model.KakaoAccountDto;
import com.smhrd.ptnv.model.KakaoTokenDto;
import com.smhrd.ptnv.model.User;
import com.smhrd.ptnv.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class KakaoService {
	
	private final UserRepository repository;
	private final UserService service;
	
	private String clientId = "22192e7a34b82d69230ba35d1b252067";
	private String redirectUri = "http://localhost:3000/kakao/callback";
	
	@Transactional
	public KakaoTokenDto getKakaoAccessToken(String code) {
	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
	    
	    // Http Response Body 객체 생성
	    MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
	    params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
	    params.add("client_id", clientId); // 카카오 Dev 앱 REST API 키
	    params.add("redirect_uri", redirectUri); // 카카오 Dev redirect uri
	    params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값
	    params.add("client_secret", "wHqOLaCqTdpR1fLCTBh2lxuuGsLJZdlg"); // 카카오 Dev 카카오 로그인 Client Secret

	    // 헤더와 바디 합치기 위해 Http Entity 객체 생성
	    HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

	    // 카카오로부터 Access token 받아오기
	    RestTemplate rt = new RestTemplate();
	    ResponseEntity<String> accessTokenResponse = rt.exchange(
	    		"https://kauth.kakao.com/oauth/token", // "https://kauth.kakao.com/oauth/token"
	            HttpMethod.POST,
	            kakaoTokenRequest,
	            String.class
	    );

	    // JSON Parsing (-> KakaoTokenDto)
	    ObjectMapper objectMapper = new ObjectMapper();
	    objectMapper.registerModule(new JavaTimeModule());
	    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	    KakaoTokenDto kakaoTokenDto = null;
	    try {
	        kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	    }

	    return kakaoTokenDto;
	}
	
	public loginResponseDto kakaoLogin(String kakaoAccessToken) {
	    User account = getKakaoInfo(kakaoAccessToken);
	    loginResponseDto loginResponseDto = new loginResponseDto();
	    loginResponseDto.setLoginSuccess(true);
	    loginResponseDto.setUser(account);
	    User existOwner = repository.findById(account.getId()).orElse(null);
	    try {
	        if (existOwner == null) {
	            account.setLocation("전라도/광주");
	            account.setRole("일반사용자");
	            account.setPhone("01012345678");
	            repository.save(account);
	        }
	        loginResponseDto.setLoginSuccess(true);
	        Optional<User> result = repository.findById(account.getId());
	        loginResponseDto.setUser(result.get());
	        return loginResponseDto;

	    } catch (Exception e) {
	        loginResponseDto.setLoginSuccess(false);
	        return loginResponseDto;
	    }
	}
	
	public User getKakaoInfo(String kakaoAccessToken) {
	    RestTemplate rt = new RestTemplate();

	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Authorization", "Bearer " + kakaoAccessToken);
	    headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

	    HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

	    // POST 방식으로 API 서버에 요청 후 response 받아옴
	    ResponseEntity<String> accountInfoResponse = rt.exchange(
	    		"https://kapi.kakao.com/v2/user/me", // "https://kapi.kakao.com/v2/user/me"
	            HttpMethod.POST,
	            accountInfoRequest,
	            String.class
	    );
	    
	    // JSON Parsing (-> kakaoAccountDto)
	    ObjectMapper objectMapper = new ObjectMapper();
	    objectMapper.registerModule(new JavaTimeModule());
	    objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	    KakaoAccountDto kakaoAccountDto = null;
	    try {
	        kakaoAccountDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoAccountDto.class);
	        System.out.println(kakaoAccountDto);
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	    }

		// 회원가입 처리하기
	    String kakaoId = kakaoAccountDto.getId();
	    User existOwner = repository.findById(kakaoId).orElse(null);
	    // 처음 로그인이 아닌 경우
	    if (existOwner != null) {
	        return User.builder()
	        		.id(kakaoAccountDto.getId())
	                .nick(kakaoAccountDto.getKakao_account().getProfile().getNickname())
	                .build();
	    }
	    // 처음 로그인 하는 경우
	    else {
	        return User.builder()
	        		.id(kakaoAccountDto.getId())
	                .nick(kakaoAccountDto.getKakao_account().getProfile().getNickname())
	                .build();
	    }
	}
}
