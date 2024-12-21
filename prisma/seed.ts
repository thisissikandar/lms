const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        {  name: "Music"},
        {  name: "Photography"},
        {  name: "Fitness"},
        {  name: "Accounting"},
        {  name: "Computer Science"},
        {  name: "Filming"},
        {  name: "Engeenering"},
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