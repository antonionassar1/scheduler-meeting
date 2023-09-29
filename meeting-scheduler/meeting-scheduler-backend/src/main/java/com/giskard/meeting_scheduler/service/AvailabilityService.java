package com.giskard.meeting_scheduler.service;

import java.util.List;
import java.util.Optional;

import com.giskard.meeting_scheduler.entity.Availability;

public interface AvailabilityService  {
    List<Availability> getAllAvailabilities();
    Optional<Availability> getAvailabilityById(Long id);
    Availability createAvailability(Availability availability);
    void deleteAvailability(Long id);
    
}
