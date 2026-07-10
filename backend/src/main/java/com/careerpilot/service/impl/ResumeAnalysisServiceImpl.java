package com.careerpilot.service.impl;

import com.careerpilot.dto.request.ResumeAnalysisRequest;
import com.careerpilot.dto.response.ResumeAnalysisResult;
import com.careerpilot.dto.response.ResumeAnalysisResult.*;
import com.careerpilot.service.ResumeAnalysisService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

@Service
public class ResumeAnalysisServiceImpl implements ResumeAnalysisService {

    // ─── Skill dictionaries ───────────────────────────────────────────────────

    private static final List<String> TECH_SKILL_LIST = Arrays.asList(
        "java", "python", "javascript", "typescript", "kotlin", "scala", "go", "rust", "c++", "c#",
        "spring", "spring boot", "spring mvc", "hibernate", "jpa", "mybatis",
        "react", "angular", "vue", "next.js", "nuxt", "svelte",
        "node.js", "express", "fastapi", "django", "flask",
        "postgresql", "mysql", "sqlite", "mongodb", "cassandra", "redis", "elasticsearch",
        "docker", "kubernetes", "jenkins", "github actions", "gitlab ci", "circleci",
        "aws", "azure", "gcp", "terraform", "ansible",
        "rest api", "graphql", "grpc", "soap", "websocket",
        "microservices", "event-driven", "kafka", "rabbitmq",
        "git", "maven", "gradle", "npm", "yarn",
        "html", "css", "sass", "tailwind", "bootstrap",
        "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
        "linux", "bash", "powershell",
        "junit", "mockito", "selenium", "cypress", "jest",
        "nginx", "apache", "tomcat",
        "oauth", "jwt", "spring security",
        "pandas", "numpy", "spark", "hadoop"
    );

    private static final List<String> SOFT_SKILL_LIST = Arrays.asList(
        "communication", "leadership", "teamwork", "collaboration", "problem-solving",
        "critical thinking", "time management", "adaptability", "creativity", "mentoring",
        "project management", "agile", "scrum", "kanban", "cross-functional",
        "stakeholder management", "negotiation", "presentation", "analytical"
    );

    private static final List<String> STRONG_ACTION_VERBS = Arrays.asList(
        "developed", "implemented", "designed", "architected", "built", "created",
        "optimized", "improved", "reduced", "increased", "automated", "deployed",
        "led", "managed", "delivered", "launched", "migrated", "integrated",
        "engineered", "established", "transformed", "streamlined", "spearheaded",
        "coordinated", "mentored", "trained", "analyzed", "evaluated", "diagnosed",
        "refactored", "scaled", "secured", "monitored", "orchestrated", "owned"
    );

    private static final List<String> WEAK_VERBS = Arrays.asList(
        "worked on", "helped with", "was responsible for", "assisted",
        "participated", "involved in", "did", "made"
    );

    private static final Map<String, List<String>> ROLE_KEYWORD_MAP = new LinkedHashMap<>();

