package com.careerpilot.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewResponse {
    private Long id;
    private String jobTitle;
    private String company;
    private String questionsJson;
    private String status;
    private Integer score;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
