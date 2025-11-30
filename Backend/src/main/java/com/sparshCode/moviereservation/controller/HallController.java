package com.sparshCode.moviereservation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sparshCode.moviereservation.entity.Hall;
import com.sparshCode.moviereservation.service.HallService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/hall")
@CrossOrigin(origins = "*")
public class HallController {

    @Autowired
    private HallService hallService;

    @PostMapping
    public ResponseEntity<Hall> createHall(@RequestBody Hall hall) {
        Hall createdHall = hallService.createHall(hall);
        return ResponseEntity.ok(createdHall);
    }

    @GetMapping
    public List<Hall> getAllHalls() {
        return hallService.findAllHalls();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hall> getHall(@PathVariable Long id) {
        Optional<Hall> hall = hallService.getHall(id);
        return hall.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHall(@PathVariable Long id) {
        hallService.deleteHall(id);
        return ResponseEntity.noContent().build();
    }
}
