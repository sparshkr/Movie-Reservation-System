package com.sparshCode.moviereservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sparshCode.moviereservation.entity.Showtime;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long>{

}
