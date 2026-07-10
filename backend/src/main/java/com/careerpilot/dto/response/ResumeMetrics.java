package com.careerpilot.dto;

import lombok.Data;

import java.util.List;

@Data
public class ResumeMetrics {

    private int atsScore;

    private int skillsScore;

    private int experienceScore;

    private int projectScore;

    private int formattingScore;

    private int grammarScore;

    private int educationScore;

    private int overallScore;

    private List<String> detectedSkills;

    private List<String> missingSkills;

}