package com.careerpilot.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRequest {
    private String jobTitle;
    private String company;
    private String questionsJson;
    private String status;
    private Integer score;
}
