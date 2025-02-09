package com.smhrd.ptnv.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
@Table(name = "pesticides")
public class Pesticide_DisasterControl {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "crop_seq")
	@SequenceGenerator(name = "crop_seq", sequenceName = "crop_seq", allocationSize = 1)
	private Long pt_num;

	@ManyToOne(fetch = FetchType.EAGER)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "dp_num")
	private Disease_Pest dp;

	@Lob
	@Column
	private String occurence;
	
	@Column(length = 50, nullable = false)
	private String pt_name;
	
	@Lob
	@Column
	private String pt_detail;
	
	@Column(length = 50, nullable = false)
	private String dc_name;
	
	@Lob
	@Column
	private String dc_detail;

}
