package com.smhrd.ptnv.model;

import lombok.Data;

@Data
public class KakaoAccountDto {

	private String id;
	private KakaoAccount kakao_account;

	@Data
	public static class KakaoAccount {
		private String email;
		private Profile profile;

		@Data
		public static class Profile {
			private String nickname;
		}
	}
}