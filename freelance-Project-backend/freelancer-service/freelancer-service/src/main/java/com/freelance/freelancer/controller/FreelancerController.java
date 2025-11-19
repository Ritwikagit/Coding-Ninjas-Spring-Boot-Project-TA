package com.freelance.freelancer.controller;

import com.freelance.freelancer.dto.*;
import com.freelance.freelancer.service.FreelancerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/freelancers")
@RequiredArgsConstructor
public class FreelancerController {

    private final FreelancerService service;

    @PostMapping("/profile")
    public ResponseEntity<FreelancerDTO.ProfileResponse> createProfile(
            @RequestBody FreelancerDTO.ProfileRequest req,
            @AuthenticationPrincipal String userIdStr) {
        return ResponseEntity.ok(service.createProfile(Long.valueOf(userIdStr), req));
    }

    @PostMapping("/skills")
    public ResponseEntity<String> addSkills(
            @RequestBody FreelancerDTO.AddSkillsRequest req,
            @AuthenticationPrincipal String userIdStr) {
        service.addSkills(Long.valueOf(userIdStr), req);
        return ResponseEntity.ok("Skills updated successfully");
    }

    @PostMapping("/bids")
    public ResponseEntity<FreelancerDTO.BidResponse> submitBid(
            @RequestBody FreelancerDTO.BidRequest req,
            @AuthenticationPrincipal String userIdStr) {
        return ResponseEntity.ok(service.submitBid(Long.valueOf(userIdStr), req));
    }

    @GetMapping("/matches")
    public ResponseEntity<List<FreelancerDTO.FreelancerMatch>> getMatches(
            @RequestParam("skills") Set<String> skills) {
        return ResponseEntity.ok(service.getMatchingFreelancers(skills));
    }
}