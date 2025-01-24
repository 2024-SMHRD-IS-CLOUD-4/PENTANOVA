package com.smhrd.ptnv.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.model.Diagnosis;
import com.smhrd.ptnv.repository.DiagRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DiagService {

	private final DiagRepository repository;
	
	public Diagnosis addHs(Diagnosis hs) {
		Optional<Diagnosis> result = repository.findById(hs.getDiag_num());
		if (result.isEmpty()) {
			return repository.save(hs);
		} else {
			return result.get();
		}
	}
	
	public List<Diagnosis> getList() {
		return repository.findAll();
	}
	
}
