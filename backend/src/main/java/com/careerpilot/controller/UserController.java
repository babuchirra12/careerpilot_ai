package com.careerpilot.controller;

import com.careerpilot.dto.request.UpdateUserRequest;
import com.careerpilot.dto.response.ApiResponse;
import com.careerpilot.dto.response.UserResponse;
import com.careerpilot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(Principal principal) {
        UserResponse user = userService.getUserByEmail(principal.getName());
        return ResponseEntity.ok(ApiResponse.ok(user));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            @RequestBody UpdateUserRequest request, Principal principal) {
        UserResponse current = userService.getUserByEmail(principal.getName());
        UserResponse updated = userService.updateUser(current.getId(), request);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", updated));
    }
}
