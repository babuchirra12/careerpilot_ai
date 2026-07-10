package com.careerpilot.scheduler;

import com.careerpilot.service.JobImportService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class JobScheduler {

    private final JobImportService jobImportService;

    public JobScheduler(JobImportService jobImportService) {
        this.jobImportService = jobImportService;
    }

    // Every 6 hours
    @Scheduled(cron = "0 0 */6 * * *")
    public void importJobs() {

        System.out.println("Importing jobs...");

        jobImportService.importJobs();
    }
}