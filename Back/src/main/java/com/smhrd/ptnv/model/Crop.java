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
@Table(name="crops")
public class Crop {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "crop_seq")
	@SequenceGenerator(name = "crop_seq", sequenceName = "crop_seq", allocationSize = 1)
	private Long crop_num;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User id;
	
	@Column(length=50,nullable=false)
	private String name;
	
	@Column(length=20,nullable=false)
	private String type;
	
	@Column(length=255)
	private String img;
}