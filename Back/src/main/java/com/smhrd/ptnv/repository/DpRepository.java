package com.smhrd.ptnv.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smhrd.ptnv.model.Crop;
import com.smhrd.ptnv.model.Disease_Pest;

@Repository
public interface DpRepository extends JpaRepository<Disease_Pest, Long> {

	List<Disease_Pest> findAllByCrop(Crop crop);

	@Query("SELECT dp FROM Disease_Pest dp WHERE " + "(:crop IS NULL OR dp.crop = :crop) AND "
			+ "(:season IS NULL OR dp.season = :season) AND " + "(:site IS NULL OR dp.site = :site) AND "
			+ "(:argu IS NULL OR dp.argu = :argu)")
	List<Disease_Pest> findByCropOrSeasonAndSiteAndArgu(@Param("crop") Crop crop, @Param("season") String season,
			@Param("site") String site, @Param("argu") String argu);
	
	List<Disease_Pest> findByNameContainingIgnoreCase(String text);
}