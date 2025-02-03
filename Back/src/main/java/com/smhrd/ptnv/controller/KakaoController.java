package com.smhrd.ptnv.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.loginResponseDto;
import com.smhrd.ptnv.model.KakaoTokenDto;
import com.smhrd.ptnv.service.KakaoService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/kakao")
public class KakaoController {
	private final KakaoService kakaoService;

	

	@PostMapping("/login")
	public ResponseEntity<loginResponseDto> kakaoLogin(HttpServletRequest request) {
	    String code = request.getParameter("code");
	    KakaoTokenDto kakaoAccessToken = kakaoService.getKakaoAccessToken(code);
	    loginResponseDto result = kakaoService.kakaoLogin(kakaoAccessToken.getAccess_token());
	    return ResponseEntity.ok(result);
	}
}