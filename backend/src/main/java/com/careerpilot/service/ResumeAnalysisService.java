package com.careerpilot.service;

import com.careerpilot.dto.request.ResumeAnalysisRequest;
import com.careerpilot.dto.response.ResumeAnalysisResult;

public interface ResumeAnalysisService {
    ResumeAnalysisResult analyze(ResumeAnalysisRequest request);
}