    static {
        ROLE_KEYWORD_MAP.put("java developer", Arrays.asList(
            "java", "spring boot", "spring", "jpa", "hibernate", "rest api",
            "maven", "junit", "docker", "postgresql", "microservices", "git", "jenkins"
        ));
        ROLE_KEYWORD_MAP.put("full stack developer", Arrays.asList(
            "react", "node.js", "java", "spring boot", "postgresql", "docker",
            "rest api", "typescript", "html", "css", "git", "mongodb", "aws"
        ));
        ROLE_KEYWORD_MAP.put("backend developer", Arrays.asList(
            "java", "python", "spring boot", "rest api", "postgresql", "docker",
            "microservices", "kafka", "redis", "git", "aws", "kubernetes"
        ));
        ROLE_KEYWORD_MAP.put("frontend developer", Arrays.asList(
            "react", "typescript", "javascript", "html", "css", "tailwind", "next.js",
            "redux", "webpack", "jest", "git", "responsive design", "accessibility"
        ));
        ROLE_KEYWORD_MAP.put("data scientist", Arrays.asList(
            "python", "machine learning", "deep learning", "pandas", "numpy",
            "scikit-learn", "tensorflow", "sql", "statistics", "visualization",
            "jupyter", "spark", "analytics"
        ));
        ROLE_KEYWORD_MAP.put("devops engineer", Arrays.asList(
            "docker", "kubernetes", "jenkins", "terraform", "ansible", "aws",
            "azure", "github actions", "linux", "bash", "monitoring",
            "prometheus", "grafana", "ci/cd"
        ));
        ROLE_KEYWORD_MAP.put("product manager", Arrays.asList(
            "product strategy", "roadmap", "agile", "scrum", "stakeholder",
            "user research", "analytics", "a/b testing", "jira", "confluence",
            "kpi", "mvp", "cross-functional"
        ));
        ROLE_KEYWORD_MAP.put("software engineer", Arrays.asList(
            "java", "python", "data structures", "algorithms", "rest api",
            "docker", "git", "agile", "sql", "testing", "ci/cd", "microservices"
        ));
    }

    private static final List<String> SECTION_HEADERS = Arrays.asList(
        "summary", "objective", "experience", "work experience", "employment",
        "projects", "education", "skills", "certifications", "awards",
        "publications", "contact", "languages", "profile"
    );

    // ─── Main method ─────────────────────────────────────────────────────────

    @Override
    public ResumeAnalysisResult analyze(ResumeAnalysisRequest request) {
        String original = request.getResumeText() != null ? request.getResumeText() : "";
        String text = original.toLowerCase();
        String targetRole = request.getTargetRole() != null
                ? request.getTargetRole().toLowerCase().trim() : "software engineer";

        // 1. Detect sections present
        Map<String, Boolean> sections = detectSections(text);

        // 2. Detect skills
        List<String> techSkills = detectSkillsFrom(text, TECH_SKILL_LIST);
        List<String> softSkills = detectSkillsFrom(text, SOFT_SKILL_LIST);
        List<String> missingSkills = detectMissingSkills(text, targetRole);

        // 3. Score each resume section
        List<SectionScore> sectionScores = scoreSections(text, sections, techSkills);

        // 4. Keyword analysis against target role
        KeywordsData keywords = analyzeKeywords(text, targetRole);

        // 5. Experience analysis
        ExperienceData experience = analyzeExperience(original);

        // 6. Project extraction
        List<ProjectData> projects = extractProjects(original, text, techSkills);

        // 7. Formatting analysis
        FormattingData formatting = analyzeFormatting(original, sections);

        // 8. Grammar & language quality
        GrammarData grammar = analyzeGrammar(text);

        // 9. Action verbs
        ActionVerbsData actionVerbs = analyzeActionVerbs(text);

        // 10. Missing critical info
        List<String> missingInfo = findMissingInfo(text);

        // 11. ATS score
        int atsScore = computeAtsScore(text, sections, keywords.getMatchScore());
        List<String> atsFeedback = buildAtsFeedback(text, sections, atsScore);

        // 12. Weighted overall score
        //     ATS 25% | Skills 20% | Experience 20% | Projects 15% | Formatting 10% | Grammar 5% | Education 5%
        int skillScore = Math.min(100, techSkills.size() * 6 + softSkills.size() * 4);
        int expScore = computeExpScore(experience);
        int projScore = projects.isEmpty() ? 45 : Math.min(100, projects.size() * 22 + 45);
        int fmtScore = formatting.getScore() * 10;
        int gramScore = grammar.getGrammarScore();
        int eduScore = sections.getOrDefault("education", false) ? 85 : 45;

        int overallScore = clamp((int) Math.round(
                atsScore  * 0.25 +
                skillScore * 0.20 +
                expScore   * 0.20 +
                projScore  * 0.15 +
                fmtScore   * 0.10 +
                gramScore  * 0.05 +
                eduScore   * 0.05
        ), 0, 100);

        // 13. Recruiter readiness
        RecruiterReadiness recruiterReadiness =
                buildRecruiterReadiness(overallScore, atsScore, targetRole, missingInfo);

        return ResumeAnalysisResult.builder()
                .overallScore(overallScore)
                .atsScore(atsScore)
                .atsFeedback(atsFeedback)
                .sections(sectionScores)
                .skills(SkillsData.builder()
                        .technical(capitalize(techSkills))
                        .soft(capitalize(softSkills))
                        .missing(capitalize(missingSkills))
                        .build())
                .keywords(keywords)
                .experience(experience)
                .projects(projects)
                .formatting(formatting)
                .grammar(grammar)
                .actionVerbs(actionVerbs)
                .missingInfo(missingInfo)
                .recruiterReadiness(recruiterReadiness)
                .build();
    }

