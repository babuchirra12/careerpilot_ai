package com.careerpilot.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private String userName;

    private int profileProgress;

    private String progressStatus;

    private String nextStepTitle;

    private String nextStepDescription;

    private String aiTip;

    private int alertCount;

    private List<DashboardAlert> alerts;


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DashboardAlert {

        private String title;

        private String description;
    }
}