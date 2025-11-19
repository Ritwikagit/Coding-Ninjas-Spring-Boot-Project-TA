package com.freelance.freelancer.repository;
import com.freelance.freelancer.entity.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FreelancerRepository extends JpaRepository<Freelancer, Long> {
    Optional<Freelancer> findByUserId(Long userId);
}