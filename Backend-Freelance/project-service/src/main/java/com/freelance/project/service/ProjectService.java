package com.freelance.project.service;

import com.freelance.project.dto.ProjectDTO;
import com.freelance.project.dto.ProjectDTO.*;
import com.freelance.project.entity.Project;
import com.freelance.project.entity.Skill;
import com.freelance.project.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.stream.Collectors;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired private ProjectRepository projectRepository;
    @Autowired private RestTemplate restTemplate;

    @Value("${freelancer.service.url}")
    private String freelancerServiceUrl;
    

    public List<Map<String, Object>> getProjectsByClient(Long clientId, String token) {
        List<Project> projects = projectRepository.findByClientId(clientId);

        // Map Project entity fields to a structure the frontend expects
        return projects.stream()
                .map(p -> Map.of(
                        "id", p.getId(),
                        "title", p.getTitle(),
                        "description", p.getDescription(),
                        "budget", p.getBudget(),
                        "skills", p.getRequiredSkills(), // assuming Set<String>
                        "status", p.getStatus(),
                        "matches", 0 // default 0, or calculate if needed
                ))
                .collect(Collectors.toList());
    }
    
    public ProjectResponse createProject(CreateProjectRequest request, Long clientId, String s) {
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

    public List<FreelancerMatch> getMatches(Long projectId, String token) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));

        Set<String> requiredSkillNames = project.getRequiredSkills().stream()
            .map(Skill::getName)
            .collect(Collectors.toSet());

        String url = freelancerServiceUrl + "/api/freelancers/matches?skills=" 
                    + String.join(",", requiredSkillNames);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer " + token);
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);

        ResponseEntity<FreelancerMatch[]> response = 
            restTemplate.exchange(url, HttpMethod.GET, entity, FreelancerMatch[].class);

        FreelancerMatch[] matchArray = response.getBody();
        if (matchArray == null) {
            return Collections.emptyList();
        }

        return Arrays.stream(matchArray)
            .sorted((a, b) -> Double.compare(b.matchScore(), a.matchScore()))
            .collect(Collectors.toList());
    }
    
    
    public List<Map<String, Object>> getAllProjects(String token) {
        List<Project> projects = projectRepository.findAll(); // fetch all projects

        return projects.stream()
                .map(p -> Map.of(
                        "id", p.getId(),
                        "title", p.getTitle(),
                        "description", p.getDescription(),
                        "budget", p.getBudget(),
                        "skills", p.getRequiredSkills().stream().map(Skill::getName).collect(Collectors.toSet()),
                        "status", p.getStatus(),
                        "matches", 0 // optional, can calculate if needed
                ))
                .collect(Collectors.toList());
    }



}