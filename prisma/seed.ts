import { hashSync } from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "luisma@deepmetric.fit";
  const password = "Admin123!";
  const passwordHash = hashSync(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", name: "Luisma" },
    create: {
      email,
      name: "Luisma",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user created/updated: ${user.email} (${user.id})`);
  console.log(`   Password: ${password}`);
  console.log(`   Role: ${user.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
