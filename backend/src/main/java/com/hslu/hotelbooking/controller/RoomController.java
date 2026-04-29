package com.hslu.hotelbooking.controller;

import com.hslu.hotelbooking.dto.RoomAvailabilityDTO;
import com.hslu.hotelbooking.service.RoomService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/available")
    public ResponseEntity<List<RoomAvailabilityDTO>> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut) {

        if (!checkOut.isAfter(checkIn)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(roomService.getAvailableRooms(checkIn, checkOut));
    }
}
