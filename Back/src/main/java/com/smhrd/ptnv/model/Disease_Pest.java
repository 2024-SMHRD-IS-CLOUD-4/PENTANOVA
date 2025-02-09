package com.smhrd.ptnv.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
	@ManyToOne(fetch = FetchType.EAGER)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "user_id")
	private User id;
	@ManyToOne(fetch = FetchType.EAGER)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "crop_num")
	private Crop crop;

	@Column(length = 50, nullable = false)
	private String name;
	
	@Column(length = 50, nullable = false)
	private String eng_name;

	@Column(nullable = false)
	private boolean category;

	@Column(length = 50, nullable = false)
	private String season;

	@Column(length = 20, nullable = false)
	private String site;

	@Column(length = 500, nullable = false)
	private String argu;

	@Lob
	@Column
	private String content;
	
	@Column(length = 255)
	private String img;

}