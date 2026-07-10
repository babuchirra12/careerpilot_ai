package com.yourpackage.util;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class KeywordMatcher {

    public List<String> findMissingKeywords(String resume,
                                            String jobDescription) {

        List<String> missing = new ArrayList<>();

        if (jobDescription == null || jobDescription.isEmpty()) {
            return missing;
        }

        String[] words = jobDescription.split("\\s+");

        for (String word : words) {

            String keyword = word.replaceAll("[^a-zA-Z]", "");

            if (keyword.length() < 4)
                continue;

            if (!resume.toLowerCase().contains(keyword.toLowerCase())) {

                if (!missing.contains(keyword)) {

                    missing.add(keyword);

                }

            }

        }

        return missing;

    }

}