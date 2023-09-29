package com.giskard.meeting_scheduler.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.giskard.meeting_scheduler.entity.Availability;

import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    // We can add custom query methods here if needed

    // @Query("Select * from availability order by start_time asc")
    // List<Availability> findAll();

    @Query(value = "SELECT * FROM Availability ORDER BY start_time ASC", nativeQuery = true)
    List<Availability> findAllOrderedByStartTimeAsc();



    
}

