# Final Project MVP - Backend

## Overview
This repository contains the MVP REST API for the final project. Built with Express, Sequelize, and SQLite. It includes 3 resource types with relationships:

- Owner (hasMany Car)
- Car (belongsTo Owner, hasMany Part)
- Part (belongsTo Car)

Features:
- Full CRUD for each resource
- Proper status codes and error handling
- Basic middleware: JSON parsing, logging, error handler
- Seed script with sample data
- Initial unit tests (Jest + Supertest)

## Quick start (local)

1. Clone repo
```bash
git clone <https://github.com/Dontesamuels/final-project-for-backend.git>
cd final-project-mvp
