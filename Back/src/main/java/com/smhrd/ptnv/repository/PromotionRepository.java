package com.smhrd.ptnv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Ai_Search;

@Repository
public interface PromotionRepository extends JpaRepository<Ai_Search, Long>{

}
