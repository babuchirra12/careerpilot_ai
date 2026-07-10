package com.yourpackage.util;

import org.springframework.stereotype.Component;

@Component
public class ResumeParser {

    public String parse(String resumeText) {

        if (resumeText == null) {
            return "";
        }

        return resumeText
                .replaceAll("\\s+", " ")
                .trim();
    }
}