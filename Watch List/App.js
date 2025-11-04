import React, { useState } from "react";
import ReactDOM from "react-dom";


function App() {
    const [movies, setMovies] = useState([]);
    const [newMovieTitle, setNewMovieTitle] = useState("");

    const addMovie = () => {
        if (newMovieTitle.trim() !== "") {
            const newMovie = {
                id: Date.now(),
                title: newMovieTitle,
                rating: 0,
                review: "",
            };
            setMovies([...movies, newMovie]);
            setNewMovieTitle("");
        }
    };

    const removeMovie = (movieId) => {
        setMovies(movies.filter((movie) => movie.id !== movieId));
    };

    const updateRating = (movieId, newRating) => {
        setMovies(
            movies.map((movie) =>
                movie.id === movieId ? { ...movie, rating: newRating } : movie
            )
        );
    };

    const updateReview = (movieId, newReview) => {
        setMovies(
            movies.map((movie) =>
                movie.id === movieId ? { ...movie, review: newReview } : movie
            )
        );
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}> Movie Watch List</h1>

            <div style={styles.addSection}>
                <input
                    type="text"
                    placeholder="Enter movie title..."
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addMovie()}
                    style={styles.input}
                />
                <button onClick={addMovie} style={styles.addButton}>
                    Add Movie
                </button>
            </div>

            {movies.length === 0 && (
                <p style={styles.emptyMessage}>No movies yet. Add a movie</p>
            )}

            <div style={styles.movieList}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onRemove={removeMovie}
                        onRatingChange={updateRating}
                        onReviewChange={updateReview}
                    />
                ))}
            </div>
        </div>
    );
}

function MovieCard({ movie, onRemove, onRatingChange, onReviewChange }) {
    return (
        <div style={styles.movieCard}>
            <div style={styles.movieHeader}>
                <h3 style={styles.movieTitle}>{movie.title}</h3>
                <button onClick={() => onRemove(movie.id)} style={styles.removeButton}>
                    ✕
                </button>
            </div>

            <StarRating
                rating={movie.rating}
                onRatingChange={(newRating) => onRatingChange(movie.id, newRating)}
            />

            <textarea
                placeholder="Add your review here..."
                value={movie.review}
                onChange={(e) => onReviewChange(movie.id, e.target.value)}
                style={styles.reviewInput}
            />
        </div>
    );
}


function StarRating({ rating, onRatingChange }) {
    const stars = [1, 2, 3, 4, 5];
    return (
        <div style={styles.starContainer}>
            <span style={styles.ratingLabel}>Rating: </span>
            {stars.map((star) => (
                <span
                    key={star}
                    onClick={() => onRatingChange(star)}
                    style={styles.star}
                >
                    {star <= rating ? "⭐" : "☆"}
                </span>
            ))}
            <span style={styles.ratingText}>
                {rating > 0 ? `${rating}/5` : "Not rated"}
            </span>
        </div>
    );
}

//------------------------------------------
const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
    },
    title: {
        textAlign: "center",
        color: "#333",
        marginBottom: "30px",
    },
    addSection: {
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
    },
    input: {
        flex: 1,
        padding: "12px",
        fontSize: "16px",
        border: "2px solid #ddd",
        borderRadius: "5px",
        outline: "none",
    },
    addButton: {
        padding: "12px 24px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    emptyMessage: {
        textAlign: "center",
        color: "#999",
        fontSize: "18px",
        marginTop: "50px",
    },
    movieList: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    movieCard: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    movieHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
    },
    movieTitle: {
        margin: 0,
        color: "#333",
        fontSize: "20px",
    },
    removeButton: {
        backgroundColor: "#ff4444",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        fontSize: "18px",
    },
    starContainer: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        marginBottom: "15px",
    },
    ratingLabel: {
        fontWeight: "bold",
        color: "#555",
    },
    star: {
        fontSize: "24px",
        cursor: "pointer",
        userSelect: "none",
    },
    ratingText: {
        marginLeft: "10px",
        color: "#666",
        fontSize: "14px",
    },
    reviewInput: {
        width: "100%",
        minHeight: "80px",
        padding: "10px",
        fontSize: "14px",
        border: "2px solid #ddd",
        borderRadius: "5px",
        resize: "vertical",
        fontFamily: "Arial, sans-serif",
        outline: "none",
        boxSizing: "border-box",
    },
};

ReactDOM.render(<App />, document.getElementById("root"));
