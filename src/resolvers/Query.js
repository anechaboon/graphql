const Query = {
    users(parent, args, ctx, info) {
        const { users } = ctx
        return users
    },
    marvelCharacter(parent, args, ctx, info) {
        const { character } = ctx
        return character
    }
}

module.exports = Query;