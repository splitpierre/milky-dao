# Milky DAO 🌌

## Hackathon Submission Notice:

The hackathon submission was tagged at [1a0cfbd](https://github.com/splitpierre/milky-dao/commit/1a0cfbde34ff5d755a5a00fc40a30bb96cb4c479) - [v0.0.1-hackathon](https://github.com/splitpierre/milky-dao/tree/v0.0.1-hackathon), can also be downloaded at [Release Tags](https://github.com/splitpierre/milky-dao/tags). Work is and will be continuing after the Hackathon submission from this commit onwards, [read commits for more](https://github.com/splitpierre/milky-dao/commits/main).

## Short Description

A governance aggregator to analyze & vote on Cardano DAO projects.

## Long Description

In a world with many kinds of DAOs and voting mechanisms, the need for a smart/flexible DAO aggregator eventually arises.

This platform is intended to allow aggregation, analyzing, integration and voting with the many kinds of Cardano DAOs.

Users can vote on projects, or own/manage projects as well as integrate with the platform via an exposed API that will facilitate third-party integrations with the platform governance API.

## Pitch Video

- https://www.dropbox.com/s/5qcgjmx4vlmjcwy/2022-09-27%2014-54-38.mkv?dl=0

## Tech Stack

- Front-end:
  - Stack:
    - [Astro Build](https://astro.build/)
    - [SolidJS](https://www.solidjs.com/)
    - [Nanostores](https://github.com/nanostores/nanostores)
  - Description:
    - The given stack was picked as an experiment using latest front-end technologies and techniques (against React) to provide much faster page-loads, using MPA architecture, leveraging server-side rendering, and making use Component Island architecture, to render the application as fast as possible (MUCH faster than React SPAs).
- Back-end:
  - Stack
    - [NestJS](https://docs.nestjs.com/)
    - [NodeJS](https://nodejs.dev/en/)
    - [Prisma](https://prisma.io/)
    - [Swagger](https://swagger.io/)
    - MySQL with PostgreSQL compatibility
  - Description:
    - NestJS framework provides a powerful foundation for building, modeling and deploying scalable APIs, it follows exceptional standards and combines elements of OOP (Object Oriented Programming), FP (Functional Programming) and FRP (Functional Reactive Programming), enforcing best practices across developers.
- Deployment:
  - [Vercel](https://vercel.com/) - Frontend
  - [Heroku](https://heroku.com/) - API Server
  - [PlanetScale](https://planetscale.com/) - Database

## Demo & Links

- Project Website
  - https://milky-dao.vercel.app/
- Project API (Swagger)
  - https://milky-dao-api.herokuapp.com/api

## Project Structure

- [src/](src/) - Frontend
- [server/](server/) - Backend
- [server/prisma/](server/prisma/) - Prisma Schemas

## Screens and graphic material

- Current project assets [src/assets/](src/assets/)
- Figma for intended layout [Figma File](https://www.figma.com/file/f0uA5u7FgFkaKVDadjUu7h/Milky-DAO?node-id=2%3A2)

## How to build & run the Frontend

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Install dependencies                               |
| `npm run dev`          | Start local dev server at `localhost:3000`         |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |
| `npm run format`       | Format code with [Prettier](https://prettier.io/)  |
| `npm run clean`        | Remove `node_modules` and build output             |

## How to build & run the Backend

- [server/README.md](server/README.md)

## Developed by

- Pierre Maciel (https://github.com/splitpierre)
- Milkomeda Address: 0x74C79ac48508add750d44348Fe65f5EFB51a4142

## License

Milky DAO is [MIT licensed](LICENSE).
