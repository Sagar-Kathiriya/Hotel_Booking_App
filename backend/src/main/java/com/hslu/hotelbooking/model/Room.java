package com.hslu.hotelbooking.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType type;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private BigDecimal pricePerNight;

    @Column(nullable = false)
    private int totalRooms;

    public Room() {}

    public Room(RoomType type, String name, String description, BigDecimal pricePerNight, int totalRooms) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.pricePerNight = pricePerNight;
        this.totalRooms = totalRooms;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public RoomType getType() { return type; }
    public void setType(RoomType type) { this.type = type; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; }

    public int getTotalRooms() { return totalRooms; }
    public void setTotalRooms(int totalRooms) { this.totalRooms = totalRooms; }
}
