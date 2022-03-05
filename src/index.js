const { GraphQLServer, PubSub } = require('graphql-yoga')
const  pubsub = new PubSub();
const { v4: uuidv4 } = require('uuid')
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

    type Mutation {
        addUser(name: String!, age:Int!): [Users!]!
        updateUser(id: ID!, name: String, age:Int): Users!
        deleteUser(id: ID!): Users!
    }

    type Subscription {
        update: Users! 
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
    },
    Mutation: {
        addUser(parent, args, ctx, info){
            const { name, age } = args
            users.push({
                id: uuidv4(),
                name,
                age
            })

            return users
        },

        updateUser(parent, args, ctx, info){
            const { id, name, age} = args
            const user = users.find((user) => user.id === id)

            if(!user){
                throw new Error(`user with id ${id} does not exist.`)
            }

            if(name){
                user.name = name
            }

            if(age){
                user.age = age
            }
            pubsub.publish('update_user', {
                update: user
            })
            return user
        },

        deleteUser(parent, args, ctx, info){
            const index = users.findIndex((index) => index.id === args.id)
            if(index === -1){
                throw new Error(`user with id ${id} does not exist.`)
            }

            const deletedUser = users.splice(index, 1);
            return deletedUser[0];
        }

    },
    Subscription: {
        update: {
            subscribe(parent, args, ctx, info){
                return pubsub.asyncIterator('update_user')
            }
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

