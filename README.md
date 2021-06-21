<div align="center">
	<img width="80" src="https://raw.githubusercontent.com/CirclesUBI/.github/main/assets/logo.svg" />
</div>

<h1 align="center">slimemold-service</h1>

<div align="center">
 <strong>
  Trust network and transitive transfer finding API service
 </strong>
</div>

<br />

<div align="center">
  <!-- Licence -->
  <a href="https://github.com/CirclesUBI/slimemold-serice/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/CirclesUBI/slimemold-service?style=flat-square&color=%23cc1e66" alt="License" height="18">
  </a>
  <!-- Discourse -->
  <a href="https://aboutcircles.com/">
    <img src="https://img.shields.io/discourse/topics?server=https%3A%2F%2Faboutcircles.com%2F&style=flat-square&color=%23faad26" alt="chat" height="18"/>
  </a>
  <!-- Twitter -->
  <a href="https://twitter.com/CirclesUBI">
    <img src="https://img.shields.io/twitter/follow/circlesubi.svg?label=twitter&style=flat-square&color=%23f14d48" alt="Follow Circles" height="18">
  </a>
</div>

<div align="center">
  <h3>
    <a href="https://handbook.joincircles.net">
      Handbook
    </a>
    <span> | </span>
    <a href="https://github.com/CirclesUBI/slimemold-service/releases">
      Releases
    </a>
    <span> | </span>
    <a href="https://github.com/CirclesUBI/.github/blob/main/CONTRIBUTING.md">
      Contributing
    </a>
  </h3>
</div>

<br/>

Off-chain API service for [`Circles`] to find transitive transfer steps to send tokens within the trust graph.

[`circles`]: https://joincircles.net

## Features

- Indexes and stores Circles trust network
- Calculate transitive transfer steps to send tokens

## Requirements

- NodeJS environment (v14)

## Development

```bash
# Install dependencies
npm install

# Copy .env file for local development
cp .env.example .env

# Check code formatting
npm run lint

# Start local server and watch changes
npm run watch

# Run tests via `jest`
npm run test
npm run test:watch
```

## Deployment

```bash
# Clean `./dist` folder from previous builds
npm run clean

# Build project files and copy them to `./dist` folder
npm run build

# Start node process
npm run start
```

## License

GNU Affero General Public License v3.0 [`AGPL-3.0`]

[`AGPL-3.0`]: LICENSE