    // ─── Section detection ────────────────────────────────────────────────────

    private Map<String, Boolean> detectSections(String text) {
        Map<String, Boolean> map = new LinkedHashMap<>();
        for (String header : SECTION_HEADERS) {
            map.put(header, text.contains(header));
        }
        return map;
    }

    // ─── Skills detection ─────────────────────────────────────────────────────

    private List<String> detectSkillsFrom(String text, List<String> skillList) {
        return skillList.stream()
                .filter(skill -> text.contains(skill.toLowerCase()))
                .limit(14)
                .collect(Collectors.toList());
    }

    private List<String> detectMissingSkills(String text, String targetRole) {
        String roleKey = resolveRoleKey(targetRole);
        List<String> roleKeywords = ROLE_KEYWORD_MAP.getOrDefault(roleKey,
                ROLE_KEYWORD_MAP.get("software engineer"));
        return roleKeywords.stream()
                .filter(kw -> !text.contains(kw.toLowerCase()))
                .limit(8)
                .collect(Collectors.toList());
    }

    // ─── Section scores ───────────────────────────────────────────────────────

    private List<SectionScore> scoreSections(String text, Map<String, Boolean> sections,
                                              List<String> techSkills) {
        List<SectionScore> result = new ArrayList<>();

        // Contact Information
        int contact = 0;
        if (text.matches("(?s).*[\\w._%+\\-]+@[\\w.\\-]+\\.[a-z]{2,}.*")) contact += 4;
        if (text.contains("phone") || text.contains("+") || countMatches(text, "\\b\\d{10}\\b") > 0) contact += 2;
        if (text.contains("linkedin")) contact += 2;
        if (text.contains("github") || text.contains("gitlab")) contact += 1;
        if (text.contains("portfolio") || text.contains("website")) contact += 1;
        result.add(sectionScore("Contact Information", Math.min(10, contact), 10));

        // Professional Summary
        boolean hasSummary = sections.getOrDefault("summary", false)
                || sections.getOrDefault("objective", false)
                || sections.getOrDefault("profile", false);
        result.add(sectionScore("Professional Summary", hasSummary ? 8 : 4, 10));

        // Skills
        int skillSec = 0;
        if (sections.getOrDefault("skills", false)) skillSec += 3;
        skillSec += Math.min(7, techSkills.size());
        result.add(sectionScore("Skills", Math.min(10, skillSec), 10));

        // Education
        int edu = sections.getOrDefault("education", false) ? 7 : 3;
        if (text.contains("bachelor") || text.contains("master") || text.contains("phd")
                || text.contains("b.e") || text.contains("b.tech") || text.contains("m.tech")) {
            edu = Math.min(10, edu + 2);
        }
        result.add(sectionScore("Education", edu, 10));

        // Experience
        int exp = (sections.getOrDefault("experience", false)
                || sections.getOrDefault("work experience", false)) ? 6 : 3;
        long actionHits = STRONG_ACTION_VERBS.stream().filter(text::contains).count();
        exp = Math.min(10, exp + (actionHits > 5 ? 3 : actionHits > 2 ? 2 : actionHits > 0 ? 1 : 0));
        result.add(sectionScore("Experience", exp, 10));

        // Projects
        int proj = sections.getOrDefault("projects", false) ? 8 : 4;
        result.add(sectionScore("Projects", proj, 10));

        // Certifications
        int cert = (text.contains("certif") || sections.getOrDefault("certifications", false)) ? 8 : 4;
        result.add(sectionScore("Certifications", cert, 10));

        // Formatting
        int fmt = computeFormattingSection(text);
        result.add(sectionScore("Formatting", fmt, 10));

        return result;
    }

