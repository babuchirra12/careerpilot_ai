package com.careerpilot.service.impl;

import com.careerpilot.dto.request.ResumeUploadRequest;
import com.careerpilot.dto.response.ResumeResponse;
import com.careerpilot.entity.Resume;
import com.careerpilot.entity.User;
import com.careerpilot.repository.ResumeRepository;
import com.careerpilot.repository.UserRepository;
import com.careerpilot.service.ResumeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeServiceImpl(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ResumeResponse> getResumesByUser(Long userId) {
        return resumeRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ResumeResponse getResumeById(Long id, Long userId) {
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        return toResponse(resume);
    }

    @Override
    public ResumeResponse createResume(ResumeUploadRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Resume resume = Resume.builder()
                .user(user)
                .title(request.getTitle())
                .contentJson(request.getContentJson())
                .status(request.getStatus() != null ? request.getStatus() : "draft")
                .build();
        return toResponse(resumeRepository.save(resume));
    }

    @Override
    public ResumeResponse updateResume(Long id, ResumeUploadRequest request, Long userId) {
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        if (request.getTitle() != null) resume.setTitle(request.getTitle());
        if (request.getContentJson() != null) resume.setContentJson(request.getContentJson());
        if (request.getStatus() != null) resume.setStatus(request.getStatus());
        return toResponse(resumeRepository.save(resume));
    }

    @Override
    public void deleteResume(Long id, Long userId) {
        Resume resume = resumeRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        resumeRepository.delete(resume);
    }

    private ResumeResponse toResponse(Resume resume) {
        return ResumeResponse.builder()
                .id(resume.getId())
                .title(resume.getTitle())
                .contentJson(resume.getContentJson())
                .status(resume.getStatus())
                .createdAt(resume.getCreatedAt())
                .updatedAt(resume.getUpdatedAt())
                .build();
    }
}
