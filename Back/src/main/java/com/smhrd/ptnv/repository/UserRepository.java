package com.smhrd.ptnv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smhrd.ptnv.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	
	User findByIdAndPw(String id, String pw);

	User findByPhone(String phone);
	
	User findByIdAndPhone(String id, String phone);
	
	List<User> findAllByRole(String role);
}