    private int computeFormattingSection(String text) {
        int score = 10;
        int words = text.split("\\s+").length;
        if (words < 150) score -= 3;
        else if (words > 1100) score -= 1;
        if (!text.contains("•") && !text.contains("-") && !text.contains("*")) score -= 1;
        return Math.max(4, score);
    }

    private SectionScore sectionScore(String name, int score, int max) {
        return SectionScore.builder().name(name).score(score).maxScore(max).build();
    }

    // ─── Keyword analysis ─────────────────────────────────────────────────────

    private KeywordsData analyzeKeywords(String text, String targetRole) {
        String roleKey = resolveRoleKey(targetRole);
        List<String> roleKeywords = ROLE_KEYWORD_MAP.getOrDefault(roleKey,
                ROLE_KEYWORD_MAP.get("software engineer"));
        long found = roleKeywords.stream()
                .filter(kw -> text.contains(kw.toLowerCase())).count();
        int total = roleKeywords.size();
        int missing = (int) (total - found);
        int matchScore = (int) Math.round(found * 100.0 / total);
        return KeywordsData.builder()
                .found((int) found)
                .missing(missing)
                .matchScore(matchScore)
                .build();
    }

    // ─── Experience analysis ──────────────────────────────────────────────────

    private ExperienceData analyzeExperience(String text) {
        Pattern yearRange = Pattern.compile(
                "(20\\d{2})\\s*[-–]\\s*(20\\d{2}|present|current|now)",
                Pattern.CASE_INSENSITIVE);
        Matcher m = yearRange.matcher(text);
        int totalMonths = 0;
        while (m.find()) {
            int startYear = Integer.parseInt(m.group(1));
            String endRaw = m.group(2).toLowerCase();
            int endYear = (endRaw.equals("present") || endRaw.equals("current") || endRaw.equals("now"))
                    ? 2025 : Integer.parseInt(endRaw);
            totalMonths += Math.max(0, (endYear - startYear) * 12);
        }

        String totalYears;
        if (totalMonths == 0) {
            totalYears = "Not specified";
        } else {
            double yrs = totalMonths / 12.0;
            totalYears = String.format("%.1f year%s", yrs, yrs == 1.0 ? "" : "s");
        }

        List<String> feedback = new ArrayList<>();
        if (totalMonths > 48) {
            feedback.add("Strong work history with " + totalYears + " of experience detected");
        } else if (totalMonths > 0) {
            feedback.add(totalYears + " of professional experience detected");
        } else {
            feedback.add("Add clear employment dates (e.g., 2021 – 2023)");
        }

        long quantified = countMatches(text.toLowerCase(),
                "\\d+%|\\d+ million|\\d+ billion|\\d+x |increased by \\d|reduced by \\d|saved \\$");
        if (quantified > 2) {
            feedback.add("Good use of quantified achievements with measurable impact");
        } else {
            feedback.add("Add more measurable achievements (e.g., improved efficiency by 30%)");
        }

        long actionHits = STRONG_ACTION_VERBS.stream()
                .filter(v -> text.toLowerCase().contains(v)).count();
        if (actionHits > 5) {
            feedback.add("Strong action verbs used effectively throughout");
        } else if (actionHits > 2) {
            feedback.add("Good action verbs; consider adding more impactful ones");
        } else {
            feedback.add("Use strong action verbs to begin each bullet point");
        }

        return ExperienceData.builder()
                .totalYears(totalYears)
                .feedback(feedback)
                .build();
    }

