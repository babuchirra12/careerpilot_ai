package com.careerpilot.dashboard;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Override
    public DashboardResponse getDashboard() {

        return DashboardResponse.builder()

                .userName("Alex")

                .profileProgress(82)

                .progressStatus("On track")

                .nextStepTitle("Prepare your pitch")

                .nextStepDescription(
                    "Use the role summary tool to align your experience with the top skills employers want."
                )

                .aiTip("AI tip")

                .alertCount(3)

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