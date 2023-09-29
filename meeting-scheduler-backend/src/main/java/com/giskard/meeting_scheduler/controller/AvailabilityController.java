package com.giskard.meeting_scheduler.controller;

import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.giskard.meeting_scheduler.service.AvailabilityService;

import com.giskard.meeting_scheduler.entity.Availability;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @GetMapping
    public List<Availability> getAllAvailability() {
        return availabilityService.getAllAvailabilities();
    }

    @GetMapping("/{id}")
    public Optional<Availability> getAvailabilityById(@PathVariable Long id) {
        return availabilityService.getAvailabilityById(id);
    }

    @PostMapping
    public ResponseEntity<Availability> createAvailability(@RequestBody Availability availability) {
        Availability new_availability = availabilityService.createAvailability(availability);
        if (new_availability == null) {
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new_availability, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteAvailability( @PathVariable Long id) {
        availabilityService.deleteAvailability(id);
    }



    

    
}
