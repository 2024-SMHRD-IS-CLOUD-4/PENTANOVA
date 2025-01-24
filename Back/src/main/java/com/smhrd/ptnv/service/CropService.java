package com.smhrd.ptnv.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.model.Crop;
import com.smhrd.ptnv.repository.CropRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CropService {
	
	private final CropRepository repository;

	public List<Crop> cropList(){
		System.out.println("asdfff");
		return repository.findAll();
	}
}