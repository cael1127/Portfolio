import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const GraphQLAPIDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [query, setQuery] = useState(`query {
  users {
    id
    name
    email
    posts {
      title
      content
    }
  }
}`);
  const [response, setResponse] = useState(null);
  const [executing, setExecuting] = useState(false);

  const handleExecute = async () => {
    setExecuting(true);
    
    // Simulate GraphQL query execution
    setTimeout(() => {
      setResponse({
        data: {
          users: [
            {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              posts: [
                { title: 'First Post', content: 'This is my first post' },
                { title: 'Second Post', content: 'This is my second post' }
              ]
            },
            {
              id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              posts: [
                { title: 'Hello World', content: 'Hello from Jane' }
              ]
            }
          ]
        },
        executionTime: Math.floor(Math.random() * 100) + 50
      });
      setExecuting(false);
    }, 1000);
  };

  const codeData = {
    code: `// GraphQL API with Apollo Server
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// GraphQL Schema Definition
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, content: String!, authorId: ID!): Post!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }

  type Subscription {
    postCreated: Post!
    userUpdated: User!
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      return await dataSources.userAPI.getAllUsers();
    },
    user: async (parent, { id }, { dataSources }) => {
      return await dataSources.userAPI.getUserById(id);
    },
    posts: async (parent, args, { dataSources }) => {
      return await dataSources.postAPI.getAllPosts();
    },
    post: async (parent, { id }, { dataSources }) => {
      return await dataSources.postAPI.getPostById(id);
    }
  },

  Mutation: {
    createUser: async (parent, { name, email }, { dataSources }) => {
      return await dataSources.userAPI.createUser({ name, email });
    },
    createPost: async (parent, { title, content, authorId }, { dataSources }) => {
      return await dataSources.postAPI.createPost({ title, content, authorId });
    },
    updateUser: async (parent, { id, name, email }, { dataSources }) => {
      return await dataSources.userAPI.updateUser(id, { name, email });
    },
    deleteUser: async (parent, { id }, { dataSources }) => {
      return await dataSources.userAPI.deleteUser(id);
    }
  },

  Subscription: {
    postCreated: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator('POST_CREATED');
      }
    },
    userUpdated: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator('USER_UPDATED');
      }
    }
  },

  User: {
    posts: async (parent, args, { dataSources }) => {
      return await dataSources.postAPI.getPostsByAuthor(parent.id);
    }
  },

  Post: {
    author: async (parent, args, { dataSources }) => {
      return await dataSources.userAPI.getUserById(parent.authorId);
    }
  }
};

// Data Sources
class UserAPI {
  constructor() {
    this.users = [];
  }

  async getAllUsers() {
    return this.users;
  }

  async getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  async createUser({ name, email }) {
    const user = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  async updateUser(id, updates) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    Object.assign(user, updates);
    return user;
  }

  async deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

class PostAPI {
  constructor() {
    this.posts = [];
  }

  async getAllPosts() {
    return this.posts;
  }

  async getPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  async getPostsByAuthor(authorId) {
    return this.posts.filter(post => post.authorId === authorId);
  }

  async createPost({ title, content, authorId }) {
    const post = {
      id: Date.now().toString(),
      title,
      content,
      authorId,
      createdAt: new Date().toISOString()
    };
    this.posts.push(post);
    return post;
  }
}

// Apollo Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI(),
    postAPI: new PostAPI()
  }),
  context: ({ req }) => {
    // Authentication, authorization, etc.
    const token = req.headers.authorization || '';
    return { token };
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      // Handle WebSocket connection
    }
  }
});

const app = express();
server.applyMiddleware({ app });

// GraphQL Playground
app.get('/graphql', (req, res) => {
  res.send(\`
    <html>
      <head>
        <title>GraphQL Playground</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
      </head>
      <body>
        <div id="root"></div>
        <script src="https://cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
        <script>
          window.addEventListener('load', function (event) {
            GraphQLPlayground.init(document.getElementById('root'), {
              endpoint: '/graphql'
            })
          })
        </script>
      </body>
    </html>
  \`);
});

app.listen({ port: 4000 }, () => {
  console.log(\`🚀 Server ready at http://localhost:4000\${server.graphqlPath}\`);
});

module.exports = { server, typeDefs, resolvers };`,
    language: 'javascript',
    title: 'GraphQL API with Apollo Server'
  };

  return (
    <div className="space-y-6">
      {/* GraphQL Playground */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">GraphQL Playground</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Query</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded text-white font-mono text-sm h-48"
              placeholder="Enter your GraphQL query..."
            />
          </div>
          <button
            onClick={handleExecute}
            disabled={executing}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {executing ? 'Executing...' : 'Execute Query'}
          </button>
        </div>
      </div>

      {/* Response */}
      {response && (
        <motion.div
          className="bg-gray-800 rounded-lg border border-green-500/50 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Response</h3>
            <span className="text-sm text-gray-400">Execution time: {response.executionTime}ms</span>
          </div>
          <pre className="bg-gray-900 p-4 rounded text-green-400 text-sm overflow-x-auto">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </motion.div>
      )}

      {/* Schema Documentation */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Schema Documentation</h3>
        <div className="space-y-4">
          <div>
            <div className="text-blue-400 font-semibold mb-2">Query</div>
            <div className="text-sm text-gray-300 space-y-1 ml-4">
              <div>users: [User!]!</div>
              <div>user(id: ID!): User</div>
              <div>posts: [Post!]!</div>
              <div>post(id: ID!): Post</div>
            </div>
          </div>
          <div>
            <div className="text-green-400 font-semibold mb-2">Mutation</div>
            <div className="text-sm text-gray-300 space-y-1 ml-4">
              <div>createUser(name: String!, email: String!): User!</div>
              <div>createPost(title: String!, content: String!, authorId: ID!): Post!</div>
              <div>updateUser(id: ID!, name: String, email: String): User!</div>
              <div>deleteUser(id: ID!): Boolean!</div>
            </div>
          </div>
          <div>
            <div className="text-purple-400 font-semibold mb-2">Subscription</div>
            <div className="text-sm text-gray-300 space-y-1 ml-4">
              <div>postCreated: Post!</div>
              <div>userUpdated: User!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          View Code
        </button>
      </div>

      {showCodeViewer && (
        <CodeViewer
          code={codeData.code}
          language={codeData.language}
          title={codeData.title}
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default GraphQLAPIDemo;
