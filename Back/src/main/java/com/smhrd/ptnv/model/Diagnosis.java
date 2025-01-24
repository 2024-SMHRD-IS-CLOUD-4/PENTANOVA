package com.smhrd.ptnv.model;

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
@Table(name="diagnosises")
public class Diagnosis extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "diagnosis_seq")
	@SequenceGenerator(name = "diagnosis_seq", sequenceName = "diagnosis_seq", allocationSize = 1)
	private Long diag_num;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="dp_num")
	private Disease_Pest dp_num;
	
	@Column(length=255)
	private String diag_img;
	
	@Column(length=500)
	private String diag_content;
}