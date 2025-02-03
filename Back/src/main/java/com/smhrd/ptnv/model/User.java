package com.smhrd.ptnv.model;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@ToString
@NoArgsConstructor
@Builder
@Entity
@Table(name="users")
public class User extends BaseTimeEntity {
	
	@Id
	@Column(length=50)
	private String id;
	
	@Column(length=20)
	private String pw;
	
	@Column(length=50,nullable = false)
	private String phone;
	
	@Column(length=50,nullable = false)
	private String nick;
	
	@Column(length=20,nullable = false)
	private String role;
	
	@Column(length=50,nullable = false)
	private String location;
	
	@Column(length=30)
	private String institute;
	
	@Column(nullable = false)
	private boolean requestAuth = false;

	
}