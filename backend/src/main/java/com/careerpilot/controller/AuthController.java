package com.careerpilot.controller;

import com.careerpilot.dto.request.LoginRequest;
import com.careerpilot.dto.request.RegisterRequest;
import com.careerpilot.dto.response.AuthResponse;
import com.careerpilot.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        System.out.println("LOGIN API CALLED");
        System.out.println("Email: " + request.getEmail());

        return ResponseEntity.ok(authService.login(request));
    }
}