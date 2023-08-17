import { g, auth, config } from '@grafbase/sdk'

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
  Expiry: g.datetime().optional(),
}).search()

export default config({
  schema: g,
  auth: {
   
    rules: (rules) => {
      // Define permission rules for models
      rules.public(); 
      
    },
  },
  
})
