package com.careerpilot.service;

import com.careerpilot.entity.Job;
import java.util.List;
import java.util.Optional;

public interface JobService {
    List<Job> getAllJobs();
    Optional<Job> getJobById(Long id);
    Job createJob(Job job);
    Job updateJob(Long id, Job job);
    void deleteJob(Long id);
    List<Job> searchJobs(String query);
}
