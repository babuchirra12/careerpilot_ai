package com.careerpilot.controller;

import com.careerpilot.dto.response.ApiResponse;
import com.careerpilot.entity.Job;
import com.careerpilot.service.JobService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;


    public JobController(JobService jobService) {
        this.jobService = jobService;
    }


    /**
     * Get all jobs or search jobs
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Job>>> getAllJobs(
            @RequestParam(required = false) String search) {

        List<Job> jobs;

        if (search != null && !search.trim().isEmpty()) {
            jobs = jobService.searchJobs(search);
        } else {
            jobs = jobService.getAllJobs();
        }

        return ResponseEntity.ok(ApiResponse.ok(jobs));
    }


    /**
     * Get job by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> getJobById(
            @PathVariable Long id) {

        return jobService.getJobById(id)
                .map(job -> ResponseEntity.ok(ApiResponse.ok(job)))
                .orElse(
                        ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(ApiResponse.error("Job not found"))
                );
    }


    /**
     * Get active jobs
     */
    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Job>>> getActiveJobs() {

        return ResponseEntity.ok(
                ApiResponse.ok(jobService.getActiveJobs())
        );
    }


    /**
     * Get jobs by company
     */
    @GetMapping("/company/{company}")
    public ResponseEntity<ApiResponse<List<Job>>> getJobsByCompany(
            @PathVariable String company) {

        return ResponseEntity.ok(
                ApiResponse.ok(
                        jobService.getJobsByCompany(company)
                )
        );
    }


    /**
     * Get jobs by location
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<ApiResponse<List<Job>>> getJobsByLocation(
            @PathVariable String location) {

        return ResponseEntity.ok(
                ApiResponse.ok(
                        jobService.getJobsByLocation(location)
                )
        );
    }


    /**
     * Get jobs by job type
     */
    @GetMapping("/type/{jobType}")
    public ResponseEntity<ApiResponse<List<Job>>> getJobsByJobType(
            @PathVariable String jobType) {

        return ResponseEntity.ok(
                ApiResponse.ok(
                        jobService.getJobsByJobType(jobType)
                )
        );
    }


    /**
     * Create job
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Job>> createJob(
            @Valid @RequestBody Job job) {

        Job createdJob = jobService.createJob(job);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.ok(
                                "Job created successfully",
                                createdJob
                        )
                );
    }


    /**
     * Update job
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody Job job) {

        Job updatedJob = jobService.updateJob(id, job);

        return ResponseEntity.ok(
                ApiResponse.ok(
                        "Job updated successfully",
                        updatedJob
                )
        );
    }


    /**
     * Delete job
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                ApiResponse.ok(
                        "Job deleted successfully",
                        null
                )
        );
    }
}