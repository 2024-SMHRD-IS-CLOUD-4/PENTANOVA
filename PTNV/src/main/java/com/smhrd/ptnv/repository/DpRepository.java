package com.smhrd.ptnv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smhrd.ptnv.model.Disease_Pest;

@Repository
public interface DpRepository extends JpaRepository<Disease_Pest, Long>{
	
	
	
}
