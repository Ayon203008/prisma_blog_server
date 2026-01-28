import app from "./app"
import { prisma } from "./lib/prisma"

const PORT = process.env.PORT || 3000

async function main() {
    try {
        await prisma.$connect()
        console.log("Connected to the database successfully")

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (err) {
        console.log(err)
        // if any error happend then disconnect the prisma
        await prisma.$disconnect()
        process.exit(1)
    }
}

// * Must call the main function here
// * npx tsx watch src/server.ts --> For run the project
main()