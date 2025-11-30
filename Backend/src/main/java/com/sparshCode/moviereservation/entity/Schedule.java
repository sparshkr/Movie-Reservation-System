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
@Table(name = "schedules")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="movie_id",nullable = false)
    private Movie movieId;

    @ManyToOne
    @JoinColumn(name="room_id",nullable = false)
    private Room roomId;

    @Column(name="year",nullable = false)
    private String year;
    
    private String month;

    private String day;

    private String hour;
 
    private String minutes;
}
