const db = require('./models')

// to poulate types

async function createTypes() {
    try {
        const todo = await db.type.create({
            name: 'To-do'
        })
        const note = await db.type.create({
            name: 'Note'
        })
        const goal = await db.type.create({
            name: 'Goal'
        })
        const general = await db.type.create({
            name: 'General'
        })
        const reminder = await db.type.create({
            name: 'Reminder'
        })
    } catch(error) {
        console.warn(error)
    }
}

// createTypes()