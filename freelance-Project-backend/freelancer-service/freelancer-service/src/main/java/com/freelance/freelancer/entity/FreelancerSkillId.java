package com.freelance.freelancer.entity;

import lombok.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FreelancerSkillId implements Serializable {
    private Long freelancerId;
    private String skillName;
}