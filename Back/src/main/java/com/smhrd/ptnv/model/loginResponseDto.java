package com.smhrd.ptnv.model;

import lombok.Data;

@Data
public class loginResponseDto {

	public boolean loginSuccess;
	public User user;
}
