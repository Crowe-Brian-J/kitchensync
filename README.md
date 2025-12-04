# KitchenSync

A self-hosted grocery inventory management app that helps you keep track of what's in your kitchen, what you need to buy, and what needs to be used or discarded.

## Features

- **Inventory Tracking**: Keep a comprehensive list of groceries you have on hand
- **Shopping List**: Manage items you need to purchase
- **Expiration Management**: Track items that need to be used soon or have expired
- **Local Storage**: Everything is stored locally—no cloud dependencies, no data sharing with third parties
- **Easy to Use**: Simple, intuitive interface designed for everyone

## Getting Started

### Prerequisites

- Docker (or local installation of required services)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Crowe-Brian-J/kitchensync.git
cd kitchensync
```

2. Start the application:
```bash
# Using Docker (recommended)
docker-compose up
```

3. Open your browser and navigate to `http://localhost:3000`

## Architecture

KitchenSync includes:
- **Frontend**: React-based web interface for easy navigation
- **Backend**: REST API for managing inventory data
- **Database**: Local PostgreSQL (via Docker) for persistent storage

## Usage

### Adding Items
- Click "Add Item" to add groceries to your inventory
- Specify item name, quantity, and expiration date (optional)

### Shopping List
- View items marked as "need to buy"
- Check off items as you purchase them

### Managing Expiration
- See items approaching expiration dates
- Mark items as expired for removal
- Track what needs to be used soon

## Configuration

Configuration options are available in `config/` directory. All data is stored locally.

## Development

### Setting up the development environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Privacy

All data is stored locally on your machine. No information is sent to external servers. You have full control over your grocery data.

## License

MIT

## Support

For issues or feature requests, please open an issue on GitHub.

