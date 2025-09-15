package com.marketpulse.articlestorageservice.controller;

import com.marketpulse.articlestorageservice.model.Article;
import com.marketpulse.articlestorageservice.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.time.Instant;
import java.util.Comparator;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping
    public List<Article> getAllArticles() {
        return articleRepository.findAll().stream()
                .sorted(Comparator.comparing((Article a) -> a.getPublishedAt() == null ? Instant.EPOCH : a.getPublishedAt()).reversed())
                .toList();
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
