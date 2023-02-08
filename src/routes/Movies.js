import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// gql 쿼리 작성
const ALL_MOVIES = gql`
    query getMovies {
        allMovies {
            title
            id
        }
        allTweets {
            id
            text
            author {
                fullName
            }
        }
    }
`;

export default function Movies() {
    // useQuery 활용 (선언형)
    const { data, loading, error } = useQuery(ALL_MOVIES);

    if (loading) {
        return <h1>Loading....</h1>;
    }
    if (error) {
        return <h1>Could not fetch... :(</h1>;
    }

    return (
        <ul>
            <h1>Movies</h1>
            {data.allMovies.map((movie) => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
        </ul>
    );

    // gql 기본 (명령형)
    // const [movies, setMovies] = useState([]);
    // const client = useApolloClient();

    // useEffect(() => {
    //     client
    //         .query({
    //             query: gql``,
    //         })
    //         .then((result) => setMovies(result.data.allMovies));
    // }, [client]);

    // return (
    //     <div>
    //         {movies.map((movie) => (
    //             <li key={movie.id}>{movie.title}</li>
    //         ))}
    //     </div>
    // );
}
