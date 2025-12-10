// seeders/seed-users.js (run this from your seed step)
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../models');

async function seed() {
  await sequelize.sync({ force: true }); // careful: force:true wipes tables
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('AdminPass123!', salt);
  await User.create({ email: 'admin@example.com', passwordHash: adminPasswordHash, role: 'admin' });
  await User.create({ email: 'user@example.com', passwordHash: await bcrypt.hash('UserPass123!', salt), role: 'user' });
  console.log('Seeded users');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
