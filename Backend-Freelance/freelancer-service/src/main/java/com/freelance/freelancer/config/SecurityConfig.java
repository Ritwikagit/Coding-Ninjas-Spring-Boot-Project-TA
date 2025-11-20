//package com.freelance.freelancer.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//public class SecurityConfig {
//
//    @Autowired
//    private JwtFilter jwtFilter;
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(csrf -> csrf.disable())
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/actuator/**").permitAll()
//                .requestMatchers("/api/freelancers/profile").hasAuthority("FREELANCER")   // <-- ye line important
//                .requestMatchers("/api/freelancers/matches/**").hasAnyAuthority("FREELANCER", "CLIENT")   // <-- ye line important
//                .requestMatchers("/api/freelancers/**").hasAuthority("FREELANCER")
//                .anyRequest().authenticated()
//            )
//            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//}

package com.freelance.freelancer.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            // ---------------- CORS ENABLED HERE ------------------
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.setAllowedOrigins(List.of("http://localhost:5173"));
                config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                config.setExposedHeaders(List.of("*"));
                return config;
            }))
            // -------------------------------------------------------

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/**").permitAll()
               
                
                .requestMatchers("/api/freelancers/profile").hasAuthority("FREELANCER")
                .requestMatchers("/api/freelancers/matches/**").hasAnyAuthority("FREELANCER", "CLIENT")
                .requestMatchers("/api/freelancers/**").hasAuthority("FREELANCER")
                .anyRequest().authenticated()
            )
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
