'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function MovieRecommender() {
  const [movieName, setMovieName] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

 
  const getRecommendations = async () => {
    setLoading(true);
    setRecommendations([]);
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        body: JSON.stringify({ movie: movieName }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      const predictionData = JSON.parse(data.prediction);
      
      if (predictionData.error) {
        setErrorMsg(predictionData.error);
      } else {
        setRecommendations(predictionData.recommendations || []);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setErrorMsg('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl shadow-xl border-none">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-center text-blue-600">🎬 Movie Recommender</h1>
            <p className="text-center text-gray-500">Enter a movie title to get similar recommendations</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="movie" className="text-base">Movie Title</Label>
            <Input
              id="movie"
              placeholder="e.g. Avatar"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className="text-base"
            />
            <Button
              onClick={getRecommendations}
              disabled={loading || !movieName.trim()}
              className="w-full mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </div>

          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

          {recommendations.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-blue-700">Recommended Movies:</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {recommendations.map((movie, index) => (
                  <li key={index}>{movie}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
