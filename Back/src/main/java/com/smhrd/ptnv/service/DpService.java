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

	public List<Disease_Pest> dpList() {
		return repository.findAll();
	}

	public List<Disease_Pest> dpListByCrop(Long crop_num) {
		Crop crop = new Crop();
		crop.setCrop_num(crop_num);
		return repository.findAllByCrop(crop);
	}

	public Optional<Disease_Pest> selectOne(Long dp_num) {
		return repository.findById(dp_num);
	}

	public Long[] selfCheck(Disease_Pest dp) {
		List<Disease_Pest> result = repository.findByCropOrSeasonAndSiteAndArgu(dp.getCrop(), dp.getSeason(),
				dp.getSite(), dp.getArgu());
		Long[] arr = new Long[result.size()];
		for (int i = 0; i < arr.length; i++) {
			arr[i] = result.get(i).getDp_num();
		}
		return arr;
	}
	
	public List<Disease_Pest> findText(String text){
		return repository.findByNameContainingIgnoreCase(text);
	}
	
}