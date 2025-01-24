package com.smhrd.ptnv.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.Crop;
import com.smhrd.ptnv.service.CropService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crop")
public class CropController {

	private final CropService service;
	
	@GetMapping("/cropList")
	public ResponseEntity<List<Crop>> cropList() {
		List<Crop> result = service.cropList();
		return ResponseEntity.ok(result);
	}
}