    private int computeExpScore(ExperienceData exp) {
        String years = exp.getTotalYears();
        if ("Not specified".equals(years)) return 50;
        try {
            double y = Double.parseDouble(years.replaceAll("[^0-9.]", "").trim());
            if (y >= 6) return 95;
            if (y >= 3) return 85;
            if (y >= 1) return 70;
            return 55;
        } catch (NumberFormatException e) {
            return 60;
        }
    }

    // ─── Project extraction ───────────────────────────────────────────────────

    private List<ProjectData> extractProjects(String original, String text, List<String> techSkills) {
        List<ProjectData> result = new ArrayList<>();

        // Look for titled project entries (capitalized lines that aren't section headers)
        Pattern titleLine = Pattern.compile("(?m)^\\s*([A-Z][A-Za-z0-9\\s]{3,45})\\s*$");
        Matcher m = titleLine.matcher(original);
        Set<String> seen = new HashSet<>();
        List<String> candidates = new ArrayList<>();

        while (m.find() && candidates.size() < 5) {
            String name = m.group(1).trim();
            String lower = name.toLowerCase();
            if (name.length() >= 4 && name.length() <= 45
                    && !seen.contains(lower)
                    && !SECTION_HEADERS.contains(lower)
                    && !lower.matches(".*\\b(experience|education|skills|contact|summary|certification)\\b.*")) {
                seen.add(lower);
                candidates.add(name);
            }
        }

        // Fallback: if projects section present but no titles found
        if (candidates.isEmpty() && text.contains("project")) {
            candidates.add("Main Project");
        }

        List<String> stackSlice = capitalize(techSkills.stream().limit(4).collect(Collectors.toList()));
        int[] starValues = {5, 4, 3};

        for (int i = 0; i < Math.min(candidates.size(), 3); i++) {
            List<String> feedback = new ArrayList<>();
            if (text.contains("architect") || text.contains("design") || text.contains("built")) {
                feedback.add("Architecture and design approach clearly stated");
            }
            feedback.add("Include quantified performance metrics for more impact");
            if (!text.contains("github") && !text.contains("link") && !text.contains("url")) {
                feedback.add("Add a live link or GitHub repository URL");
            }
            result.add(ProjectData.builder()
                    .name(candidates.get(i))
                    .stars(starValues[i])
                    .techStack(stackSlice)
                    .feedback(feedback)
                    .build());
        }

        return result;
    }

    // ─── Formatting analysis ──────────────────────────────────────────────────

    private FormattingData analyzeFormatting(String text, Map<String, Boolean> sections) {
        List<String> suggestions = new ArrayList<>();
        int score = 10;

        int wordCount = text.split("\\s+").length;
        int lineCount = text.split("\n").length;

        if (wordCount < 150) {
            suggestions.add("Resume is too short — aim for 300–700 words for best readability");
            score -= 2;
        } else if (wordCount > 1100) {
            suggestions.add("Resume may be too lengthy — keep to 1–2 pages");
            score -= 1;
        }

        if (!sections.getOrDefault("summary", false) && !sections.getOrDefault("objective", false)
                && !sections.getOrDefault("profile", false)) {
            suggestions.add("Add a professional summary section at the top");
            score -= 1;
        }

        if (!text.contains("•") && !text.contains("-") && !text.contains("*")) {
            suggestions.add("Use bullet points in experience and skills sections for readability");
            score -= 1;
        }

        long blankLines = Arrays.stream(text.split("\n"))
                .filter(String::isBlank).count();
        if (lineCount > 0 && blankLines > lineCount * 0.35) {
            suggestions.add("Reduce excessive whitespace between sections");
            score -= 1;
        }

        if (suggestions.isEmpty()) {
            suggestions.add("Formatting looks clean and professional");
        }

        return FormattingData.builder()
                .score(Math.max(4, score))
                .suggestions(suggestions)
                .build();
    }

