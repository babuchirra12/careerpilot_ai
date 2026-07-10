package com.careerpilot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Job Details

    private String title;

    private String company;

    private String location;

    private String salary;

    @Column(name = "job_type")
    private String jobType;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // AI Recommendation Fields

    @Column(name = "match_score")
    private Integer matchScore;

    private String level;

    @Column(columnDefinition = "TEXT")
    private String tags;

    // Additional Job Details

    @Column(name = "apply_url")
    private String applyUrl;

    @Column(name = "company_logo")
    private String companyLogo;

    private String experience;

    @Column(name = "employment_type")
    private String employmentType;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(name = "posted_by")
    private String postedBy;

    /**
     * Convert comma-separated tags into List<String>
     * Example:
     * Java,Spring Boot,AWS,Docker
     */
    @Transient
    public List<String> getTagList() {

        if (tags == null || tags.isBlank()) {
            return List.of();
        }

        return Arrays.stream(tags.split(","))
                .map(String::trim)
                .toList();
    }

    /**
     * Convert comma-separated skills into List<String>
     * Example:
     * Java,Spring Boot,React,PostgreSQL
     */
    @Transient
    public List<String> getSkillList() {

        if (skills == null || skills.isBlank()) {
            return List.of();
        }

        return Arrays.stream(skills.split(","))
                .map(String::trim)
                .toList();
    }
}