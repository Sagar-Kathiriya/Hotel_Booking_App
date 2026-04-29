package com.hslu.hotelbooking.service;

import com.hslu.hotelbooking.dto.BookingRequest;
import com.hslu.hotelbooking.dto.BookingResponse;
import com.hslu.hotelbooking.model.Booking;
import com.hslu.hotelbooking.model.Guest;
import com.hslu.hotelbooking.model.Room;
import com.hslu.hotelbooking.model.RoomType;
import com.hslu.hotelbooking.repository.BookingRepository;
import com.hslu.hotelbooking.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final Random random = new Random();

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        LocalDate checkIn = LocalDate.parse(request.getCheckIn());
        LocalDate checkOut = LocalDate.parse(request.getCheckOut());

        if (!checkOut.isAfter(checkIn)) {
            throw new IllegalArgumentException("Check-out date must be after check-in date.");
        }

        RoomType roomType = RoomType.valueOf(request.getRoomType().toUpperCase());
        Room room = roomRepository.findByType(roomType)
                .orElseThrow(() -> new IllegalArgumentException("Room type not found: " + roomType));

        long booked = bookingRepository.countOverlappingBookings(roomType, checkIn, checkOut);
        if (booked >= room.getTotalRooms()) {
            throw new IllegalStateException("No rooms available for the selected dates.");
        }

        int nights = (int) ChronoUnit.DAYS.between(checkIn, checkOut);
        BigDecimal totalPrice = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        Guest guest = new Guest(request.getFirstName(), request.getLastName());

        Booking booking = new Booking();
        booking.setReservationNumber(generateReservationNumber());
        booking.setRoom(room);
        booking.setGuest(guest);
        booking.setCheckInDate(checkIn);
        booking.setCheckOutDate(checkOut);
        booking.setNumberOfNights(nights);
        booking.setTotalPrice(totalPrice);

        bookingRepository.save(booking);

        BookingResponse response = new BookingResponse();
        response.setReservationNumber(booking.getReservationNumber());
        response.setRoomType(room.getType().name());
        response.setRoomName(room.getName());
        response.setCheckIn(checkIn.toString());
        response.setCheckOut(checkOut.toString());
        response.setNumberOfNights(nights);
        response.setPricePerNight(room.getPricePerNight());
        response.setTotalPrice(totalPrice);
        response.setGuestFirstName(guest.getFirstName());
        response.setGuestLastName(guest.getLastName());

        return response;
    }

    private String generateReservationNumber() {
        String candidate;
        do {
            int number = 1000 + random.nextInt(9000);
            candidate = "HSLU-CH" + number;
        } while (bookingRepository.existsByReservationNumber(candidate));
        return candidate;
    }
}