    // ─── Grammar analysis ─────────────────────────────────────────────────────

    private GrammarData analyzeGrammar(String text) {
        long weakCount = WEAK_VERBS.stream()
                .filter(v -> text.contains(v.toLowerCase())).count();
        long passiveCount = countMatches(text, "\\bwas\\b|\\bwere\\b|\\bhave been\\b|\\bhas been\\b");
        long actionCount = STRONG_ACTION_VERBS.stream()
                .filter(v -> text.contains(v.toLowerCase())).count();

        int grammarScore = clamp(95 - (int)(weakCount * 3) - (int)(passiveCount > 6 ? 5 : 0), 70, 100);
        int spellingScore = 97; // text-based heuristic; no spell-checker available
        int readabilityScore = clamp((int)(70 + actionCount * 3 - weakCount * 2), 60, 100);

        return GrammarData.builder()
                .grammarScore(grammarScore)
                .spellingScore(spellingScore)
                .readabilityScore(readabilityScore)
                .build();
    }

    // ─── Action verbs ─────────────────────────────────────────────────────────

    private ActionVerbsData analyzeActionVerbs(String text) {
        List<String> found = STRONG_ACTION_VERBS.stream()
                .filter(text::contains)
                .map(this::toTitleCase)
                .limit(10)
                .collect(Collectors.toList());

        List<String> suggestions = new ArrayList<>();
        if (text.contains("worked on"))
            suggestions.add("Replace 'Worked on' → 'Developed' or 'Built'");
        if (text.contains("helped"))
            suggestions.add("Replace 'Helped' → 'Contributed' or 'Supported'");
        if (text.contains("was responsible for"))
            suggestions.add("Replace 'Was responsible for' → 'Managed' or 'Owned'");
        if (text.contains("assisted"))
            suggestions.add("Replace 'Assisted' → 'Collaborated' or 'Co-developed'");
        if (found.isEmpty())
            suggestions.add("Start every bullet with a strong verb: Developed, Implemented, Optimized");

        if (suggestions.isEmpty())
            suggestions.add("Action verbs are well-used — strong and consistent throughout");

        return ActionVerbsData.builder().good(found).suggestions(suggestions).build();
    }

    // ─── Missing info ─────────────────────────────────────────────────────────

    private List<String> findMissingInfo(String text) {
        List<String> missing = new ArrayList<>();
        if (!text.contains("linkedin"))
            missing.add("LinkedIn profile URL");
        if (!text.contains("github") && !text.contains("gitlab"))
            missing.add("GitHub or GitLab profile link");
        if (!text.contains("portfolio") && !text.contains("website"))
            missing.add("Portfolio or personal website");
        if (!text.contains("certif"))
            missing.add("Certifications (e.g., AWS, Oracle, Google Cloud)");
        if (countMatches(text, "\\d+%|\\d+x |\\$\\d+") == 0)
            missing.add("Quantified achievements (e.g., improved performance by 35%)");
        return missing;
    }

    // ─── ATS score ────────────────────────────────────────────────────────────

    private int computeAtsScore(String text, Map<String, Boolean> sections, int keywordMatchPct) {
        int score = 0;

        // Standard section headings detected (up to 30 pts)
        long sectionHits = sections.values().stream().filter(Boolean::booleanValue).count();
        score += (int) Math.min(30, sectionHits * 5);

        // Keyword match contribution (up to 25 pts)
        score += (int)(keywordMatchPct * 0.25);

        // Email present (+15)
        if (text.matches("(?s).*[\\w._%+\\-]+@[\\w.\\-]+\\.[a-z]{2,}.*")) score += 15;

        // Phone present (+8)
        if (countMatches(text, "\\b\\d{10}\\b") > 0 || text.contains("+")) score += 8;

        // No images or tables (text resume always passes, +10)
        score += 10;

        // Experience and skills sections present (+12)
        if (sections.getOrDefault("experience", false)
                || sections.getOrDefault("work experience", false)) score += 6;
        if (sections.getOrDefault("skills", false)) score += 6;

        return clamp(score, 0, 100);
    }

