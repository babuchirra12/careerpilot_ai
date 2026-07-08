package com.careerpilot.controller;

import com.careerpilot.dto.request.ResumeUploadRequest;
import com.careerpilot.dto.response.ApiResponse;
import com.careerpilot.dto.response.ResumeResponse;
import com.careerpilot.service.ResumeService;
import com.careerpilot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;
    private final UserService userService;

    public ResumeController(ResumeService resumeService, UserService userService) {
        this.resumeService = resumeService;
        this.userService = userService;
    }

    private Long currentUserId(Principal principal) {
        return userService.getUserByEmail(principal.getName()).getId();
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ResumeResponse>>> getResumes(Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok(resumeService.getResumesByUser(userId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeResponse>> getResume(
            @PathVariable Long id, Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok(resumeService.getResumeById(id, userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ResumeResponse>> createResume(
            @RequestBody ResumeUploadRequest request, Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok("Resume created",
                resumeService.createResume(request, userId)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ResumeResponse>> updateResume(
            @PathVariable Long id,
            @RequestBody ResumeUploadRequest request,
            Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok("Resume updated",
                resumeService.updateResume(id, request, userId)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteResume(
            @PathVariable Long id, Principal principal) {
        Long userId = currentUserId(principal);
        resumeService.deleteResume(id, userId);
        return ResponseEntity.ok(ApiResponse.ok("Resume deleted", null));
    }
}
