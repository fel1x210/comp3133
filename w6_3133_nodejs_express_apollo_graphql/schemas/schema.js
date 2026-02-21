import { gql } from 'graphql-tag';

// GraphQL Schema - Type Definitions
const movieSchema = gql`

  # Movie type maps to the Mongoose Movie model fields
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  # -----------------------------------------------
  # Queries
  # -----------------------------------------------
  type Query {
    # Get all movies from the database
    getAllMovies: [Movie]

    # Get a single movie by its MongoDB ObjectId
    getMovieById(id: ID!): Movie

    # Get movies by director name (uses static method findByDirector)
    getMoviesByDirector(director_name: String!): [Movie]
  }

  # -----------------------------------------------
  # Mutations
  # -----------------------------------------------
  type Mutation {
    # Insert a new movie into the database
    addMovie(
      name: String!
      director_name: String!
      production_house: String!
      release_date: String!
      rating: Float!
    ): Movie

    # Update an existing movie by ID — all fields are optional
    updateMovie(
      id: ID!
      name: String
      director_name: String
      production_house: String
      release_date: String
      rating: Float
    ): Movie

    # Delete a movie by ID — returns a confirmation message
    deleteMovie(id: ID!): String
  }
`;

export default movieSchema;