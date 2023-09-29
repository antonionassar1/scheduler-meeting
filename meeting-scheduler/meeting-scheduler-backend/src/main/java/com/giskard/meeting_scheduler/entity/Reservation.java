package com.giskard.meeting_scheduler.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time",nullable = false)
    private LocalDateTime startDateTime;

    @Column(name = "end_time",nullable = false)
    private LocalDateTime endDateTime;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "email",nullable = false)
    private String email;

    // Getters and setters

    public Reservation() {
    }

    public Reservation(LocalDateTime startDateTime, LocalDateTime endDateTime, String title, String email) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.title = title;
        this.email = email;
    }


    public Long getId() {
        return id;
    }

    public LocalDateTime getstartDateTime() {
        return startDateTime;
    }

    public LocalDateTime getendDateTime() {
        return endDateTime;
    }

    
    public String getTitle() {
        return title;
    }

    public String getEmail() {
        return email;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setstartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public void setendDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }


    public void setTitle(String title) {
        this.title = title;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}

