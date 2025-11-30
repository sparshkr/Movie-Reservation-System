package com.sparshCode.moviereservation.repository;

import java.util.Optional;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sparshCode.moviereservation.entity.Reservation;
import com.sparshCode.moviereservation.entity.Showtime;


public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findByShowtimeId(Long showtimeId);
    boolean existsByShowtime(Showtime showtime);

    @Query("SELECT r FROM Reservation r JOIN r.showtime s JOIN s.movie m WHERE m.id = :movieId")
    List<Reservation> findReservationsByMovieId(@Param("movieId") Long movieId);
}
