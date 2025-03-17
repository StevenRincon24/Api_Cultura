const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/hotels.json');

class Hotel {
  constructor(name, contact, address, imageUrl) {
    this.name = name;
    this.contact = contact;
    this.address = address;
    this.imageUrl = imageUrl;
    this.id = Date.now().toString();
    this.createdAt = new Date().toISOString();
  }

  static async getAll() {
    try {
      const data = await fs.readFile(dataPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If file doesn't exist, return empty array
        return [];
      }
      throw error;
    }
  }

  async save() {
    try {
      // Ensure the data directory exists
      await fs.mkdir(path.dirname(dataPath), { recursive: true });
      
      // Get existing hotels
      let hotels = await Hotel.getAll();
      
      // Add new hotel
      hotels.push(this);
      
      // Save to file
      await fs.writeFile(dataPath, JSON.stringify(hotels, null, 2));
      return this;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Hotel;