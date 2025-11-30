package com.sparshCode.moviereservation.controller;

import org.springframework.web.bind.annotation.*;

import com.sparshCode.moviereservation.entity.Reservation;
import com.sparshCode.moviereservation.entity.Showtime;
import com.sparshCode.moviereservation.service.ReservationService;
import com.sparshCode.moviereservation.service.ShowtimeService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;
    private final ShowtimeService showtimeService;

    public ReservationController(ReservationService reservationService, ShowtimeService showtimeService) {
        this.reservationService = reservationService;
        this.showtimeService = showtimeService;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.findAllReservations();
    }

    @PostMapping("/generate")
    public String generateReservations() {
        List<Showtime> showtimes = showtimeService.getAllShowtimes();
        List<Reservation> newReservations = new ArrayList<>();

        for (Showtime showtime : showtimes) {
            if (!reservationService.existsByShowtime(showtime)) {
                Reservation reservation = new Reservation();
                reservation.setShowtime(showtime);
                reservation.setSeats(new ArrayList<>());
                newReservations.add(reservation);
            }
        }

        reservationService.saveAll(newReservations);

        return newReservations.size() + " new reservations created";
    }

}
