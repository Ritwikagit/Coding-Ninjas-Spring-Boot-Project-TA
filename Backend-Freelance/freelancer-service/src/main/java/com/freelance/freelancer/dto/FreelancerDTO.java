package com.freelance.freelancer.dto;

import java.util.List;

public class FreelancerDTO {

    // Correct names – these match what Service & Controller use
    public record ProfileRequest(String experienceLevel) {}
    public record ProfileResponse(Long freelancerId, String message) {}

    public record SkillEntry(String name, int proficiencyLevel) {}
    public record AddSkillsRequest(List<SkillEntry> skills) {}

    public record FreelancerMatch(Long freelancerId, String name, double matchScore) {}

    public record BidRequest(Long projectId, Double bidAmount, String message) {}
    public record BidResponse(Long bidId, String message, String status) {}
}