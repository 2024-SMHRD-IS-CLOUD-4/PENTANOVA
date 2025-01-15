package com.smhrd.ptnv.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.User;
import com.smhrd.ptnv.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
	
	private final UserService service;
	
	@PostMapping("/login")
	public ResponseEntity<User> Login(@RequestBody User user) {
		User result = service.login(user); 
		if(result==null) {
			return ResponseEntity.badRequest().body(result);
		}else {
			return ResponseEntity.ok(result);
		}
	}
	
	@GetMapping("/idCheck/{id}")
	public ResponseEntity<String> IdCheck(@PathVariable String id){
		boolean isTrue = service.idCheck(id);
		if(isTrue) {
			return ResponseEntity.ok("사용 가능 아이디");
		}else {
			return ResponseEntity.badRequest().body("이미 존재하는 아이디");
		}
	}
	
	@PostMapping("/join")
	public ResponseEntity<String> Join(@RequestBody User user) {
		System.out.println(user);
		User result = service.join(user); 
		System.out.println(result);
		if(result==null) {
			return ResponseEntity.badRequest().body("로그인 실패");
		}else {
			return ResponseEntity.ok("로그인 성공");
		}
	}
	
	@GetMapping("/userList")
	public ResponseEntity<List<User>> getList(){
		List<User> result = service.getList();
		System.out.println(result);
		return ResponseEntity.ok(result);
				
	}
}