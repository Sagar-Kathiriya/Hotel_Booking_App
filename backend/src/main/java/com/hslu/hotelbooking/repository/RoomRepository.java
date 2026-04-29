package com.hslu.hotelbooking.repository;

import com.hslu.hotelbooking.model.Room;
import com.hslu.hotelbooking.model.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByType(RoomType type);
}
