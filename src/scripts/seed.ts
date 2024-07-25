const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {  name: "Computer Science"},
        {  name: "Music"},
        {  name: "Fitness"},
        {  name: "Photography"},
        {  name: "Director"},
        {  name: "Actor"},
      ],
    });
    console.log("Successfully created category");
  } catch (error) {
    console.log("error to seed category to database", error);
  } finally {
    await database.$disconnect();
  }
}
main()