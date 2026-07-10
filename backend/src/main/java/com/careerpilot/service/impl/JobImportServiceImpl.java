package com.careerpilot.service.impl;

import com.careerpilot.service.JobImportService;
import org.springframework.stereotype.Service;

@Service
public class JobImportServiceImpl implements JobImportService {

    @Override
    public void importJobs() {

        System.out.println("Import Jobs Started...");

        // Fetch jobs here

        System.out.println("Import Jobs Completed.");
    }
}