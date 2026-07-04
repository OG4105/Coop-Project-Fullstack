package com.notelyft.backend.note;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="notes")
public class Note {

    // ID, @Generated Value= Auto Increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Title of note, @Column is NOT NULL
    @Column(nullable = false)
    private String title;

    // Content of note, @Column Text, unlimited length
    @Column(columnDefinition = "TEXT")
    private String content;

    // Timestamp for when a note is created
    @CreationTimestamp
    private Instant createdAt;

    // Timestamp for when a note is updated
    @UpdateTimestamp
    private Instant updatedAt;


    // Getters

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    // Setters (only title and Content, what the user edits)

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // Setters are not needed for CreatedAt/UpdatedAt
    // , as they are set automatically by Hibernate

}

