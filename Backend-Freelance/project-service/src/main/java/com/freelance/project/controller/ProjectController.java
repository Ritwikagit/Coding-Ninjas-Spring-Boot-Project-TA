//package com.freelance.project.controller;
//
//import com.freelance.project.dto.ProjectDTO;
//import com.freelance.project.service.ProjectService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/projects")
//public class ProjectController {
//
//    @Autowired private ProjectService projectService;
//
//    @PostMapping
//    public ResponseEntity<ProjectDTO.ProjectResponse> createProject(
//            @RequestBody ProjectDTO.CreateProjectRequest request,
//            @AuthenticationPrincipal String userId) {
//        return ResponseEntity.ok(projectService.createProject(request, Long.valueOf(userId)));
//    }
//
//    @GetMapping("/{id}/matches")
//    public ResponseEntity<List<ProjectDTO.FreelancerMatch>> getMatches(@PathVariable Long id) {
//        return ResponseEntity.ok(projectService.getMatches(id));
//    }
//}
package com.freelance.project.controller;

import com.freelance.project.dto.ProjectDTO;
import com.freelance.project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;
 // ---------------- GET PROJECTS FOR SPECIFIC CLIENT ---------------------
    @GetMapping("/my-projects")
    public ResponseEntity<List<Map<String, Object>>> getMyProjects(
            @AuthenticationPrincipal String userId,
            @RequestHeader("Authorization") String token
    ) {
        List<Map<String,Object>> projects = projectService.getProjectsByClient(Long.valueOf(userId), cleanToken(token));
        return ResponseEntity.ok(projects);
    }


    // ---------------- CREATE PROJECT ---------------------
    @PostMapping
    public ResponseEntity<ProjectDTO.ProjectResponse> createProject(
            @RequestBody ProjectDTO.CreateProjectRequest request,
            @AuthenticationPrincipal String userId,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(
                projectService.createProject(
                        request,
                        Long.valueOf(userId),
                        cleanToken(token)
                )
        );
    }

    
    // ---------------- GET MATCHES ------------------------
    @GetMapping("/{id}/matches")
    public ResponseEntity<List<ProjectDTO.FreelancerMatch>> getMatches(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.ok(
                projectService.getMatches(
                        id,
                        cleanToken(token)
                )
        );
    }
 // ---------------- GET ALL PROJECTS ---------------------
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllProjects(
            @AuthenticationPrincipal String userId,
            @RequestHeader(value = "Authorization", required = false) String token
    ) {
        List<Map<String, Object>> projects = projectService.getAllProjects(cleanToken(token));
        return ResponseEntity.ok(projects);
    }

    // ---------------- TOKEN CLEANER -----------------------
    private String cleanToken(String token) {
        if (token == null) return null;
        return token.replace("Bearer ", "")
                .replace("Basic ", "")
                .trim();
    }
}

