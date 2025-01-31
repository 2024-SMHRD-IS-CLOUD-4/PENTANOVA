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
@Table(name="AI_Searchs")
public class Ai_Search extends BaseTimeEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ai_search_seq")
	@SequenceGenerator(name="ai_search_seq", sequenceName = "ai_search_seq", allocationSize = 1)
	private Long ai_num;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id")
	private User id;
	
	@Column(length=50,nullable=false)
	private String title;
	
	@Column(length=500)
	private String content;
	
	@Column(length=255)
	private String img;
	
}