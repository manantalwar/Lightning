const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//Exit Message
prisma.$on('beforeExit', async () => {
    console.log('Connection Closed.')
})

//Gets one node With filter Array
async function prismaGetOne(collection, filters = {}){
    try{
        const one = await prisma[collection].findFirst(filters)
        return one
    } finally {
        console.log('Data Queried.')
    }
}

//Gets many nodes With filter Array
async function prismaGet(collection, filters = {}){
    try{
        const many = await prisma[collection].findMany(filters)
        return many
    } finally {
        console.log('Data Queried.')
    }
}

module.exports={
    prismaGetOne,
    prismaGet
}