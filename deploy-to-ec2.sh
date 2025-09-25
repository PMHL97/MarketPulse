#!/bin/bash
echo "🚀 Deploying MarketPulse from local to EC2"

# Variables
EC2_IP="3.144.189.176"
KEY_FILE="marketpulse-key.pem"

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "❌ Key file not found: $KEY_FILE"
    exit 1
fi

# Set correct permissions
chmod 400 $KEY_FILE

echo "📦 Creating deployment package..."

# Create a deployment package
tar -czf marketpulse-deploy.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=target \
    --exclude=*.log \
    --exclude=.DS_Store \
    .

echo "📤 Uploading to EC2..."

# Upload to EC2
scp -i $KEY_FILE marketpulse-deploy.tar.gz ec2-user@$EC2_IP:~/

echo "🔧 Setting up on EC2..."

# Connect and setup
ssh -i $KEY_FILE ec2-user@$EC2_IP << 'REMOTE_EOF'
# Install dependencies
sudo yum update -y
sudo yum install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Extract the project
tar -xzf marketpulse-deploy.tar.gz
rm marketpulse-deploy.tar.gz

# Create production docker-compose
cat > docker-compose.prod.yml << 'COMPOSE_EOF'
version: '3.8'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:3000"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 150M

  user-service:
    build: ./backend/user-service
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-users:5432/marketpulse_users
      - SPRING_DATASOURCE_USERNAME=marketpulse
      - SPRING_DATASOURCE_PASSWORD=YourSecurePassword123!
      - JWT_SECRET=your-jwt-secret-key-here
      - APP_CORS_ALLOWED_ORIGINS=http://3.144.189.176
    depends_on:
      - postgres-users
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 300M

  article-service:
    build: ./backend/article-storage-service
    ports:
      - "8081:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-articles:5432/marketpulse_articles
      - SPRING_DATASOURCE_USERNAME=marketpulse
      - SPRING_DATASOURCE_PASSWORD=YourSecurePassword123!
      - SPRING_REDIS_HOST=redis
      - APP_CORS_ALLOWED_ORIGINS=http://3.144.189.176
    depends_on:
      - postgres-articles
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 300M

  analysis-service:
    build: ./backend/analysis-service
    ports:
      - "5001:5001"
    environment:
      - REDIS_HOST=redis
      - NEWS_API_KEY=your-news-api-key
      - ALPHA_VANTAGE_KEY=your-alpha-vantage-key
      - FINNHUB_API_KEY=your-finnhub-key
      - ARTICLE_BATCH_SIZE=15
    depends_on:
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 200M

  postgres-users:
    image: postgres:14-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=marketpulse
      - POSTGRES_PASSWORD=YourSecurePassword123!
      - POSTGRES_DB=marketpulse_users
    volumes:
      - postgres_users_data:/var/lib/postgresql/data
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 100M

  postgres-articles:
    image: postgres:14-alpine
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_USER=marketpulse
      - POSTGRES_PASSWORD=YourSecurePassword123!
      - POSTGRES_DB=marketpulse_articles
    volumes:
      - postgres_articles_data:/var/lib/postgresql/data
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 100M

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 50M

volumes:
  postgres_users_data:
  postgres_articles_data:
COMPOSE_EOF

# Build and start services
echo "🐳 Building and starting services..."
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
echo "📊 Service status:"
docker-compose -f docker-compose.prod.yml ps

echo "✅ Deployment complete!"
echo "🌍 Your app is available at: http://3.144.189.176:3000"
REMOTE_EOF

# Clean up local files
rm marketpulse-deploy.tar.gz

echo "🎉 MarketPulse deployed successfully!"
echo "🌍 Access your app at: http://3.144.189.176:3000"
echo "💰 Cost: $0/month (FREE for 12 months!)"
