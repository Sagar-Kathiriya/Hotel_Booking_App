package com.hslu.hotelbooking.config;

import com.hslu.hotelbooking.model.Room;
import com.hslu.hotelbooking.model.RoomType;
import com.hslu.hotelbooking.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(RoomRepository roomRepository) {
        return args -> {
            if (roomRepository.count() == 0) {
                roomRepository.save(new Room(
                        RoomType.STANDARD,
                        "Standard Room",
                        "Comfortable room with 1 double bed. Perfect for a relaxing stay in the heart of the city.",
                        new BigDecimal("140.00"),
                        5
                ));
                roomRepository.save(new Room(
                        RoomType.DELUXE,
                        "Deluxe Suite",
                        "Spacious suite with 1 large double bed and stunning Lake view. The ultimate luxury experience.",
                        new BigDecimal("360.00"),
                        3
                ));
            }
        };
    }
}
