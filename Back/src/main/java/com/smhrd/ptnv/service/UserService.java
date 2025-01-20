package com.smhrd.ptnv.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.smhrd.ptnv.model.User;
import com.smhrd.ptnv.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final UserRepository repository;

	public User login(User user) {
		return repository.findByIdAndPw(user.getId(), user.getPw());
	}

	public User join(User user) {
		Optional<User> result = repository.findById(user.getId());
		if (result.isEmpty()) {
			return repository.save(user);
		} else {
			return result.get();
		}
	}

	public boolean idCheck(String id) {
		Optional<User> result = repository.findById(id);
		if (result.isEmpty()) {
			return true;
		} else {
			return false;
		}
	}
	
	public List<User> getList() {
		return repository.findAll();
	}
}