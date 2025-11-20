package com.freelance.freelancer.repository;
import com.freelance.freelancer.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
    boolean existsByProjectIdAndFreelancerId(Long projectId, Long freelancerId);
}