package com.smhrd.ptnv.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.ptnv.model.User;
import com.smhrd.ptnv.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService service;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User result = service.login(user);
        if (result == null) {
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/idCheck/{id}")
    public ResponseEntity<String> idCheck(@PathVariable String id) {
        boolean isTrue = service.idCheck(id);
        if (isTrue) {
            return ResponseEntity.ok("사용 가능 아이디");
        } else {
            return ResponseEntity.ok("이미 존재하는 아이디");
        }
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody User user) {
        User result = service.join(user);
        if (result == null) {
            return ResponseEntity.badRequest().body("회원가입 실패");
        } else {
            return ResponseEntity.ok("회원가입 성공");
        }
    }

    @GetMapping("/userList")
    public ResponseEntity<List<User>> getList() {
        List<User> result = service.getList();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/authorization")
    public void authorization(@RequestParam String id) {
        service.authorization(id);
    }

    @PostMapping("/selectOne")
    public ResponseEntity<User> selectOne(@RequestParam String id) {
        User result = service.selectOne(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/idFind")
    public ResponseEntity<String> idFind(@RequestParam String phone) {
        User result = service.idFind(phone);
        if (result != null) {
            return ResponseEntity.ok(result.getId());
        } else {
            return ResponseEntity.badRequest().body("일치하는 데이터 없음.");
        }
    }

    @PostMapping("/pwFind")
    public ResponseEntity<String> pwFind(@RequestParam String id, @RequestParam String phone) {
        User result = service.pwFind(id, phone);
        if (result != null) {
            return ResponseEntity.ok("비밀번호 찾기 성공");
        } else {
            return ResponseEntity.badRequest().body("비밀번호를 찾을 수 없습니다.");
        }
    }

    @PostMapping("/updatePw")
    public ResponseEntity<String> updatePw(@RequestParam String id, @RequestParam String pw) {
        boolean result = service.updatePw(id, pw);
        if (result) {
            return ResponseEntity.ok("비밀번호 변경 성공");
        } else {
            return ResponseEntity.badRequest().body("비밀번호 변경 실패");
        }
    }

    @PostMapping("/sendAuth")
    public ResponseEntity<Boolean> requestAuth(@RequestParam String id, @RequestParam Boolean requestAuth,
            @RequestParam String institute) {
        boolean isTrue = service.idCheck2(id);
        if (isTrue) {
            boolean result = service.requestAuth(id, institute, requestAuth);
            if (result) {
                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.ok(false);
            }
        } else {
            return ResponseEntity.ok(false);
        }
    }
}


//package com.smhrd.ptnv.controller;
//
//import java.util.List;
//
//import org.apache.ibatis.annotations.Param;
//import org.hibernate.annotations.Parameter;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.ws.server.endpoint.annotation.XPathParam;
//
//import com.smhrd.ptnv.model.User;
//import com.smhrd.ptnv.service.UserService;
//
//import jakarta.websocket.server.PathParam;
//import lombok.RequiredArgsConstructor;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/user")
//public class UserController {
//
//	private final UserService service;
//
//	@PostMapping("/login")
//	public ResponseEntity<User> login(@RequestBody User user) {
//		System.out.println(user.getId());
//		User result = service.login(user);
//		if (result == null) {
//			return ResponseEntity.badRequest().body(result);
//		} else {
//			return ResponseEntity.ok(result);
//		}
//	}
//
//	@GetMapping("/idCheck/{id}")
//	public ResponseEntity<String> idCheck(@PathVariable String id) {
//		boolean isTrue = service.idCheck(id);
//		if (isTrue) {
//			return ResponseEntity.ok("사용 가능 아이디");
//		} else {
//			return ResponseEntity.ok("이미 존재하는 아이디");
//		}
//	}
//
//	@PostMapping("/join")
//	public ResponseEntity<String> join(@RequestBody User user) {
//		System.out.println("asdfasdf");
//		User result = service.join(user);
//		if (result == null) {
//			return ResponseEntity.badRequest().body("로그인 실패");
//		} else {
//			return ResponseEntity.ok("로그인 성공");
//		}
//	}
//
//	@GetMapping("/userList")
//	public ResponseEntity<List<User>> getList() {
//		List<User> result = service.getList();
//		return ResponseEntity.ok(result);
//	}
//
//	@PostMapping("/authorization")
//	public void authorization(@RequestParam String id) {
//		service.authorization(id);
//	}
//
//	@PostMapping("/selectOne")
//	public ResponseEntity<User> selectOne(@RequestParam String id) {
//		User result = service.selectOne(id);
//		return ResponseEntity.ok(result);
//	}
//
//	@PostMapping("/idFind")
//	public ResponseEntity<String> idFind(@RequestParam String phone) {
//		User result = service.idFind(phone);
//		if (result != null) {
//			return ResponseEntity.ok(result.getId());
//		} else {
//			return ResponseEntity.ok("일치하는 데이터 없음.");
//		}
//	}
//
//	@PostMapping("/pwFind")
//	public ResponseEntity<Boolean> pwFind(@RequestParam String id, @RequestParam String phone) {
//		User result = service.pwFind(id, phone);
//		if (result != null) {
//			return ResponseEntity.ok(true);
//		} else {
//			return ResponseEntity.ok(false);
//		}
//	}
//
//	@PostMapping("/updatePw")
//	public ResponseEntity<Boolean> updatePw(@RequestParam String id, @RequestParam String pw) {
//		System.out.println(pw);
//		boolean result = service.updatePw(id, pw);
//		if (result) {
//			return ResponseEntity.ok(true);
//		} else {
//			return ResponseEntity.ok(false);
//		}
//	}
//
//	@PostMapping("/sendAuth")
//	public ResponseEntity<Boolean> requestAuth(@RequestParam String id, @RequestParam Boolean requestAuth,
//			@RequestParam String institute) {
//		boolean isTrue = service.idCheck2(id);
//		if (isTrue) {
//			boolean result = service.requestAuth(id, institute, requestAuth);
//			if (result) {
//				return ResponseEntity.ok(true);
//			} else {
//				return ResponseEntity.ok(false);
//			}
//		} else {
//			return ResponseEntity.ok(false);
//		}
//	}
//}