package com.freelance.project.repository;

import com.freelance.project.entity.Project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	List<Project> findByClientId(Long clientId);
}
