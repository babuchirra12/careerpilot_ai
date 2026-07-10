package com.yourpackage.util;

import org.springframework.stereotype.Component;

@Component
public class ATSCalculator {

    public int calculateATSScore(String resume) {

        int score = 0;

        if (resume.contains("@"))
            score += 10;

        if (resume.toLowerCase().contains("skills"))
            score += 15;

        if (resume.toLowerCase().contains("education"))
            score += 15;

        if (resume.toLowerCase().contains("experience"))
            score += 20;

        if (resume.toLowerCase().contains("projects"))
            score += 20;

        if (resume.toLowerCase().contains("certification"))
            score += 10;

        if (resume.length() > 500)
            score += 10;

        return Math.min(score, 100);
    }

}