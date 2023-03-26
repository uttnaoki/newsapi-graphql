const { ApolloServer, gql } = require('apollo-server');

// HackerNewsの１つ１つの投稿
let links = [
  {
    id: 'link-0',
    description: 'GraphQLチュートリアルをUdemyで学ぶ',
    url: 'https://www.google.com/',
  },
];

// GraphQLスキーマの定義
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => 'HackerNewsクローン',
    feed: () => links,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`${url}でサーバーを起動中・・・`));
