package com.sparshCode.moviereservation.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sparshCode.moviereservation.entity.Showtime;
import com.sparshCode.moviereservation.entity.Reservation;
import com.sparshCode.moviereservation.repository.ShowtimeRepository;
import com.sparshCode.moviereservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;

@Service
public class ReservationService {
    
    private final ReservationRepository reservationRepository;
    private final ShowtimeRepository showtimeRepository;

    public ReservationService(ReservationRepository reservationRepository, ShowtimeRepository showtimeRepository) {
        this.reservationRepository = reservationRepository;
        this.showtimeRepository = showtimeRepository;
    }

    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    public void saveAll(List<Reservation> reservations) {
        reservationRepository.saveAll(reservations);
    }

    public boolean existsByShowtime(Showtime showtime) {
        return reservationRepository.existsByShowtime(showtime);
    }

    @Transactional
    public void addSeatsToReservation(Long showtimeId, List<String> newSeats) {
        Reservation reservation = reservationRepository.findByShowtimeId(showtimeId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found for the given showtimeId"));

        List<String> currentSeats = reservation.getSeats();
        currentSeats.addAll(newSeats);

        reservationRepository.save(reservation);
    }

    public List<String> getOccupiedSeats(Long showtimeId) {
        Reservation reservation = reservationRepository.findByShowtimeId(showtimeId)
                .orElseThrow(() -> new IllegalArgumentException("No reservation found for showtime ID: " + showtimeId));
        
        return reservation.getSeats();
    }
    
    @Transactional
    public void createReservationsForAllShowtimes() {
        List<Showtime> showtimes = showtimeRepository.findAll();
        
        for (Showtime showtime : showtimes) {
            if (!reservationRepository.existsByShowtime(showtime)) {
                Reservation reservation = new Reservation();
                reservation.setShowtime(showtime);
                reservation.setSeats(new ArrayList<>());
                
                reservationRepository.save(reservation);
            }
        }
    }

    public List<Reservation> getReservationsByMovieId(Long movieId) {
        return reservationRepository.findReservationsByMovieId(movieId);
    }
}
