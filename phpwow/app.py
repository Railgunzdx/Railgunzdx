from flask import Flask, render_template, request, jsonify
from recommendation import search_games

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search')
def search():
    query = request.args.get('query', '')
    results, recommendations = search_games(query)
    return jsonify({'results': results, 'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)

#pip install Flask scikit-learn
#python app.py