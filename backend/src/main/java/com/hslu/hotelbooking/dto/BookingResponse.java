package com.hslu.hotelbooking.dto;

import java.math.BigDecimal;

public class BookingResponse {

    private String reservationNumber;
    private String roomType;
    private String roomName;
    private String checkIn;
    private String checkOut;
    private int numberOfNights;
    private BigDecimal pricePerNight;
    private BigDecimal totalPrice;
    private String guestFirstName;
    private String guestLastName;

    public BookingResponse() {}

    public String getReservationNumber() { return reservationNumber; }
    public void setReservationNumber(String reservationNumber) { this.reservationNumber = reservationNumber; }

    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }

    public String getRoomName() { return roomName; }
    public void setRoomName(String roomName) { this.roomName = roomName; }

    public String getCheckIn() { return checkIn; }
    public void setCheckIn(String checkIn) { this.checkIn = checkIn; }

    public String getCheckOut() { return checkOut; }
    public void setCheckOut(String checkOut) { this.checkOut = checkOut; }

    public int getNumberOfNights() { return numberOfNights; }
    public void setNumberOfNights(int numberOfNights) { this.numberOfNights = numberOfNights; }

    public BigDecimal getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(BigDecimal pricePerNight) { this.pricePerNight = pricePerNight; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public String getGuestFirstName() { return guestFirstName; }
    public void setGuestFirstName(String guestFirstName) { this.guestFirstName = guestFirstName; }

    public String getGuestLastName() { return guestLastName; }
    public void setGuestLastName(String guestLastName) { this.guestLastName = guestLastName; }
}
