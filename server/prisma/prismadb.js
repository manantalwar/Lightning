const { PrismaClient } = require('@prisma/client')

async function prismaGetOne(collection){
    const prisma = new PrismaClient()
    try{
        const one = await prisma[collection].findFirst()
        return one
    }
    finally{
        await prisma.$disconnect()
    }
}

//Filters Type Def:
async function prismaGet(collection, filters = {}){
    const prisma = new PrismaClient()
    try{
        const many = await prisma[collection].findMany(filters)
        return many
    }
    finally{
        await prisma.$disconnect()
    }
}

module.exports={
    prismaGetOne,
    prismaGet
}