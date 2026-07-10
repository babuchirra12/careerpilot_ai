package com.careerpilot.service.impl;

import com.careerpilot.entity.Job;
import com.careerpilot.repository.JobRepository;
import com.careerpilot.service.JobService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    @Override
    public Job createJob(Job job) {

        if (job.getCreatedAt() == null) {
            job.setCreatedAt(LocalDateTime.now());
        }

        if (job.getStatus() == null || job.getStatus().isBlank()) {
            job.setStatus("ACTIVE");
        }

        if (job.getMatchScore() == null) {
            job.setMatchScore(0);
        }

        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Long id, Job job) {

        Job existing = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Basic Details
        existing.setTitle(job.getTitle());
        existing.setCompany(job.getCompany());
        existing.setLocation(job.getLocation());
        existing.setSalary(job.getSalary());
        existing.setJobType(job.getJobType());
        existing.setDescription(job.getDescription());
        existing.setStatus(job.getStatus());

        // AI Recommendation
        existing.setMatchScore(job.getMatchScore());
        existing.setLevel(job.getLevel());
        existing.setTags(job.getTags());

        // Additional Details
        existing.setApplyUrl(job.getApplyUrl());
        existing.setCompanyLogo(job.getCompanyLogo());
        existing.setExperience(job.getExperience());
        existing.setEmploymentType(job.getEmploymentType());
        existing.setSkills(job.getSkills());
        existing.setPostedBy(job.getPostedBy());

        return jobRepository.save(existing);
    }

    @Override
    public void deleteJob(Long id) {

        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job not found");
        }

        jobRepository.deleteById(id);
    }

    @Override
    public List<Job> searchJobs(String keyword) {

        if (keyword == null || keyword.trim().isEmpty()) {
            return jobRepository.findAll();
        }

        return jobRepository.searchJobs(keyword.trim());
    }

    @Override
    public List<Job> getActiveJobs() {
        return jobRepository.findByStatus("ACTIVE");
    }

    @Override
    public List<Job> getJobsByCompany(String company) {
        return jobRepository.findByCompanyIgnoreCase(company);
    }

    @Override
    public List<Job> getJobsByLocation(String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    @Override
    public List<Job> getJobsByJobType(String jobType) {
        return jobRepository.findByJobTypeIgnoreCase(jobType);
    }
}