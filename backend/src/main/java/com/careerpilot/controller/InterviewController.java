package com.careerpilot.controller;

import com.careerpilot.dto.request.InterviewRequest;
import com.careerpilot.dto.response.ApiResponse;
import com.careerpilot.dto.response.InterviewResponse;
import com.careerpilot.service.InterviewService;
import com.careerpilot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin(origins = "*")
public class InterviewController {

    private final InterviewService interviewService;
    private final UserService userService;

    public InterviewController(InterviewService interviewService, UserService userService) {
        this.interviewService = interviewService;
        this.userService = userService;
    }

    private Long currentUserId(Principal principal) {
        return userService.getUserByEmail(principal.getName()).getId();
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<InterviewResponse>>> getInterviews(Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok(interviewService.getInterviewsByUser(userId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InterviewResponse>> getInterview(
            @PathVariable Long id, Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok(interviewService.getInterviewById(id, userId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InterviewResponse>> createInterview(
            @RequestBody InterviewRequest request, Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok("Interview created",
                interviewService.createInterview(request, userId)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<InterviewResponse>> updateInterview(
            @PathVariable Long id,
            @RequestBody InterviewRequest request,
            Principal principal) {
        Long userId = currentUserId(principal);
        return ResponseEntity.ok(ApiResponse.ok("Interview updated",
                interviewService.updateInterview(id, request, userId)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteInterview(
            @PathVariable Long id, Principal principal) {
        Long userId = currentUserId(principal);
        interviewService.deleteInterview(id, userId);
        return ResponseEntity.ok(ApiResponse.ok("Interview deleted", null));
    }
}
