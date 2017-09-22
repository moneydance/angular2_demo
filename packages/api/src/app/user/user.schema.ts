import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type User {
    id: ID!
    email: String!
    createAt: String!
    updatedAt: String!
    deletedAt: String
  }
`
