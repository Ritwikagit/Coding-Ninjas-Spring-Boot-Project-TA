package com.freelance.freelancer.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Data
public class Bid {
    @Id @GeneratedValue
    private Long id;
    private Long projectId;
    private Long freelancerId;
    private Double bidAmount;
    private String message = "";
    private String status = "PENDING";
}