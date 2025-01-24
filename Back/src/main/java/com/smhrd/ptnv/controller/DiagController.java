package com.smhrd.ptnv.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.repository.DiagRepository;
import com.smhrd.ptnv.service.DiagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class DiagController {

	private final DiagService service;
	
}
