package com.marketpulse.userservice.dto;

public class WatchlistRequest {
    private String symbol;

    public WatchlistRequest() {}

    public WatchlistRequest(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}

