package com.hslu.hotelbooking.service;

import com.hslu.hotelbooking.dto.RoomAvailabilityDTO;
import com.hslu.hotelbooking.model.Room;
import com.hslu.hotelbooking.model.RoomType;
import com.hslu.hotelbooking.repository.BookingRepository;
import com.hslu.hotelbooking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    public RoomService(RoomRepository roomRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<RoomAvailabilityDTO> getAvailableRooms(LocalDate checkIn, LocalDate checkOut) {
        List<Room> rooms = roomRepository.findAll();
        List<RoomAvailabilityDTO> result = new ArrayList<>();

        for (Room room : rooms) {
            long booked = bookingRepository.countOverlappingBookings(room.getType(), checkIn, checkOut);
            int available = Math.max(0, room.getTotalRooms() - (int) booked);
            result.add(new RoomAvailabilityDTO(
                    room.getType().name(),
                    room.getName(),
                    room.getDescription(),
                    room.getPricePerNight(),
                    available
            ));
        }

        return result;
    }
}
