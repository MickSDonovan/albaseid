import { prisma } from "./index.js";
import { faker } from "@faker-js/faker";

async function main() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
    });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true, // évite les erreurs si email doublon
  });

  console.log("✅ 100 utilisateurs générés !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
