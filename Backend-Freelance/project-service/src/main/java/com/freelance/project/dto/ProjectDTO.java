package com.freelance.project.dto;

import java.util.Set;
import java.util.List;

// All DTOs and Response records in ONE file
public class ProjectDTO {

    // Request to create project
    public record CreateProjectRequest(
        String title,
        String description,
        Double budget,
        Set<String> requiredSkills
    ) {}

    // Response after creating project
    public record ProjectResponse(
        Long projectId,
        String message
    ) {}

    // Freelancer match result (returned from freelancer-service)
    public record FreelancerMatch(
        Long freelancerId,
        String name,
        double matchScore
    ) {}

    // Optional: for future use
    public record MatchResponse(List<FreelancerMatch> matches) {}
}