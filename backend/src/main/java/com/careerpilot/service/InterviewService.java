package com.careerpilot.service;

import com.careerpilot.dto.request.InterviewRequest;
import com.careerpilot.dto.response.InterviewResponse;

import java.util.List;

public interface InterviewService {
    List<InterviewResponse> getInterviewsByUser(Long userId);
    InterviewResponse getInterviewById(Long id, Long userId);
    InterviewResponse createInterview(InterviewRequest request, Long userId);
    InterviewResponse updateInterview(Long id, InterviewRequest request, Long userId);
    void deleteInterview(Long id, Long userId);
}
