// Entity Java Bean class for Availability

package com.giskard.meeting_scheduler.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "AVAILABILITY")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name ="start_time", nullable = false)
    private LocalDateTime startDateTime;


    @Column(name ="end_time", nullable = false)
    private LocalDateTime endDateTime;

    // private String location;

    // private String description;

    // private String status;

    // private Long userId;

    public Availability() {
    }

    public Availability(LocalDateTime startDateTime, LocalDateTime endDateTime, String location, String description, String status, Long userId) {
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        // this.location = location;
        // this.description = description;
        // this.status = status;
        // this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    // public int getYearDateTime(){
    //     return startDateTime.getYear();
    // }


    // public String getLocation() {
    //     return location;
    // }

    // public String getDescription() {
    //     return description;
    // }

    // public String getStatus() {
    //     return status;
    // }

    // public Long getUserId() {
    //     return userId;
    // }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public void setEndDateTime(LocalDateTime endDateTime) {
        this.endDateTime = endDateTime;
    }

    // public void setLocation(String location) {
    //     this.location = location;
    // }

    // public void setDescription(String description) {
    //     this.description = description;
    // }

    // public void setStatus(String status) {
    //     this.status = status;
    // }

    // public void setUserId(Long userId) {
    //     this.userId = userId;
    // }
}
