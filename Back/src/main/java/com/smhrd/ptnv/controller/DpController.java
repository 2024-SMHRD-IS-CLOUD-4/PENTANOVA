package com.smhrd.ptnv.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.Disease_Pest;
import com.smhrd.ptnv.service.DpService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dp")
public class DpController {

	private final DpService service;	

	@PostMapping("/addDp")
	public ResponseEntity<Disease_Pest> addDp(Disease_Pest dp){
		Disease_Pest result = service.addDp(dp);
		if(result==null) {
			return ResponseEntity.badRequest().body(result);
		}else {
			return ResponseEntity.ok(result);
		}
	}
	
	@GetMapping("/dpList")
	public ResponseEntity<List<Disease_Pest>> getList(){
		List<Disease_Pest> result = service.getList();
		List<Disease_Pest> dtoList = result.stream()
                .map(Disease_Pest::new)
                .collect(Collectors.toList());
		System.out.println(dtoList);
		return ResponseEntity.ok(dtoList);
	}
	
	@PostMapping("selectOne")
	public ResponseEntity<Optional<Disease_Pest>> selcetOne(@RequestParam Long id) {
		Optional<Disease_Pest> result = service.selectOne(id);
		System.out.println();
		return ResponseEntity.ok(result);
	}
	
}
