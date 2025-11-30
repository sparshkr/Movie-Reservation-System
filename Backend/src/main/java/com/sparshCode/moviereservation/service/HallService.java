package com.sparshCode.moviereservation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sparshCode.moviereservation.entity.Hall;
import com.sparshCode.moviereservation.repository.HallRepository;

import java.util.List;
import java.util.Optional;

@Service
public class HallService {

    @Autowired
    private HallRepository hallRepository;

    public List<Hall> findAllHalls() {
        return hallRepository.findAll();
    }

    public Hall createHall(Hall hall) {
        return hallRepository.save(hall);
    }

    public Optional<Hall> getHall(Long id) {
        return hallRepository.findById(id);
    }

    public Hall updateHall(Long id, Hall hallDetails) {
        if (hallRepository.existsById(id)) {
            return hallRepository.save(hallDetails);
        }
        return null;
    }

    public void deleteHall(Long id) {
        hallRepository.deleteById(id);
    }
}
