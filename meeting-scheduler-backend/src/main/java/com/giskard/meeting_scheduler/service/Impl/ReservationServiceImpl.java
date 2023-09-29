package com.giskard.meeting_scheduler.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.giskard.meeting_scheduler.entity.Availability;
import com.giskard.meeting_scheduler.entity.Reservation;
import com.giskard.meeting_scheduler.repository.ReservationRepository;
import com.giskard.meeting_scheduler.service.AvailabilityService;
import com.giskard.meeting_scheduler.service.ReservationService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Resource
    private ReservationRepository reservationRepository;

    @Resource
    private AvailabilityService availabilityService;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, AvailabilityService availabilityService) {
        this.reservationRepository = reservationRepository;
        this.availabilityService = availabilityService;
    }


    public Reservation createReservation(Reservation reservation, Long availabilityId) {
        // Check if the availability exists
        Availability availability = availabilityService.getAvailabilityById(availabilityId).orElse(null);
        if (availability == null) {
            return null;
        }
        
        LocalDateTime startAvailability = availability.getStartDateTime();
        LocalDateTime endAvailability = availability.getEndDateTime();
        LocalDateTime startReservation = reservation.getstartDateTime();
        LocalDateTime endReservation = reservation.getendDateTime();
        // Check if the reservation is within the availability
        if (startReservation.isBefore(startAvailability) || endReservation.isAfter(endAvailability)) {
            return null;
        }
        // Check if resercation is within the availability
        LocalDateTime gapDateTime = startReservation.isAfter(startAvailability)? startReservation : startAvailability;
        LocalDateTime overlapDateTime = endReservation.isBefore(endAvailability)? endReservation : endAvailability;
        // check if gapDateTime is after overlapDateTime
        if (gapDateTime.isAfter(overlapDateTime)) {
            return null;
        }
        if (gapDateTime.isEqual(startAvailability)&& overlapDateTime.isEqual(endAvailability)) {
            availabilityService.deleteAvailability(availabilityId);
            return reservationRepository.save(reservation);
        }

        if (gapDateTime.isEqual(startAvailability)&& overlapDateTime.isEqual(endReservation)) {
            Availability newAvailability = new Availability();
            newAvailability.setStartDateTime(endReservation);
            newAvailability.setEndDateTime(endAvailability);
            availabilityService.createAvailability(newAvailability);            
        }
        else if (gapDateTime.isEqual(startReservation)&& overlapDateTime.isEqual(endAvailability)){
            Availability newAvailability = new Availability();
            newAvailability.setStartDateTime(startAvailability);
            newAvailability.setEndDateTime(startReservation);
            availabilityService.createAvailability(newAvailability);
        }
        else if (gapDateTime.isEqual(startReservation)&& overlapDateTime.isEqual(endReservation)){
            Availability newAvailability1 = new Availability();
            newAvailability1.setStartDateTime(startAvailability);
            newAvailability1.setEndDateTime(startReservation);
            availabilityService.createAvailability(newAvailability1);
            Availability newAvailability2 = new Availability();
            newAvailability2.setStartDateTime(endReservation);
            newAvailability2.setEndDateTime(endAvailability);
            availabilityService.createAvailability(newAvailability2);
        }
        
        availabilityService.deleteAvailability(availabilityId);
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsByEmail(String email) {
        return reservationRepository.findByEmail(email);
    }

    public boolean deleteReservation(Long id, String email) {
        // Check if the reservation exists and matches the provided email
        Reservation existingReservation = reservationRepository.findById(id).orElse(null);
        if (existingReservation == null || !existingReservation.getEmail().equals(email)) {
            return false;
        }
        // create new availability
        Availability newAvailability = new Availability();
        newAvailability.setStartDateTime(existingReservation.getstartDateTime());
        newAvailability.setEndDateTime(existingReservation.getendDateTime());
        availabilityService.createAvailability(newAvailability);
        reservationRepository.deleteById(id);
        return true;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation updateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public boolean deleteReservation(Long id) {

          Reservation existingReservation = reservationRepository.findById(id).orElse(null);
        if (existingReservation == null ){
            return false;
        }
        // create new availability
        Availability newAvailability = new Availability();
        newAvailability.setStartDateTime(existingReservation.getstartDateTime());
        newAvailability.setEndDateTime(existingReservation.getendDateTime());
        availabilityService.createAvailability(newAvailability);
        reservationRepository.deleteById(id);
        return true;
    }

    public void deleteAllReservations() {
        reservationRepository.deleteAll();
    }



}
