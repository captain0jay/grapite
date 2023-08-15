import { g, auth, config } from '@grafbase/sdk'

// Welcome to Grafbase!
// Define your data models, integrate auth, permission rules, custom resolvers, search, and more with Grafbase.
// Integrate Auth
// https://grafbase.com/docs/auth
//
// const authProvider = auth.OpenIDConnect({
//   issuer: process.env.ISSUER_URL ?? ''
// })
//
// Define Data Models
// https://grafbase.com/docs/database

const api = g.model('Api', {
  name: g.string(),
  apikey: g.string().unique(),
  publishedAt: g.datetime().optional(),
}).search()

const request = g.model('Request',{
  name: g.string().unique(),
  body: g.json(),
  response: g.json().optional(),
  publishedAt: g.datetime().optional(),
}).search()

const comment = g.model('Comment', {
  post: g.relation(api),
  body: g.string(),
  likes: g.int().default(0),
  author: g.relation(() => user).optional()
})

const user = g.model('User', {
  name: g.string(),
  email: g.email().optional(),
  posts: g.relation(api).optional().list(),
  comments: g.relation(comment).optional().list()

  // Extend models with resolvers
  // https://grafbase.com/docs/edge-gateway/resolvers
  // gravatar: g.url().resolver('user/gravatar')
})

export default config({
  schema: g,
  auth: {
    // Configure authentication providers (if needed)
    // providers: [authProvider],

    rules: (rules) => {
      // Define permission rules for models
      rules.public(); // Allow authenticated users to read requests
      // Define more permission rules as needed
    },
  },
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
