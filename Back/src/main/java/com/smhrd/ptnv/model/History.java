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
@Table(name="histories")
public class History extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "history_seq")
	@SequenceGenerator(name = "history_seq", sequenceName = "history_seq", allocationSize = 1)
	private Long his_num;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User id;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="dp_num")
	private Disease_Pest dp_num;
	
	@Column(length=255)
	private String img;
	
	@Column(length=500)
	private String content;
}