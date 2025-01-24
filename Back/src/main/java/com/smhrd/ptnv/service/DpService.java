package com.smhrd.ptnv.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.model.Crop;
import com.smhrd.ptnv.model.Disease_Pest;
import com.smhrd.ptnv.repository.DpRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DpService {

	private final DpRepository repository;

	public Disease_Pest addDp(Disease_Pest dp) {
		Optional<Disease_Pest> result = repository.findById(dp.getDp_num());
		if (result.isEmpty()) {
			return repository.save(dp);
		} else {
			return result.get();
		}
	}

	public List<Disease_Pest> getList() {
		return repository.findAll(); 
	}
	
	public Optional<Disease_Pest> selectOne(Long dp_num) {
		return repository.findById(dp_num);
	}
	
}