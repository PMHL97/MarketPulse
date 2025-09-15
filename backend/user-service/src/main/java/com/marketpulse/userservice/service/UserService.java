package com.marketpulse.userservice.service;

import com.marketpulse.userservice.dto.LoginRequest;
import com.marketpulse.userservice.dto.RegisterRequest;
import com.marketpulse.userservice.dto.WatchlistRequest;
import com.marketpulse.userservice.model.User;

import java.util.Set;

public interface UserService {
    User register(RegisterRequest registerRequest);
    String login(LoginRequest loginRequest);
    Set<String> getWatchlist(String email);
    void addToWatchlist(String email, String symbol);
    void removeFromWatchlist(String email, String symbol);
    User getProfile(String email);
    User updateProfile(String email, User user);
}
