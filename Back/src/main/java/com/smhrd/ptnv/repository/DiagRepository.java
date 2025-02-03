package com.smhrd.ptnv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Diagnosis;
import com.smhrd.ptnv.model.User;

@Repository
public interface DiagRepository extends JpaRepository<Diagnosis, Long>{
	List<Diagnosis> findAllByUser(User user);
}
