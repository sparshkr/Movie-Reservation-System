package com.sparshCode.moviereservation.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "showtimes")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="movie_id",nullable = false)
    private Movie movieId;

    @ManyToOne
    @JoinColumn(name="hall_id",nullable = false)
    private Hall hallId;

    @Column(name="year",nullable = false)
    private String year;
    
    private String month;

    private String day;

    private String hour;
 
    private String minutes;
}

