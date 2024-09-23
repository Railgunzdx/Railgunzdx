import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load game data
with open('games.json', 'r') as f:
    games = json.load(f)

# Convert genres into a single string for each game
def preprocess_games():
    for game in games:
        game['genre_str'] = ' '.join(game['genre'])

# Search games based on query and recommend similar ones
def search_games(query):
    preprocess_games()

    # Perform content-based filtering using genres
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform([game['genre_str'] for game in games])

    # Filter games based on the query
    filtered_games = [game for game in games if query.lower() in game['name'].lower()]
    
    # Recommend games based on similarity of genres
    recommendations = []
    if filtered_games:
        query_game = filtered_games[0]  # Pick the first matched game
        query_index = games.index(query_game)
        cosine_sim = cosine_similarity(tfidf_matrix[query_index], tfidf_matrix).flatten()
        
        # Get top 5 similar games
        similar_indices = cosine_sim.argsort()[-6:-1]
        recommendations = [games[i] for i in similar_indices]

    return filtered_games, recommendations
