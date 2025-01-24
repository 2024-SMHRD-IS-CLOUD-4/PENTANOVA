package com.smhrd.ptnv.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "disease_pests")
public class Disease_Pest {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "disease_pest_seq")
	@SequenceGenerator(name = "disease_pest_seq", sequenceName = "disease_pest_seq", allocationSize = 1)
	private Long dp_num;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "crop_num")
	private Crop crop_num; 

	@Column(length = 50, nullable = false)
	private String name;

	@Column(nullable = false)
	private boolean category;

	@Column(length = 50, nullable = false)
	private String season;

	@Column(length = 50, nullable = false)
	private String region;

	@Column(length = 20, nullable = false)
	private String site;

	@Column(length = 500, nullable = false)
	private String argu;

	@Column(length = 255)
	private String img;

}