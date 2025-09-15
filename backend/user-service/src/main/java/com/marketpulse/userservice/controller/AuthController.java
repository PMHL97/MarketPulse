package com.marketpulse.userservice.controller;

import com.marketpulse.userservice.dto.AuthResponse;
import com.marketpulse.userservice.dto.LoginRequest;
import com.marketpulse.userservice.dto.RegisterRequest;
import com.marketpulse.userservice.dto.WatchlistRequest;
import com.marketpulse.userservice.model.User;
import com.marketpulse.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        User user = userService.register(registerRequest);
        String token = userService.login(new LoginRequest(registerRequest.getEmail(), registerRequest.getPassword()));
        user.setPassword(null); // Don't return password
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        String token = userService.login(loginRequest);
        User user = userService.getProfile(loginRequest.getEmail());
        user.setPassword(null); // Don't return password
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    // Watchlist endpoints
    @GetMapping("/watchlist")
    public ResponseEntity<Set<String>> getWatchlist() {
        String email = getCurrentUserEmail();
        Set<String> watchlist = userService.getWatchlist(email);
        return ResponseEntity.ok(watchlist);
    }

    @PostMapping("/watchlist")
    public ResponseEntity<String> addToWatchlist(@RequestBody WatchlistRequest request) {
        String email = getCurrentUserEmail();
        userService.addToWatchlist(email, request.getSymbol());
        return ResponseEntity.ok("Symbol added to watchlist");
    }

    @DeleteMapping("/watchlist/{symbol}")
    public ResponseEntity<String> removeFromWatchlist(@PathVariable String symbol) {
        String email = getCurrentUserEmail();
        userService.removeFromWatchlist(email, symbol);
        return ResponseEntity.ok("Symbol removed from watchlist");
    }

    // Profile endpoints
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        String email = getCurrentUserEmail();
        User user = userService.getProfile(email);
        // Don't return password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser) {
        String email = getCurrentUserEmail();
        User user = userService.updateProfile(email, updatedUser);
        // Don't return password
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
