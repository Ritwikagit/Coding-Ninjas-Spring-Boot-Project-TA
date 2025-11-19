package com.freelance.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Freelancer {
    @Id @GeneratedValue
    private Long id;
    private Long userId;
    private String experienceLevel;
}