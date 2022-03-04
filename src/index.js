const { GraphQLServer } = require('graphql-yoga')

const users = [
    {
        id:'1',
        name:'John',
        age:25,
        location: {
            state: 'Bangkok',
            city: 'Si Lom'
        }
    },
    {
        id:'2',
        name:'David',
        age:25,
        location: {
            state: 'New York',
            city: 'Manhattan'
        }
    },
    {
        id:'3',
        name:'Mike',
        age:25,
        location: {
            state: 'New York',
            city: 'Manhattan'
        }
    },
]

const typeDefs = `
    type Query {
        name: String!
        age: Int!
        isSingle: Boolean
        numbers: [Int!]!
        location: Location 
        users: [Users!]!
    }

    type Location {
        state: String!
        city: String!
    }

    type Users {
        id: ID!
        name: String!
        age: Int!
        location: Location
    }
`

const resolvers = {
    Query: {
        name() {
            return 'Anecha'
        },
        age() {
            return 28
        },
        isSingle() {
            return null
        },
        numbers() {
            return [10,20,30]
        },
        location() {
            return {
                state: 'BKK',
                city: 'Phasi Charoen'
            }
        },
        users() {
            return users
        }

    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

const options = {
    port: 4000,
    endpoint: '/graphql'
}

server.start(options, ({ port }) => 
    console.log(`Server started on port ${port}`)
)

