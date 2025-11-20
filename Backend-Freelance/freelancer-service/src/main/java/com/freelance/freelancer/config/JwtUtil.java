package com.freelance.freelancer.config;  // ← CHANGE PACKAGE ONLY

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    // SAME AS AUTH
    private final SecretKey key = Keys.hmacShaKeyFor(
        "mySuperSecretKey1234567890123456789012345678901234567890".getBytes()
    );
    
    public String generateToken(Long userId, String role, String name) {
        return Jwts.builder()
                .subject(userId.toString())
                .claim("role", role)
                .claim("name", name)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 10)) // 10 hours
                .signWith(key)
                .compact();
    }
    
    // THIS IS THE ONE THAT WORKS IN YOUR AUTH SERVICE
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    
    public String extractUserId(String token) {
        return extractAllClaims(token).getSubject();
    }
    
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
    
    public String extractName(String token) {
        return extractAllClaims(token).get("name", String.class);
    }
    
    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}