package com.smhrd.ptnv.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.Diagnosis;
import com.smhrd.ptnv.model.Disease_Pest;
import com.smhrd.ptnv.service.DpService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dp")
public class DpController {

	private final DpService service;

	@PostMapping("/addDp")
	public ResponseEntity<Disease_Pest> addDp(Disease_Pest dp) {
		Disease_Pest result = service.addDp(dp);
		if (result == null) {
			return ResponseEntity.badRequest().body(result);
		} else {
			return ResponseEntity.ok(result);
		}
	}

	@GetMapping("/dpList")
	public ResponseEntity<List<Disease_Pest>> dpList() {
		List<Disease_Pest> result = service.dpList();
		return ResponseEntity.ok(result);
	}

	@GetMapping("/dpListByCrop")
	public ResponseEntity<List<Disease_Pest>> dpListByCrop(@RequestParam Long crop_num) {
		List<Disease_Pest> result = service.dpListByCrop(crop_num);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/selectOne")
	public ResponseEntity<Disease_Pest> selcetOne(@RequestParam Long dp_num) {
		Optional<Disease_Pest> result = service.selectOne(dp_num);
		Disease_Pest dp = result.get();
		return ResponseEntity.ok(dp);
	}
	
	@PostMapping("/selfCheck")
	public ResponseEntity<Long []> selfCheck(@RequestBody Disease_Pest dp) {
		System.out.println(dp);
		System.out.println(dp.getCrop().getCrop_num());
		Long [] result = service.selfCheck(dp);
		
		if (result == null) {
			return ResponseEntity.ok(null);
		} else {
			return ResponseEntity.ok(result);
		}
	}

}