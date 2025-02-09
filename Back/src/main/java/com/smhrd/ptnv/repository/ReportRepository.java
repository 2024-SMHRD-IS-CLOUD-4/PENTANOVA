package com.smhrd.ptnv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long>{

}