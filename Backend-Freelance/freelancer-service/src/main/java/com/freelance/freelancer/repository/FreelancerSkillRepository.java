package com.freelance.freelancer.repository;
import com.freelance.freelancer.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface FreelancerSkillRepository extends JpaRepository<FreelancerSkill, FreelancerSkillId> {
    List<FreelancerSkill> findBySkillNameIn(Set<String> skillNames);
    List<FreelancerSkill> findByFreelancerId(Long freelancerId);
}