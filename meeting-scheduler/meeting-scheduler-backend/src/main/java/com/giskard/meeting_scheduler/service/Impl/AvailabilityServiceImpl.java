package com.giskard.meeting_scheduler.service.Impl;
import com.giskard.meeting_scheduler.service.AvailabilityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.giskard.meeting_scheduler.entity.Availability;
import com.giskard.meeting_scheduler.repository.AvailabilityRepository;

import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

@Service
public class AvailabilityServiceImpl  implements AvailabilityService{


    @Resource
    private AvailabilityRepository availabilityRepository;

    @Autowired
    public AvailabilityServiceImpl(AvailabilityRepository availabilityRepository) {
        this.availabilityRepository = availabilityRepository;
    }


    /**
     * @param availabilityRepository
     */
    @Override
    public List<Availability> getAllAvailabilities() {
        return availabilityRepository.findAllOrderedByStartTimeAsc();
    }


    /**
     * @param availabilityRepository
     */
    @Override
    public Optional<Availability> getAvailabilityById(Long id) {
        return availabilityRepository.findById(id);
    }

    @Override
    public Availability createAvailability(Availability availability) {
        if (availability.getStartDateTime().isAfter(availability.getEndDateTime())) {
            return null;
        }
        else if (availability.getStartDateTime().isEqual(availability.getEndDateTime())) {
            return null;
        }
        return availabilityRepository.save(availability);
    }

    @Override
    public void deleteAvailability(Long id) {
        availabilityRepository.deleteById(id);
    }

    
}
