package com.smhrd.ptnv.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.Diagnosis;
import com.smhrd.ptnv.model.User;
import com.smhrd.ptnv.repository.DiagRepository;
import com.smhrd.ptnv.service.DiagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diag")
public class DiagController {

	private final DiagService service;
	
	@GetMapping("/diagList")
	public ResponseEntity<List<Diagnosis>> login() {
		List<Diagnosis> result = service.diagList(); 
		if(result==null) {
			return ResponseEntity.badRequest().body(result);
		}else {
			return ResponseEntity.ok(result);
		}
	}
	
	@PostMapping("/selectOne")
	public ResponseEntity<Diagnosis> selectOne(@RequestParam Long diag_num) {
		Diagnosis result = service.selectOne(diag_num);
		return ResponseEntity.ok(result);
	}
	
}
