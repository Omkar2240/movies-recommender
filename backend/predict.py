import sys
import json
import pickle

# Load precomputed data
movies = pickle.load(open('movies_list.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

def recommend(movie):
    movie = movie.strip().lower()
    movie_names = movies['title'].str.lower().tolist()

    if movie not in movie_names:
        return []

    index = movie_names.index(movie)
    distances = similarity[index]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    recommendations = [movies.iloc[i[0]].title for i in movie_list]
    return recommendations

if __name__ == "__main__":
    if len(sys.argv) > 1:
        input_json = sys.argv[1]
        try:
            data = json.loads(input_json)
            movie_name = data.get("movie")
            if movie_name:
                recommended = recommend(movie_name)
                print(json.dumps({"recommendations": recommended}))
            else:
                print(json.dumps({"error": "No movie name provided"}))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
    else:
        print(json.dumps({"error": "No input provided"}))