    private List<String> buildAtsFeedback(String text, Map<String, Boolean> sections, int atsScore) {
        List<String> feedback = new ArrayList<>();
        if (sections.getOrDefault("skills", false))
            feedback.add("Skills section uses a standard heading — easy to parse");
        if (sections.getOrDefault("experience", false) || sections.getOrDefault("work experience", false))
            feedback.add("Work experience section detected with standard heading");
        if (text.matches("(?s).*[\\w._%+\\-]+@[\\w.\\-]+\\.[a-z]{2,}.*"))
            feedback.add("Email address is present and parseable by ATS");
        if (text.contains("linkedin"))
            feedback.add("LinkedIn URL included — improves recruiter verification");
        feedback.add("Plain text format — no images or tables affecting ATS parsing");
        if (atsScore >= 80)
            feedback.add("Resume is well-optimised for ATS scanning");
        else
            feedback.add("Use standard section headings to further improve ATS compatibility");
        return feedback;
    }

    // ─── Recruiter readiness ──────────────────────────────────────────────────

    private RecruiterReadiness buildRecruiterReadiness(int overallScore, int atsScore,
                                                        String targetRole, List<String> missingInfo) {
        boolean interviewReady = overallScore >= 72 && atsScore >= 68 && missingInfo.size() <= 3;
        double appeal = Math.round((overallScore / 10.0) * 10.0) / 10.0;
        boolean atsFriendly = atsScore >= 72;

        List<String> roles = resolveRecommendedRoles(targetRole);

        return RecruiterReadiness.builder()
                .interviewReady(interviewReady)
                .recruiterAppeal(Math.min(10.0, appeal))
                .atsFriendly(atsFriendly)
                .recommendedRoles(roles)
                .build();
    }

    private List<String> resolveRecommendedRoles(String targetRole) {
        if (targetRole.contains("java") || targetRole.contains("backend"))
            return Arrays.asList("Java Developer", "Backend Engineer", "Software Engineer");
        if (targetRole.contains("full stack"))
            return Arrays.asList("Full Stack Developer", "Software Engineer", "Java Developer");
        if (targetRole.contains("frontend") || targetRole.contains("front end"))
            return Arrays.asList("Frontend Developer", "React Developer", "UI Engineer");
        if (targetRole.contains("data scientist") || targetRole.contains("ml"))
            return Arrays.asList("Data Scientist", "ML Engineer", "Data Analyst");
        if (targetRole.contains("devops") || targetRole.contains("cloud"))
            return Arrays.asList("DevOps Engineer", "Cloud Engineer", "SRE");
        if (targetRole.contains("product"))
            return Arrays.asList("Product Manager", "Associate PM", "Technical PM");
        return Arrays.asList("Software Engineer", "Java Developer", "Full Stack Developer");
    }

    // ─── Utilities ────────────────────────────────────────────────────────────

    private String resolveRoleKey(String targetRole) {
        return ROLE_KEYWORD_MAP.keySet().stream()
                .filter(targetRole::contains)
                .findFirst()
                .orElse("software engineer");
    }

    private long countMatches(String text, String regex) {
        Matcher m = Pattern.compile(regex, Pattern.CASE_INSENSITIVE).matcher(text);
        long count = 0;
        while (m.find()) count++;
        return count;
    }

    private List<String> capitalize(List<String> list) {
        return list.stream().map(this::toTitleCase).collect(Collectors.toList());
    }

    private String toTitleCase(String s) {
        if (s == null || s.isBlank()) return s;
        return Arrays.stream(s.split(" "))
                .filter(w -> !w.isEmpty())
                .map(w -> Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase())
                .collect(Collectors.joining(" "));
    }

    private int clamp(int value, int min, int max) {
        return Math.min(max, Math.max(min, value));
    }
}
