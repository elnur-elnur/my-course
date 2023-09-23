const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Fitness" },
        { name: "Filming" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Design" },
        { name: "AI" },
      ],
    });

    console.log("success");
  } catch (error) {
    console.log("seeding error", error);
  } finally {
    await database.$disconnect();
  }
}

main();
