package com.careerpilot.dashboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {


    @GetMapping
    public DashboardResponse dashboard() {

        return DashboardResponse.builder()

                .userName("Babu")

                .profileProgress(82)

                .progressStatus("On track")

                .nextStepTitle("Prepare your pitch")

                .nextStepDescription(
                        "Use the role summary tool to align your experience with the top skills employers want."
                )

                .aiTip(
                        "Complete your profile to get better AI job recommendations."
                )

                .alertCount(2)

                .alerts(List.of(

                        DashboardResponse.DashboardAlert.builder()
                                .title("Review suggested roles")
                                .description(
                                        "See new matches based on your latest profile."
                                )
                                .build(),

                        DashboardResponse.DashboardAlert.builder()
                                .title("Complete your skills quiz")
                                .description(
                                        "Unlock stronger recommendations with one quick check."
                                )
                                .build()

                ))

                .build();
    }
}