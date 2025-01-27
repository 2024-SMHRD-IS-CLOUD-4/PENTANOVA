package com.smhrd.ptnv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Promotion;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long>{

}
