package com.careerpilot.dto.request;

import lombok.Data;

@Data
public class ResumeAnalysisRequest {

    private String resumeText;
    private String targetRole;
    private String jobDescription;

}