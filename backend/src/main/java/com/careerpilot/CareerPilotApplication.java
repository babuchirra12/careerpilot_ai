package com.careerpilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CareerPilotApplication {

    public static void main(String[] args) {
        SpringApplication.run(CareerPilotApplication.class, args);
    }
}