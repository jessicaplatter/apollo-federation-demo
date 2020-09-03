const { ApolloServer, gql } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");
const fs = require('fs');
const port = 4000;

function readDynamicList(){
    let text = fs.readFileSync('../../../Desktop/serviceList.txt', 'utf8');
    return text;
}

const gateway = new ApolloGateway({
  serviceList: [],
  experimental_didUpdateComposition: () => {
    console.log("IT REFRESHED");
  },
  experimental_didFailComposition: () => {
    console.log("IT FAAAAAAAAAILED!!!!");
  },
  experimental_updateServiceDefinitions: async (serviceList) => {
    // function that calls txt file on desktop
    // parse the file
    // pass the file as the service definitions
  console.log("update service def ran!");
  const dynamicServiceList = readDynamicList();
  const jsonList  = JSON.parse(dynamicServiceList);
  return {
    isNewSchema: true,
    serviceDefinitions: jsonList.map((service) => {
      return {
        name: service.name,
        url: service.url,
        typeDefs: eval(service.typeDefs),
      }
    })
  }
  },
  pollTimer: 10000,
  experimental_pollInterval: 10000,
});
const server = new ApolloServer({
  gateway,
  subscriptions: false,
});
server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
