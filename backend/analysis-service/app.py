import os
import random
import json
from datetime import datetime, timedelta
import redis
from flask import Flask, jsonify
from flask_cors import CORS
from nltk.sentiment.vader import SentimentIntensityAnalyzer

# --- Initialization ---
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# Connect to Redis
redis_client = redis.Redis(host=os.environ.get('REDIS_HOST', 'localhost'), port=6379, db=0, decode_responses=True)

# Download NLTK data (only needs to be done once)
# import nltk
# nltk.download('vader_lexicon')

sia = SentimentIntensityAnalyzer()

# --- API Endpoints ---

@app.route('/health')
def health_check():
    """Health check endpoint."""
    return jsonify({"status": "ok"})

SYMBOLS = ["TSLA", "AAPL", "NVDA", "MSFT", "AMZN", "GOOGL", "META", "NFLX"]
POS_TOKENS = ["surges", "jumps", "advances", "rallies", "beats", "soars"]
NEG_TOKENS = ["slides", "drops", "falls", "retreats", "misses", "plunges"]
POS_CONTEXT = ["on strong demand", "after upbeat outlook", "on record earnings", "amid expansion plans"]
NEG_CONTEXT = ["amid production concerns", "after regulatory probe", "on slowing demand", "after guidance cut"]

def build_title(bullish: bool) -> str:
    if bullish:
        return f"{random.choice(SYMBOLS)} {random.choice(POS_TOKENS)} {random.choice(POS_CONTEXT)}"
    else:
        return f"{random.choice(SYMBOLS)} {random.choice(NEG_TOKENS)} {random.choice(NEG_CONTEXT)}"

def synthesize(batch_size: int):
    now = datetime.utcnow()
    out = []
    for _ in range(batch_size):
        bullish = random.random() > 0.5
        title = build_title(bullish)
        score = sia.polarity_scores(title)['compound']
        if score >= 0.05:
            label = 'POSITIVE'
        elif score <= -0.05:
            label = 'NEGATIVE'
        else:
            label = 'NEUTRAL'
        published_at = (now - timedelta(minutes=random.randint(0, 240))).isoformat() + 'Z'
        out.append({
            'title': title,
            'content': title + ' Additional context ...',
            'symbol': title.split()[0],
            'sentiment_score': int(round(score * 100)),
            'sentiment_label': label,
            'published_at': published_at
        })
    return out

@app.route('/trigger-analysis')
def trigger_analysis():
    batch_size = int(os.environ.get('ARTICLE_BATCH_SIZE', '12'))
    articles = synthesize(batch_size)
    for a in articles:
        redis_client.publish('marketpulse-articles', json.dumps(a))
        print(f"Published: {a['title']}")
    return jsonify({'status': 'Analysis triggered', 'articles_published': len(articles)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
