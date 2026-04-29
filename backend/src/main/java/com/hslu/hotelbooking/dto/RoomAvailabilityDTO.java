package com.hslu.hotelbooking.dto;

import java.math.BigDecimal;

public class RoomAvailabilityDTO {

    private String type;
    private String name;
    private String description;
    private BigDecimal pricePerNight;
    private int availableRooms;

    public RoomAvailabilityDTO() {}

    public RoomAvailabilityDTO(String type, String name, String description,
                               BigDecimal pricePerNight, int availableRooms) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.pricePerNight = pricePerNight;
        this.availableRooms = availableRooms;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; }

    public int getAvailableRooms() { return availableRooms; }
    public void setAvailableRooms(int availableRooms) { this.availableRooms = availableRooms; }
}
