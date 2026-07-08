package com.careerpilot.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResumeUploadRequest {
    private String title;
    private String contentJson;
    private String status;
}
