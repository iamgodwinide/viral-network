# Viral Network Game Frontend

The **Viral Network Game** is an interactive web-based simulation inspired by Plague Inc., where players aim to spread information globally, visualizing virality on a world map. Unlike traditional simulations, this game displays the spread based on real-time transactions and other factors. Built using **Next.js** and **Mapbox API**, this frontend renders dynamic pop-ups, markers, and interactive data visualizations that change based on user input and external data.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Global Virality Map**: Uses Mapbox for real-time, interactive visualization of viral spread across different regions.
- **Dynamic Pop-ups**: Displays factors that affect information spread, including "Word of Mouth," "Internet," "Books," and more.
- **Transaction-based Spread**: The game's virality is influenced by the number of Solana token transactions.
- **User Interactivity**: Players can observe and influence the spread of information in various ways, adjusting different factors and strategies.
- **Responsive Design**: Fully responsive and optimized for desktop and mobile viewing.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Map Integration**: [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- **Database**: MongoDB (used via an API to fetch data on virality)

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **MongoDB** database access (you can use MongoDB Atlas for a cloud database)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/viral-network-game.git
   cd viral-network-game
   ```

2. **Clone the repository**:

   ```bash
    npm install
   ```

3. **Clone the repository**:

   ```bash
    NEXT_PUBLIC_MAPBOX_KEY=your_mapbox_public_key
    NEXT_MONGODB_URI=your_mongodb_uri
   ```

4. **Clone the repository**:
   ```bash
    npm run dev
   ```

The app will be available at http://localhost:3000.

### Environmental Variables

The project requires the following environment variables:

- **NEXT_PUBLIC_MAPBOX_KEY**: Your Mapbox public key for map rendering
- **NEXT_MONGODB_URI**: MongoDB connection string for connecting to your MongoDB instance.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
