package com.sparshCode.moviereservation.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.sparshCode.moviereservation.entity.Reservation;
import com.sparshCode.moviereservation.service.ReservationService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/reservation")
@CrossOrigin(origins = "*")
public class ReservationUserController {

    private final ReservationService reservationService;

    public ReservationUserController(ReservationService reservationService) {
        this.reservationService = reservationService;
   
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.findAllReservations();
    }


    @PostMapping("/{showtimeId}/add-seats")
    public ResponseEntity<Map<String, String>> addSeatsToReservation(
            @PathVariable Long showtimeId,
            @RequestBody List<String> newSeats) {

        Map<String, String> response = new HashMap<>();
        try {
            reservationService.addSeatsToReservation(showtimeId, newSeats);
            response.put("message", "Seats added successfully to the reservation.");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            response.put("error", "An error occurred while adding seats.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{showtimeId}/occupied-seats")
    public ResponseEntity<List<String>> getOccupiedSeats(@PathVariable Long showtimeId) {
        try {
            List<String> occupiedSeats = reservationService.getOccupiedSeats(showtimeId);
            return ResponseEntity.ok(occupiedSeats);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/reservations")
    public List<Reservation> getReservationsByMovieId(@RequestParam Long movieId) {
        return reservationService.getReservationsByMovieId(movieId);
    }

}
