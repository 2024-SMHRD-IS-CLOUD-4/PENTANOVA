package com.smhrd.ptnv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Diagnosis;

@Repository
public interface DiagRepository extends JpaRepository<Diagnosis, Long>{

}
