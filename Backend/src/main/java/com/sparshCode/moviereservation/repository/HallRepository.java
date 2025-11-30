package com.sparshCode.moviereservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sparshCode.moviereservation.entity.Hall;

public interface HallRepository extends JpaRepository<Hall, Long>{

}
