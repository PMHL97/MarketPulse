package com.marketpulse.articlestorageservice.subscriber;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marketpulse.articlestorageservice.model.Article;
import com.marketpulse.articlestorageservice.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;

@Service
public class ArticleSubscriber implements MessageListener {

    @Autowired
    private ArticleRepository articleRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String payload = message.toString();
            JsonNode node = objectMapper.readTree(payload);
            String publishedAtStr = node.path("published_at").asText(null);
            Instant publishedAt = null;
            if (publishedAtStr != null && !publishedAtStr.isBlank()) {
                try {
                    publishedAt = Instant.parse(publishedAtStr.replace("\"", ""));
                } catch (Exception ignored) {}
            }

            Article article = Article.builder()
                    .title(node.path("title").asText(null))
                    .content(node.path("content").asText(null))
                    .symbol(node.path("symbol").asText(null))
                    .sentimentScore(node.path("sentiment_score").isMissingNode() ? null : node.path("sentiment_score").asInt())
                    .sentimentLabel(node.path("sentiment_label").asText(null))
                    .publishedAt(publishedAt)
                    .build();
            articleRepository.save(article);
            System.out.println("Saved article to DB: " + article.getTitle());
        } catch (IOException e) {
            System.err.println("Failed to parse article message: " + e.getMessage());
        }
    }
}
