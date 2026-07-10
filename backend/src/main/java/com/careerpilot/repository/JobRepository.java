package com.careerpilot.repository;

import com.careerpilot.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Active Jobs
    List<Job> findByStatus(String status);

    // Company
    List<Job> findByCompanyIgnoreCase(String company);

    // Location
    List<Job> findByLocationContainingIgnoreCase(String location);

    // Job Type
    List<Job> findByJobTypeIgnoreCase(String jobType);

    // Company + Status
    List<Job> findByCompanyIgnoreCaseAndStatus(
            String company,
            String status
    );

    // Title
    List<Job> findByTitleContainingIgnoreCase(String title);

    // Location + Job Type
    List<Job> findByLocationContainingIgnoreCaseAndJobTypeIgnoreCase(
            String location,
            String jobType
    );

    /**
     * Global Search
     */
    @Query("""
        SELECT j
        FROM Job j
        WHERE
            LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(COALESCE(j.skills, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(COALESCE(j.level, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(COALESCE(j.jobType, '')) LIKE LOWER(CONCAT('%', :keyword, '%'))
        """)
    List<Job> searchJobs(@Param("keyword") String keyword);
}