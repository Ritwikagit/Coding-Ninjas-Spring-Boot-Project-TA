package com.freelance.project.service;

import com.freelance.project.dto.ProjectDTO.*;
import com.freelance.project.entity.Project;
import com.freelance.project.entity.Skill;
import com.freelance.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private RestTemplate restTemplate;

    @Value("${freelancer.service.url}")
    private String freelancerServiceUrl;

    public ProjectResponse createProject(CreateProjectRequest request, Long clientId) {
        Project project = new Project();
        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setBudget(request.budget());
        project.setClientId(clientId);

        Set<Skill> skills = request.requiredSkills().stream()
            .map(name -> {
                Skill skill = new Skill();
                skill.setName(name);
                skill.setCategory("IT");
                return skill;
            })
            .collect(Collectors.toSet());

        project.setRequiredSkills(skills);
        projectRepository.save(project);

        return new ProjectResponse(project.getId(), 
            "Project created successfully with " + skills.size() + " required skills.");
    }

    public List<FreelancerMatch> getMatches(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));

        Set<String> requiredSkillNames = project.getRequiredSkills().stream()
            .map(Skill::getName)
            .collect(Collectors.toSet());

        String url = freelancerServiceUrl + "/api/freelancers/matches?skills=" 
                    + String.join(",", requiredSkillNames);

        ResponseEntity<FreelancerMatch[]> response = 
            restTemplate.getForEntity(url, FreelancerMatch[].class);

        FreelancerMatch[] matchArray = response.getBody();
        if (matchArray == null) {
            return Collections.emptyList();
        }

        return Arrays.stream(matchArray)
            .sorted((a, b) -> Double.compare(b.matchScore(), a.matchScore()))
            .collect(Collectors.toList());
    }
}