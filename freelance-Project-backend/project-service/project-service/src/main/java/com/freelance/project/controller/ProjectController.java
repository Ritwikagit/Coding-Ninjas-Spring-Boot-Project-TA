package com.freelance.project.controller;

import com.freelance.project.dto.ProjectDTO;
import com.freelance.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired private ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO.ProjectResponse> createProject(
            @RequestBody ProjectDTO.CreateProjectRequest request,
            @AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(projectService.createProject(request, Long.valueOf(userId)));
    }

    @GetMapping("/{id}/matches")
    public ResponseEntity<List<ProjectDTO.FreelancerMatch>> getMatches(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getMatches(id));
    }
}