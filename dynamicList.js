const { gql } = require("apollo-server");

let dynamicServiceList = [
  {
    name: "astronauts",
    url: "http://localhost:4001/graphql",
    typeDefs: gql`
      type Astronaut @key(fields: "id") {
        id: ID!
        name: String
      }
      extend type Query {
        astronaut(id: ID!): Astronaut
        astronauts: [Astronaut]
      }
    `,
  },
   {
     name: "missions",
     url: "http://localhost:4002/graphql",
     typeDefs: gql`
       type Mission {
         id: ID!
         crew: [Astronaut]
         designation: String!
         startDate: String
         endDate: String
       }
       extend type Astronaut @key(fields: "id") {
         id: ID! @external
       }
       extend type Query {
         mission(id: ID!): Mission
         missions: [Mission]
       }
     `,
   },
];

console.log("AAAAAA");

module.exports={dynamicServiceList};