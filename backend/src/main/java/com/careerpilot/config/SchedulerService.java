package com.careerpilot.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    @Scheduled(cron = "0 0 */6 * * *")
    public void updateJobs() {

        System.out.println("Running Scheduler...");

    }
}