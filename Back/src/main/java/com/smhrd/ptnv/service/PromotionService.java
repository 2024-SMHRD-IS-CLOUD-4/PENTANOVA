package com.smhrd.ptnv.service;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.repository.PromotionRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PromotionService {

	private final PromotionRepository repository;
	
}
