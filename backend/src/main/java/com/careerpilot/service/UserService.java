package com.careerpilot.service;

import com.careerpilot.dto.request.UpdateUserRequest;
import com.careerpilot.dto.response.UserResponse;

public interface UserService {
    UserResponse getUserByEmail(String email);
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UpdateUserRequest request);
}
