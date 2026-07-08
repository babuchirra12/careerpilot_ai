package com.careerpilot.service;

import com.careerpilot.dto.request.LoginRequest;
import com.careerpilot.dto.request.RegisterRequest;
import com.careerpilot.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}