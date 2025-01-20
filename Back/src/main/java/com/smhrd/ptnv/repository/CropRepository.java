package com.smhrd.ptnv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Crop;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long>{

}