package com.notelyft.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration //Definition of Spring beans, config
public class SecurityConfig {

    @Bean // Spring Management of the objects the securityFilterChain returns
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // TEMPORARY: allowing every request so building and testing the API is faster.
            // Real authentication (login, per-user notes) comes later
            .csrf(csrf -> csrf.disable()) // Disabling Protection, CSRF off: stateless REST API, no session cookies to protect
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Every HTTP request is authorized without login

        return http.build();
    }
}