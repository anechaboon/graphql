const Query = {
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
    users(parent, args, ctx, info) {
        const { users } = ctx
        return users
    }
}

module.exports = Query;