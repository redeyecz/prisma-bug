# How to run
Use docker-compose to run

The init script (packages.json - scripts) includes:
* npm ci
* npx prisma generate
* npx prisma migrate dev -n init
* npx ts-node app.ts

It means the startup is a bit slow, since it always runs all these, but you don't have to fiddle with anything else

Docker creates 2 containers - postgres database from alpine image and a node image which uses host binds to add the project folder inside
