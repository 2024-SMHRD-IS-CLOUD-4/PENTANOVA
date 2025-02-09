package com.smhrd.ptnv.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.model.Report;
import com.smhrd.ptnv.repository.ReportRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReportService {

	private final ReportRepository repository;
	
	public Report addRp(Report rp) {
		Optional<Report> result = repository.findById(rp.getReport_num());
		if (result.isEmpty()) {
			return repository.save(rp);
		} else {
			return result.get();
		}
	}
	
	public List<Report> getList() {
		return repository.findAll();
	}
	
}
