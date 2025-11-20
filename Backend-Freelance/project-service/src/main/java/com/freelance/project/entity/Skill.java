package com.freelance.project.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Skill {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String category;
}