package com.hslu.hotelbooking.repository;

import com.hslu.hotelbooking.model.Booking;
import com.hslu.hotelbooking.model.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.room.type = :roomType " +
           "AND b.checkInDate < :checkOut AND b.checkOutDate > :checkIn")
    long countOverlappingBookings(@Param("roomType") RoomType roomType,
                                   @Param("checkIn") LocalDate checkIn,
                                   @Param("checkOut") LocalDate checkOut);

    boolean existsByReservationNumber(String reservationNumber);
}
