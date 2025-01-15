package com.smhrd.ptnv.service;

import org.springframework.stereotype.Service;

import com.smhrd.ptnv.repository.CropRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CropService {
	
	private final CropRepository repository;

}