package com.giskard.meeting_scheduler.service;
import java.util.List;
import java.util.Optional;

import com.giskard.meeting_scheduler.entity.Reservation;

public interface ReservationService {
    Reservation createReservation(Reservation reservation, Long availabilityId);
    
    List<Reservation> getReservationsByEmail(String email);
    
    boolean deleteReservation(Long id, String email);

    List<Reservation> getAllReservations();

    Optional<Reservation> getReservationById(Long id);

    Reservation updateReservation(Reservation reservation);

    boolean deleteReservation(Long id);

    void deleteAllReservations();
}

