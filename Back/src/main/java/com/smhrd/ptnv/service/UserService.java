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

	public boolean idCheck2(String id) {
		Optional<User> result = repository.findById(id);
		if (result.isEmpty()) {
			return false;
		} else {
			return true;
		}
	}

	public List<User> getList() {
		return repository.findAllByRole("일반사용자");
	}

	public List<User> getList2() {
		return repository.findAll();
	}

	public void authorization(String id) {
		Optional<User> result = repository.findById(id);
		User user = result.get();
		user.setRole("관리자");
		user.setRequestAuth(false);
		repository.save(user);
	}

	public User idFind(String phone) {
		return repository.findByPhone(phone);
	}

	public User pwFind(String id, String phone) {
		return repository.findByIdAndPhone(id, phone);
	}

	public boolean updatePw(String id, String pw) {
		Optional<User> result = repository.findById(id);
		if (result.isPresent()) {
			User user = result.get();
			user.setPw(pw);
			repository.save(user);
			return true;
		} else {
			return false;
		}
	}

	public boolean requestAuth(String id, String institute, Boolean requestAuth) {
		Optional<User> result = repository.findById(id);
		if (result.isPresent()) {
			User user = result.get();
			user.setRequestAuth(requestAuth);
			user.setInstitute(institute);
			repository.save(user);
			return true;
		} else {
			return false;
		}
	}

	public User selectOne(String id) {
		Optional<User> result = repository.findById(id);
		return result.get();
	}
}