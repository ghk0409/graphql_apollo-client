// GraphQL API url을 이용해 구성
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

// Apollo Client 생성 (GraphQL API 서버와 연결)
const client = new ApolloClient({
    uri: "http://localhost:4000/",
    // 인메모리캐시 전략
    cache: new InMemoryCache(),
});

// client가 정상 연결 작동하는지 확인 (hook을 이용, 서버에 만들어둔 API 호출해보기) - TEST
// client
//     .query({
//         query: gql`
//             {
//                 allMovies {
//                     title
//                 }
//             }
//         `,
//     })
//     .then((data) => console.log(data));

export default client;
