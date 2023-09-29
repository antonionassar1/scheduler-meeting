package com.giskard.meeting_scheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.giskard.meeting_scheduler.entity.Reservation;
import java.util.List;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    // Custom query method to retrieve reservations by email
    List<Reservation> findByEmail(String email);
}
