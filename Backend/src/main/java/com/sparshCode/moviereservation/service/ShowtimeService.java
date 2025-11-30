package com.sparshCode.moviereservation.service;

import org.springframework.stereotype.Service;
import com.sparshCode.moviereservation.entity.Showtime;
import com.sparshCode.moviereservation.repository.ShowtimeRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ShowtimeService {

    private ShowtimeRepository showtimeRepository;
    

    public ShowtimeService(ShowtimeRepository showtimeRepository) {
        this.showtimeRepository = showtimeRepository;
    }

    public List<Showtime> findAllShowtimes() {
        return showtimeRepository.findAll();
    }

    public Showtime createShowtime(Showtime showtime) {
        return showtimeRepository.save(showtime);
    }

    public Optional<Showtime> getShowtime(Long id) {
        return showtimeRepository.findById(id);
    }

    public Showtime updateShowtime(Long id, Showtime showtimeDetails) {
        if (showtimeRepository.existsById(id)) {
            showtimeDetails.setId(id);
            return showtimeRepository.save(showtimeDetails);
        }
        return null;
    }

    public void deleteShowtime(Long id) {
        showtimeRepository.deleteById(id);
    }

    public List<Showtime> getAllShowtimes() {
        return showtimeRepository.findAll();
    }

}

