// Web Scraping Utility for Portfolio Demos
// Note: Due to CORS restrictions, we'll use public APIs and simulate real data fetching

class WebScraper {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Check if cached data is still valid
  isCacheValid(key) {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheTimeout;
  }

  // Get cached data or fetch new data
  async getCachedData(key, fetchFunction) {
    if (this.isCacheValid(key)) {
      return this.cache.get(key).data;
    }

    try {
      const data = await fetchFunction();
      this.cache.set(key, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  // Fetch cryptocurrency data
  async getCryptoData() {
    return this.getCachedData('crypto', async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        return Object.entries(data).map(([id, info]) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          price: info.usd,
          change24h: info.usd_24h_change,
          symbol: id.toUpperCase().slice(0, 3)
        }));
      } catch (error) {
        // Fallback to simulated data
        return [
          { id: 'bitcoin', name: 'Bitcoin', price: 45000 + Math.random() * 5000, change24h: (Math.random() - 0.5) * 10, symbol: 'BTC' },
          { id: 'ethereum', name: 'Ethereum', price: 3000 + Math.random() * 500, change24h: (Math.random() - 0.5) * 8, symbol: 'ETH' },
          { id: 'cardano', name: 'Cardano', price: 1.5 + Math.random() * 0.5, change24h: (Math.random() - 0.5) * 12, symbol: 'ADA' },
          { id: 'polkadot', name: 'Polkadot', price: 25 + Math.random() * 5, change24h: (Math.random() - 0.5) * 15, symbol: 'DOT' }
        ];
      }
    });
  }

  // Fetch stock market data
  async getStockData() {
    return this.getCachedData('stocks', async () => {
      try {
        // Using Alpha Vantage API (free tier)
        const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
        const stockData = [];
        
        for (const symbol of symbols) {
          try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`);
            const data = await response.json();
            
            if (data['Global Quote']) {
              const quote = data['Global Quote'];
              stockData.push({
                symbol,
                price: parseFloat(quote['05. price']),
                change: parseFloat(quote['09. change']),
                changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
                volume: parseInt(quote['06. volume'])
              });
            }
          } catch (error) {
            // Fallback for individual stock
            stockData.push({
              symbol,
              price: 100 + Math.random() * 200,
              change: (Math.random() - 0.5) * 10,
              changePercent: (Math.random() - 0.5) * 5,
              volume: 1000000 + Math.random() * 5000000
            });
          }
        }
        
        return stockData;
      } catch (error) {
        // Fallback to simulated data
        return [
          { symbol: 'AAPL', price: 150 + Math.random() * 20, change: (Math.random() - 0.5) * 5, changePercent: (Math.random() - 0.5) * 3, volume: 50000000 },
          { symbol: 'GOOGL', price: 2800 + Math.random() * 200, change: (Math.random() - 0.5) * 15, changePercent: (Math.random() - 0.5) * 2, volume: 20000000 },
          { symbol: 'MSFT', price: 300 + Math.random() * 30, change: (Math.random() - 0.5) * 8, changePercent: (Math.random() - 0.5) * 4, volume: 35000000 },
          { symbol: 'TSLA', price: 800 + Math.random() * 100, change: (Math.random() - 0.5) * 20, changePercent: (Math.random() - 0.5) * 6, volume: 25000000 },
          { symbol: 'AMZN', price: 3500 + Math.random() * 300, change: (Math.random() - 0.5) * 25, changePercent: (Math.random() - 0.5) * 3, volume: 15000000 }
        ];
      }
    });
  }

  // Fetch weather data
  async getWeatherData(city = 'New York') {
    return this.getCachedData(`weather_${city}`, async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
        const data = await response.json();
        
        return {
          city: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure
        };
      } catch (error) {
        // Fallback to simulated weather data
        return {
          city,
          temperature: 20 + (Math.random() - 0.5) * 20,
          humidity: 40 + Math.random() * 40,
          description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
          windSpeed: Math.random() * 20,
          pressure: 1000 + Math.random() * 50
        };
      }
    });
  }

  // Fetch news data
  async getNewsData(category = 'technology') {
    return this.getCachedData(`news_${category}`, async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=YOUR_API_KEY`);
        const data = await response.json();
        
        return data.articles.slice(0, 10).map(article => ({
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name
        }));
      } catch (error) {
        // Fallback to simulated news data
        const techNews = [
          { title: 'AI Breakthrough in Machine Learning', description: 'New algorithm shows 40% improvement in accuracy', source: 'TechCrunch', publishedAt: new Date().toISOString() },
          { title: 'Blockchain Adoption Increases', description: 'Major corporations adopting blockchain technology', source: 'CoinDesk', publishedAt: new Date().toISOString() },
          { title: 'Cloud Computing Trends 2024', description: 'Multi-cloud strategies becoming standard', source: 'TechRadar', publishedAt: new Date().toISOString() },
          { title: 'Cybersecurity Threats Rise', description: 'New zero-day vulnerabilities discovered', source: 'Security Weekly', publishedAt: new Date().toISOString() },
          { title: 'Quantum Computing Progress', description: 'IBM announces new quantum processor', source: 'MIT Tech Review', publishedAt: new Date().toISOString() }
        ];
        
        return techNews.map(news => ({
          ...news,
          url: '#',
          publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString()
        }));
      }
    });
  }

  // Fetch job market data
  async getJobData() {
    return this.getCachedData('jobs', async () => {
      try {
        // Simulate job market data since most job APIs require authentication
        const jobTitles = [
          'Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Frontend Developer',
          'Backend Developer', 'Full Stack Developer', 'Product Manager', 'UX Designer',
          'Machine Learning Engineer', 'Cloud Architect', 'Security Engineer', 'QA Engineer'
        ];
        
        const companies = [
          'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Uber', 'Airbnb',
          'Twitter', 'LinkedIn', 'Salesforce', 'Adobe', 'Oracle', 'IBM', 'Intel', 'NVIDIA'
        ];
        
        const locations = [
          'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Boston, MA',
          'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Atlanta, GA', 'Portland, OR'
        ];
        
        return Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
          company: companies[Math.floor(Math.random() * companies.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          salary: Math.floor(80000 + Math.random() * 120000),
          type: ['Full-time', 'Part-time', 'Contract', 'Remote'][Math.floor(Math.random() * 4)],
          postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          skills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker'].slice(0, Math.floor(Math.random() * 4) + 2)
        }));
      } catch (error) {
        return [];
      }
    });
  }

  // Fetch real estate data
  async getRealEstateData() {
    return this.getCachedData('realestate', async () => {
      try {
        // Simulate real estate data
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
        const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Studio'];
        
        return Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          address: `${Math.floor(Math.random() * 9999)} ${['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr'][Math.floor(Math.random() * 5)]}`,
          city: cities[Math.floor(Math.random() * cities.length)],
          price: Math.floor(200000 + Math.random() * 800000),
          bedrooms: Math.floor(Math.random() * 4) + 1,
          bathrooms: Math.floor(Math.random() * 3) + 1,
          sqft: Math.floor(800 + Math.random() * 2000),
          type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          listedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          image: `https://picsum.photos/400/300?random=${i}`
        }));
      } catch (error) {
        return [];
      }
    });
  }

  // Fetch restaurant data
  async getRestaurantData() {
    return this.getCachedData('restaurants', async () => {
      try {
        // Simulate restaurant data
        const restaurantNames = [
          'The Golden Plate', 'Sakura Sushi', 'Pizza Palace', 'Burger Barn', 'Taco Town',
          'Noodle House', 'Steak & Grill', 'Vegan Delight', 'Seafood Shack', 'Dessert Dream'
        ];
        
        const cuisines = ['Italian', 'Japanese', 'Mexican', 'American', 'Chinese', 'Thai', 'Indian', 'French', 'Mediterranean', 'Korean'];
        
        return Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          name: restaurantNames[Math.floor(Math.random() * restaurantNames.length)],
          cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
          rating: (4 + Math.random()).toFixed(1),
          priceRange: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)],
          deliveryTime: Math.floor(20 + Math.random() * 40),
          minOrder: Math.floor(10 + Math.random() * 20),
          image: `https://picsum.photos/300/200?random=${i + 100}`
        }));
      } catch (error) {
        return [];
      }
    });
  }

  // Fetch healthcare data
  async getHealthcareData() {
    return this.getCachedData('healthcare', async () => {
      try {
        // Simulate healthcare metrics
        return {
          patients: {
            total: 1250 + Math.floor(Math.random() * 500),
            active: 890 + Math.floor(Math.random() * 200),
            discharged: 360 + Math.floor(Math.random() * 100)
          },
          vitals: {
            heartRate: 70 + Math.floor(Math.random() * 30),
            bloodPressure: '120/80',
            temperature: 98.6 + (Math.random() - 0.5) * 2,
            oxygenSaturation: 95 + Math.floor(Math.random() * 5)
          },
          medications: [
            { name: 'Aspirin', dosage: '81mg', frequency: 'Daily' },
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily' },
            { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
          ],
          appointments: Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            patient: `Patient ${i + 1}`,
            doctor: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`,
            time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            type: ['Checkup', 'Consultation', 'Procedure', 'Follow-up'][Math.floor(Math.random() * 4)]
          }))
        };
      } catch (error) {
        return null;
      }
    });
  }

  // Fetch traffic data
  async getTrafficData() {
    return this.getCachedData('traffic', async () => {
      try {
        // Simulate traffic data
        const intersections = [
          'Main St & Oak Ave', 'Pine Rd & Elm St', 'Maple Dr & Cedar Ln',
          'Washington Blvd & Jefferson St', 'Lincoln Ave & Roosevelt Rd'
        ];
        
        return intersections.map(intersection => ({
          location: intersection,
          congestion: Math.floor(Math.random() * 100),
          averageSpeed: Math.floor(20 + Math.random() * 40),
          vehicleCount: Math.floor(50 + Math.random() * 200),
          signalStatus: ['Green', 'Yellow', 'Red'][Math.floor(Math.random() * 3)]
        }));
      } catch (error) {
        return [];
      }
    });
  }

  // Fetch environmental data
  async getEnvironmentalData() {
    return this.getCachedData('environmental', async () => {
      try {
        // Simulate environmental sensor data
        return {
          airQuality: {
            pm25: Math.floor(10 + Math.random() * 50),
            pm10: Math.floor(20 + Math.random() * 80),
            co2: Math.floor(400 + Math.random() * 200),
            index: Math.floor(1 + Math.random() * 5)
          },
          weather: {
            temperature: 20 + (Math.random() - 0.5) * 20,
            humidity: 40 + Math.random() * 40,
            pressure: 1000 + Math.random() * 50,
            windSpeed: Math.random() * 20
          },
          noise: {
            level: Math.floor(40 + Math.random() * 40),
            peak: Math.floor(60 + Math.random() * 40),
            average: Math.floor(50 + Math.random() * 20)
          }
        };
      } catch (error) {
        return null;
      }
    });
  }
}

export default new WebScraper(); 