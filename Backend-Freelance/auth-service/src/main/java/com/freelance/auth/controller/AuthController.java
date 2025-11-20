//package com.freelance.auth.controller;
//
//import com.freelance.auth.config.JwtUtil;
//import com.freelance.auth.entity.User;
//import com.freelance.auth.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired private UserRepository userRepo;
//    @Autowired private PasswordEncoder encoder;
//    @Autowired private JwtUtil jwtUtil;
//
//    @PostMapping("/register")
//    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
//        if (userRepo.findByEmail(req.email()).isPresent()) {
//            return ResponseEntity.badRequest().body("Email already exists");
//        }
//        User user = new User();
//        user.setName(req.name());
//        user.setEmail(req.email());
//        user.setPassword(encoder.encode(req.password()));
//        user.setRole(req.role());
//        userRepo.save(user);
//        return ResponseEntity.ok(new RegisterResponse("User registered successfully.", user.getId()));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
//        User user = userRepo.findByEmail(req.email())
//                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
//        if (!encoder.matches(req.password(), user.getPassword())) {
//            return ResponseEntity.badRequest().body("Invalid credentials");
//        }
//        String token = jwtUtil.generateToken(user.getId(), user.getRole(), user.getName());
//        return ResponseEntity.ok(new LoginResponse(token));
//    }
//}
//
//record RegisterRequest(String name, String email, String password, String role) {}
//record LoginRequest(String email, String password) {}
//record RegisterResponse(String message, Long userId) {}
//record LoginResponse(String token) {}


package com.freelance.auth.controller;

import com.freelance.auth.config.JwtUtil;
import com.freelance.auth.entity.User;
import com.freelance.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder encoder;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepo.findByEmail(req.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setPassword(encoder.encode(req.password()));
        user.setRole(req.role());
        userRepo.save(user);
        return ResponseEntity.ok(new RegisterResponse("User registered successfully.", user.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User user = userRepo.findByEmail(req.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.password(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        // Generate JWT
        String token = jwtUtil.generateToken(user.getId(), user.getRole(), user.getName());

        // Send token + role + id + name + email
        return ResponseEntity.ok(
                new LoginResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        token
                )
        );
    }
    @GetMapping("/profile/{id}")
    public ResponseEntity<String> getProfileName(@PathVariable Long id) {
        String name= userRepo.findById(id)
                .map(User::getName)
                .orElse("Unknown");
        
        return ResponseEntity.ok(name);
       
    }

}

record RegisterRequest(String name, String email, String password, String role) {}
record LoginRequest(String email, String password) {}
record RegisterResponse(String message, Long userId) {}

// Updated LoginResponse → contains token + useful frontend info
record LoginResponse(Long userId, String name, String email, String role, String token) {}
