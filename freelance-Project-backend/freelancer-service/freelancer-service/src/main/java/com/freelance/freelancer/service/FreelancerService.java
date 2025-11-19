package com.freelance.freelancer.service;

import com.freelance.freelancer.dto.*;
import com.freelance.freelancer.entity.*;
import com.freelance.freelancer.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FreelancerService {

    private final FreelancerRepository freelancerRepo;
    private final FreelancerSkillRepository skillRepo;
    private final BidRepository bidRepo;

    @Transactional
    public FreelancerDTO.ProfileResponse createProfile(Long userId, FreelancerDTO.ProfileRequest request) {
        if (freelancerRepo.findByUserId(userId).isPresent())
            throw new RuntimeException("Profile already exists");
        Freelancer f = new Freelancer();
        f.setUserId(userId);
        f.setExperienceLevel(request.experienceLevel());
        freelancerRepo.save(f);
        return new FreelancerDTO.ProfileResponse(f.getId(), "Profile created successfully");
    }

    @Transactional
    public void addSkills(Long userId, FreelancerDTO.AddSkillsRequest request) {
        Freelancer f = freelancerRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Create profile first"));
        skillRepo.deleteAll(skillRepo.findByFreelancerId(f.getId()));
        List<FreelancerSkill> skills = request.skills().stream().map(s -> {
            FreelancerSkill fs = new FreelancerSkill();
            fs.setFreelancerId(f.getId());
            fs.setSkillName(s.name().toLowerCase());
            fs.setProficiencyLevel(Math.min(5, Math.max(1, s.proficiencyLevel())));
            return fs;
        }).toList();
        skillRepo.saveAll(skills);
    }

    @Transactional
    public FreelancerDTO.BidResponse submitBid(Long userId, FreelancerDTO.BidRequest request) {
        Freelancer f = freelancerRepo.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Profile required"));
        if (bidRepo.existsByProjectIdAndFreelancerId(request.projectId(), f.getId()))
            throw new RuntimeException("Already bid on this project");
        Bid bid = new Bid();
        bid.setProjectId(request.projectId());
        bid.setFreelancerId(f.getId());
        bid.setBidAmount(request.bidAmount());
        bid.setMessage(request.message());
        bidRepo.save(bid);
        return new FreelancerDTO.BidResponse(bid.getId(), "Bid submitted", "PENDING");
    }

    public List<FreelancerDTO.FreelancerMatch> getMatchingFreelancers(Set<String> requiredSkills) {
        if (requiredSkills.isEmpty()) return List.of();
        Set<String> lower = requiredSkills.stream().map(String::toLowerCase).collect(Collectors.toSet());

        return skillRepo.findBySkillNameIn(lower).stream()
            .collect(Collectors.groupingBy(FreelancerSkill::getFreelancerId))
            .entrySet().stream()
            .map(e -> {
                long fid = e.getKey();
                int matched = e.getValue().size();
                double score = (double) matched / requiredSkills.size();
                String name = "Freelancer#" + fid; // temporary name
                return new FreelancerDTO.FreelancerMatch(fid, name, score);
            })
            .sorted((a,b) -> Double.compare(b.matchScore(), a.matchScore()))
            .toList();
    }
}