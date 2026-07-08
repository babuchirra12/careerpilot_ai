package com.careerpilot.service.impl;

import com.careerpilot.entity.Job;
import com.careerpilot.repository.JobRepository;
import com.careerpilot.service.JobService;
import org.springframework.stereotype.Service;

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
        if (job.getStatus() == null) {
            job.setStatus("ACTIVE");
        }
        return jobRepository.save(job);
    }

    @Override
    public Job updateJob(Long id, Job job) {
        Job existing = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        existing.setTitle(job.getTitle());
        existing.setCompany(job.getCompany());
        existing.setLocation(job.getLocation());
        existing.setDescription(job.getDescription());
        existing.setSalary(job.getSalary());
        existing.setJobType(job.getJobType());
        existing.setStatus(job.getStatus());
        return jobRepository.save(existing);
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    @Override
    public List<Job> searchJobs(String query) {
        return jobRepository
                .findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(query, query);
    }
}
