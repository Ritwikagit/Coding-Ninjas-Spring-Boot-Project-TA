package com.freelance.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Data
@IdClass(FreelancerSkillId.class)
public class FreelancerSkill {
    @Id private Long freelancerId;
    @Id private String skillName;
    private int proficiencyLevel; 
}