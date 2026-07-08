package com.careerpilot.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponse {
    private Long id;
    private String title;
    private String contentJson;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
