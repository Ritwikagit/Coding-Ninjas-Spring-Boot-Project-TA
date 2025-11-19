package com.freelance.project.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Project {
    @Id @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Long clientId;
    private Double budget;
    private String status = "OPEN";

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "project_required_skills",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> requiredSkills = new HashSet<>();
}