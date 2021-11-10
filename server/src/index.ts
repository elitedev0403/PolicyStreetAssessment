import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

//Resolvers
import { NotesResolver } from './resolvers/notes.resolvers';
import { AuthResolver } from './resolvers/auth.resolvers';

const executeMain = async () => {
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [NotesResolver, AuthResolver],
    emitSchemaFile: true,
    validate: false,
  });
  let mongoose;
  if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
    mongoose = await connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
  else {
    mongoose = await connect(
      `mongodb://localhost:27017/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  }
  await mongoose.connection;


  const server = new ApolloServer({ schema: schema, context: ({ req, res }) => ({ req, res }) });
  const expressServer: Express.Application = Express();
  server.applyMiddleware({ app: expressServer });

  expressServer.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready and listening at ==> http://localhost:${process.env.PORT}${server.graphqlPath}`)
  );
};

executeMain().catch((error) => {
  console.log(error, 'error');
});
