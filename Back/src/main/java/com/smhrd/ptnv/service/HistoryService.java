package com.smhrd.ptnv.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.model.History;
import com.smhrd.ptnv.repository.HistoryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class HistoryService {

	private final HistoryRepository repository;
	
	public History addHs(History hs) {
		Optional<History> result = repository.findById(hs.getHis_num());
		if (result.isEmpty()) {
			return repository.save(hs);
		} else {
			return result.get();
		}
	}
	
	public List<History> getList() {
		return repository.findAll();
	}
	
}
