package com.careerpilot.service;

import com.careerpilot.dto.request.ResumeUploadRequest;
import com.careerpilot.dto.response.ResumeResponse;
import java.util.List;

public interface ResumeService {
    List<ResumeResponse> getResumesByUser(Long userId);
    ResumeResponse getResumeById(Long id, Long userId);
    ResumeResponse createResume(ResumeUploadRequest request, Long userId);
    ResumeResponse updateResume(Long id, ResumeUploadRequest request, Long userId);
    void deleteResume(Long id, Long userId);
}
