package com.yourpackage.util;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SkillExtractor {

    private static final String[] SKILLS = {

            "Java",
            "Spring Boot",
            "Spring",
            "Hibernate",
            "PostgreSQL",
            "MySQL",
            "React",
            "Next.js",
            "Angular",
            "Docker",
            "Kubernetes",
            "AWS",
            "Git",
            "REST API",
            "Microservices",
            "Python",
            "Node.js",
            "MongoDB"

    };

    public List<String> extractSkills(String resume) {

        List<String> skills = new ArrayList<>();

        for (String skill : SKILLS) {

            if (resume.toLowerCase().contains(skill.toLowerCase())) {

                skills.add(skill);

            }

        }

        return skills;

    }

}