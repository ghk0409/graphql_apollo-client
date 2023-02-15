import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            id
            title
            medium_cover_image
            rating
            summary
            isLiked @client # @client를 추가하여 local only field 설정
        }
    }
`;

// style 추가
const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Image = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;

export default function Movie() {
    const { id } = useParams();
    // useApolloClient를 쓰지 않고 useQuery에서 client를 가져올 수 있음
    const {
        data,
        loading,
        error,
        // client 내부의 cache 값만 가져오기
        client: { cache },
    } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        },
    });

    if (loading) {
        return <h1>Loading....</h1>;
    }
    if (error) {
        return <h1>Could not fetch... :(</h1>;
    }

    // 좋아요 버튼 클릭 핸들러
    const onClick = () => {
        cache.writeFragment({
            // id 값은 useParams로 받아온 URL 파라미터 값의 id
            // Movie:id에 해당하는 특정 캐시값을 수정하기 위해 id값 설정
            id: `Movie:${id}`,
            fragment: gql`
                fragment MovieFragment on Movie {
                    isLiked
                }
            `,
            data: {
                isLiked: !data.movie.isLiked,
            },
        });
    };

    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
                <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
                <Description>{data?.movie?.summary}</Description>
                <button onClick={onClick}>
                    {data?.movie?.isLiked ? "Unlike" : "Like"}
                </button>
            </Column>
            <Image bg={data?.movie?.medium_cover_image} />
        </Container>
    );
}
