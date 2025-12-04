const { Owner, Car, sequelize } = require('../models');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const owners = await Owner.bulkCreate([
      { name: "John Doe" },
      { name: "Sarah Lee" },
    ]);

    await Car.bulkCreate([
      { make: "Honda", model: "Civic", year: 2020, ownerId: owners[0].id },
      { make: "Toyota", model: "Camry", year: 2021, ownerId: owners[1].id }
    ]);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
