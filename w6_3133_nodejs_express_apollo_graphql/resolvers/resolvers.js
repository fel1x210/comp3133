import Movie from '../models/Movie.js';

// Resolvers define the technique for fetching the types defined in the schema.
const movieResolvers = {

    // -----------------------------------------------
    // Queries
    // -----------------------------------------------
    Query: {

        // Get all movies from the database
        getAllMovies: async () => {
            try {
                const movies = await Movie.find();
                return movies;
            } catch (error) {
                throw new Error(`Failed to fetch movies: ${error.message}`);
            }
        },

        // Get a single movie by its MongoDB ObjectId
        getMovieById: async (_, { id }) => {
            try {
                const movie = await Movie.findById(id);
                if (!movie) {
                    throw new Error(`Movie with ID ${id} not found`);
                }
                return movie;
            } catch (error) {
                throw new Error(`Failed to fetch movie: ${error.message}`);
            }
        },

        // Get movies by director name using the static method defined in the Movie model
        getMoviesByDirector: async (_, { director_name }) => {
            try {
                // Uses the static method: movieSchema.statics.findByDirector
                const movies = await Movie.findByDirector(director_name);
                return movies;
            } catch (error) {
                throw new Error(`Failed to fetch movies by director: ${error.message}`);
            }
        },
    },

    // -----------------------------------------------
    // Mutations
    // -----------------------------------------------
    Mutation: {

        // Insert a new movie into the database
        addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
            try {
                const newMovie = new Movie({
                    name,
                    director_name,
                    production_house,
                    release_date,
                    rating,
                });
                // The pre-save hook in the model will log the save operation
                const savedMovie = await newMovie.save();
                return savedMovie;
            } catch (error) {
                throw new Error(`Failed to add movie: ${error.message}`);
            }
        },

        // Update an existing movie by ID
        updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
            try {
                // Build only the fields that were provided (partial update support)
                const updateFields = {};
                if (name !== undefined) updateFields.name = name;
                if (director_name !== undefined) updateFields.director_name = director_name;
                if (production_house !== undefined) updateFields.production_house = production_house;
                if (release_date !== undefined) updateFields.release_date = release_date;
                if (rating !== undefined) updateFields.rating = rating;

                // { new: true } returns the updated document; runValidators enforces schema rules
                const updatedMovie = await Movie.findByIdAndUpdate(
                    id,
                    updateFields,
                    { new: true, runValidators: true }
                );

                if (!updatedMovie) {
                    throw new Error(`Movie with ID ${id} not found`);
                }
                return updatedMovie;
            } catch (error) {
                throw new Error(`Failed to update movie: ${error.message}`);
            }
        },

        // Delete a movie by ID and return a confirmation message
        deleteMovie: async (_, { id }) => {
            try {
                const deletedMovie = await Movie.findByIdAndDelete(id);
                if (!deletedMovie) {
                    throw new Error(`Movie with ID ${id} not found`);
                }
                return `Movie "${deletedMovie.name}" (ID: ${id}) was successfully deleted.`;
            } catch (error) {
                throw new Error(`Failed to delete movie: ${error.message}`);
            }
        },
    },
};

export default movieResolvers;