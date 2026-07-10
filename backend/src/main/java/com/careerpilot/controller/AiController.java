package com.careerpilot.controller;

import com.careerpilot.dto.request.ResumeAnalysisRequest;
import com.careerpilot.dto.response.ResumeAnalysisResult;
import com.careerpilot.service.ResumeAnalysisService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AiController {

    private final ResumeAnalysisService resumeAnalysisService;

    public AiController(ResumeAnalysisService resumeAnalysisService) {
        this.resumeAnalysisService = resumeAnalysisService;
    }

    @PostMapping("/resume/analyze")
    public Map<String, ResumeAnalysisResult> analyzeResume(
            @RequestBody ResumeAnalysisRequest request) {
        ResumeAnalysisResult result = resumeAnalysisService.analyze(request);
        return Map.of("analysis", result);
    }
}

