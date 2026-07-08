package com.careerpilot.service.impl;

import com.careerpilot.dto.request.InterviewRequest;
import com.careerpilot.dto.response.InterviewResponse;
import com.careerpilot.entity.Interview;
import com.careerpilot.entity.User;
import com.careerpilot.repository.InterviewRepository;
import com.careerpilot.repository.UserRepository;
import com.careerpilot.service.InterviewService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;

    public InterviewServiceImpl(InterviewRepository interviewRepository,
                                UserRepository userRepository) {
        this.interviewRepository = interviewRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<InterviewResponse> getInterviewsByUser(Long userId) {
        return interviewRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public InterviewResponse getInterviewById(Long id, Long userId) {
        Interview interview = interviewRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        return toResponse(interview);
    }

    @Override
    public InterviewResponse createInterview(InterviewRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Interview interview = Interview.builder()
                .user(user)
                .jobTitle(request.getJobTitle())
                .company(request.getCompany())
                .questionsJson(request.getQuestionsJson())
                .status(request.getStatus() != null ? request.getStatus() : "PENDING")
                .score(request.getScore())
                .build();
        return toResponse(interviewRepository.save(interview));
    }

    @Override
    public InterviewResponse updateInterview(Long id, InterviewRequest request, Long userId) {
        Interview interview = interviewRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        if (request.getJobTitle() != null) interview.setJobTitle(request.getJobTitle());
        if (request.getCompany() != null) interview.setCompany(request.getCompany());
        if (request.getQuestionsJson() != null) interview.setQuestionsJson(request.getQuestionsJson());
        if (request.getStatus() != null) interview.setStatus(request.getStatus());
        if (request.getScore() != null) interview.setScore(request.getScore());
        return toResponse(interviewRepository.save(interview));
    }

    @Override
    public void deleteInterview(Long id, Long userId) {
        Interview interview = interviewRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        interviewRepository.delete(interview);
    }

    private InterviewResponse toResponse(Interview interview) {
        return InterviewResponse.builder()
                .id(interview.getId())
                .jobTitle(interview.getJobTitle())
                .company(interview.getCompany())
                .questionsJson(interview.getQuestionsJson())
                .status(interview.getStatus())
                .score(interview.getScore())
                .createdAt(interview.getCreatedAt())
                .updatedAt(interview.getUpdatedAt())
                .build();
    }
}
