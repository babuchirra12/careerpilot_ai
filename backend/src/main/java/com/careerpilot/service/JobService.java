package com.careerpilot.service;

import com.careerpilot.entity.Job;

import java.util.List;
import java.util.Optional;

public interface JobService {

    // Get all jobs
    List<Job> getAllJobs();

    // Get job by ID
    Optional<Job> getJobById(Long id);

    // Create a new job
    Job createJob(Job job);

    // Update an existing job
    Job updateJob(Long id, Job job);

    // Delete a job
    void deleteJob(Long id);

    // Search by title or company
    List<Job> searchJobs(String keyword);

    // Get all active jobs
    List<Job> getActiveJobs();

    // Find jobs by company
    List<Job> getJobsByCompany(String company);

    // Find jobs by location
    List<Job> getJobsByLocation(String location);

    // Find jobs by job type
    List<Job> getJobsByJobType(String jobType);
}