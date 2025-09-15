package com.marketpulse.articlestorageservice.repository;

import com.marketpulse.articlestorageservice.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
