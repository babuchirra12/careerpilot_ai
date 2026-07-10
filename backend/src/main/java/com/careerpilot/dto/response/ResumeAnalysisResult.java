package com.careerpilot.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeAnalysisResult {

    private int overallScore;
    private int atsScore;
    private List<String> atsFeedback;
    private List<SectionScore> sections;
    private SkillsData skills;
    private KeywordsData keywords;
    private ExperienceData experience;
    private List<ProjectData> projects;
    private FormattingData formatting;
    private GrammarData grammar;
    private ActionVerbsData actionVerbs;
    private List<String> missingInfo;
    private RecruiterReadiness recruiterReadiness;

    // ── Nested DTOs ──────────────────────────────────────────────────────────

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SectionScore {
        private String name;
        private int score;
        private int maxScore;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SkillsData {
        private List<String> technical;
        private List<String> soft;
        private List<String> missing;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class KeywordsData {
        private int found;
        private int missing;
        private int matchScore;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ExperienceData {
        private String totalYears;
        private List<String> feedback;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProjectData {
        private String name;
        private int stars;
        private List<String> techStack;
        private List<String> feedback;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FormattingData {
        private int score;
        private List<String> suggestions;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GrammarData {
        private int grammarScore;
        private int spellingScore;
        private int readabilityScore;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActionVerbsData {
        private List<String> good;
        private List<String> suggestions;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecruiterReadiness {
        private boolean interviewReady;
        private double recruiterAppeal;
        private boolean atsFriendly;
        private List<String> recommendedRoles;
    }
}
