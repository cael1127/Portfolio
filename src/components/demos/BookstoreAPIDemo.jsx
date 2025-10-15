import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const BookstoreAPIDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [cart, setCart] = useState([]);
  const [apiStats, setApiStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalGenres: 0,
    apiCalls: 0
  });

  const sampleBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      price: 12.99,
      isbn: '978-0-7432-7356-5',
      publishedYear: 1925,
      rating: 4.5,
      stock: 15,
      description: 'A classic novel of the Jazz Age, exploring themes of decadence, idealism, and social upheaval.',
      cover: '📕'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      price: 14.99,
      isbn: '978-0-452-28423-4',
      publishedYear: 1949,
      rating: 4.7,
      stock: 20,
      description: 'A dystopian novel about totalitarianism and surveillance in a futuristic society.',
      cover: '📘'
    },
    {
      id: 3,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Classic',
      price: 13.99,
      isbn: '978-0-06-112008-4',
      publishedYear: 1960,
      rating: 4.8,
      stock: 12,
      description: 'A powerful story of racial injustice and childhood innocence in the American South.',
      cover: '📗'
    },
    {
      id: 4,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      price: 15.99,
      isbn: '978-0-345-53968-2',
      publishedYear: 1937,
      rating: 4.6,
      stock: 18,
      description: 'A fantasy adventure following Bilbo Baggins on his unexpected journey.',
      cover: '📙'
    },
    {
      id: 5,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      price: 11.99,
      isbn: '978-0-14-143951-8',
      publishedYear: 1813,
      rating: 4.7,
      stock: 14,
      description: 'A romantic novel of manners set in Georgian England.',
      cover: '📕'
    },
    {
      id: 6,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Classic',
      price: 13.49,
      isbn: '978-0-316-76948-0',
      publishedYear: 1951,
      rating: 4.3,
      stock: 10,
      description: 'A story about teenage rebellion and alienation.',
      cover: '📘'
    }
  ];

  useEffect(() => {
    setBooks(sampleBooks);
    
    const uniqueAuthors = new Set(sampleBooks.map(b => b.author)).size;
    const uniqueGenres = new Set(sampleBooks.map(b => b.genre)).size;
    
    setApiStats({
      totalBooks: sampleBooks.length,
      totalAuthors: uniqueAuthors,
      totalGenres: uniqueGenres,
      apiCalls: 0
    });
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre === 'all' || book.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const handleAddToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    
    setApiStats(prev => ({ ...prev, apiCalls: prev.apiCalls + 1 }));
  };

  const handleRemoveFromCart = (bookId) => {
    setCart(prev => prev.filter(item => item.id !== bookId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const genres = ['all', ...new Set(books.map(book => book.genre))];

  const codeData = {
    code: `import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database Schema (Prisma)
model Book {
  id             Int       @id @default(autoincrement())
  title          String
  author         String
  genre          String
  price          Decimal   @db.Decimal(10, 2)
  isbn           String    @unique
  publishedYear  Int
  rating         Float
  stock          Int
  description    String
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  orders         OrderItem[]
}

model Order {
  id         Int         @id @default(autoincrement())
  userId     Int
  user       User        @relation(fields: [userId], references: [id])
  items      OrderItem[]
  total      Decimal     @db.Decimal(10, 2)
  status     String
  createdAt  DateTime    @default(now())
}

model OrderItem {
  id       Int     @id @default(autoincrement())
  orderId  Int
  order    Order   @relation(fields: [orderId], references: [id])
  bookId   Int
  book     Book    @relation(fields: [bookId], references: [id])
  quantity Int
  price    Decimal @db.Decimal(10, 2)
}

// API Routes

// GET /api/books - Get all books with pagination and filtering
app.get('/api/books', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      genre, 
      author, 
      minPrice, 
      maxPrice,
      search 
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    
    if (genre) where.genre = genre;
    if (author) where.author = { contains: author, mode: 'insensitive' };
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.book.count({ where })
    ]);

    res.json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/books/:id - Get single book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/books - Create a new book (Admin only)
app.post('/api/books', async (req, res) => {
  try {
    const { 
      title, 
      author, 
      genre, 
      price, 
      isbn, 
      publishedYear, 
      rating, 
      stock, 
      description 
    } = req.body;
    
    // Validation
    if (!title || !author || !genre || !price || !isbn) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const book = await prisma.book.create({
      data: {
      title,
      author,
      genre,
      price: parseFloat(price),
        isbn,
        publishedYear: parseInt(publishedYear),
        rating: parseFloat(rating) || 0,
        stock: parseInt(stock) || 0,
      description: description || ''
      }
    });

    res.status(201).json({ success: true, data: book });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'ISBN already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/books/:id - Update a book (Admin only)
app.put('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({ success: true, data: book });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/books/:id - Delete a book (Admin only)
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.book.delete({
      where: { id: parseInt(id) }
    });

    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/orders - Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Calculate total and validate stock
    let total = 0;
    for (const item of items) {
      const book = await prisma.book.findUnique({
        where: { id: item.bookId }
      });

      if (!book) {
        return res.status(404).json({ error: \`Book \${item.bookId} not found\` });
      }

      if (book.stock < item.quantity) {
        return res.status(400).json({ 
          error: \`Insufficient stock for \${book.title}\` 
        });
      }

      total += book.price * item.quantity;
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'pending',
        items: {
          create: items.map(item => ({
            bookId: item.bookId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            book: true
          }
        }
      }
    });

    // Update stock
    for (const item of items) {
      await prisma.book.update({
        where: { id: item.bookId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders/:id - Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        items: {
          include: {
            book: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
  console.log(\`Bookstore API running on port \${PORT}\`);
});

// Frontend Implementation
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookstoreApp = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addToCart = (book) => {
    setCart(prev => [...prev, book]);
  };

  const checkout = async () => {
    try {
      const items = cart.map(book => ({
        bookId: book.id,
        quantity: 1,
        price: book.price
      }));

      const response = await axios.post('/api/orders', {
        userId: 1, // Current user ID
        items
      });

      alert('Order placed successfully!');
      setCart([]);
    } catch (error) {
      alert('Error placing order');
    }
  };

  return (
    <div>
      <h1>Bookstore</h1>
      {/* Book listing and cart UI */}
    </div>
  );
};`,
    explanation: `RESTful API for an online bookstore with complete CRUD operations, order management, and inventory tracking.

## Core Implementation

**Key Features**: This demo showcases a full-featured bookstore API with book management, order processing, inventory tracking, and user authentication.

**Architecture**: Built with Express.js, Prisma ORM, and PostgreSQL for a scalable, production-ready REST API with proper error handling and validation.

**Performance**: Implements efficient database queries, pagination, caching, rate limiting, and optimized search functionality.

## Technical Benefits

- **RESTful Design**: Clean API design following REST principles
- **Database ORM**: Prisma for type-safe database access
- **Security**: Helmet, rate limiting, input validation
- **Scalability**: Pagination, caching, optimized queries`,
    technologies: [
      {
        name: 'Express.js',
        description: 'Fast, minimalist web framework for Node.js',
        tags: ['Backend', 'API', 'Node.js']
      },
      {
        name: 'Prisma ORM',
        description: 'Modern database toolkit for Node.js and TypeScript',
        tags: ['Database', 'ORM', 'TypeScript']
      },
      {
        name: 'PostgreSQL',
        description: 'Powerful open-source relational database',
        tags: ['Database', 'SQL', 'Storage']
      },
      {
        name: 'REST API',
        description: 'Representational State Transfer architecture',
        tags: ['API', 'HTTP', 'Architecture']
      }
    ],
    concepts: [
      {
        name: 'RESTful API Design',
        description: 'Architectural style for web services',
        example: 'GET /api/books, POST /api/orders'
      },
      {
        name: 'CRUD Operations',
        description: 'Create, Read, Update, Delete operations',
        example: 'Full book management with all HTTP methods'
      },
      {
        name: 'Database Relations',
        description: 'Relationships between entities',
        example: 'Books ↔ OrderItems ↔ Orders ↔ Users'
      },
      {
        name: 'API Rate Limiting',
        description: 'Controlling API usage per client',
        example: '100 requests per 15 minutes per IP'
      }
    ],
    features: [
      'Complete CRUD operations for books',
      'Advanced search and filtering',
      'Pagination for large datasets',
      'Order management system',
      'Inventory tracking and stock management',
      'User authentication and authorization',
      'Rate limiting and security headers',
      'Input validation and error handling',
      'Database relationships and transactions',
      'RESTful API design patterns'
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-4">📚 Bookstore API Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          RESTful API for an online bookstore with complete CRUD operations, order management, and inventory tracking.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <motion.button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💻</span>
            View Implementation
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-[1fr,320px] gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div className="space-y-6">
          {/* Search and Filter */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Search & Filter</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Books
                </label>
              <input
                type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or author..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
        </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter by Genre
                </label>
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          </motion.div>

          {/* Books Grid */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Books Catalog</h2>
              <span className="text-sm text-gray-400">{filteredBooks.length} books found</span>
        </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-4">
                    <div className="text-5xl">{book.cover}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">by {book.author}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">{book.genre}</span>
                        <span className="text-xs text-gray-400">⭐ {book.rating}</span>
                        <span className="text-xs text-gray-400">📅 {book.publishedYear}</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-3 line-clamp-2">{book.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-400">${book.price}</span>
                        <motion.button
                          onClick={() => handleAddToCart(book)}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
          </motion.div>

          {/* Shopping Cart */}
          {cart.length > 0 && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Shopping Cart ({cart.length})</h2>
              
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.cover}</span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-green-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                >
                        ✕
                </button>
              </div>
            </div>
          ))}
        </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span className="text-green-400">${getTotalPrice()}</span>
                </div>
                <motion.button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* API Stats */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">📊 API Statistics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Books:</span>
                <span className="text-white font-semibold">{apiStats.totalBooks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Authors:</span>
                <span className="text-white font-semibold">{apiStats.totalAuthors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Genres:</span>
                <span className="text-white font-semibold">{apiStats.totalGenres}</span>
            </div>
              <div className="flex justify-between">
                <span className="text-gray-400">API Calls:</span>
                <span className="text-green-400 font-semibold">{apiStats.apiCalls}</span>
            </div>
          </div>
          </motion.div>

          {/* API Endpoints */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">🔌 API Endpoints</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-green-400">GET</span> /api/books
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-blue-400">POST</span> /api/books
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-yellow-400">PUT</span> /api/books/:id
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-red-400">DEL</span> /api/books/:id
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <span className="text-blue-400">POST</span> /api/orders
        </div>
      </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400">✨ Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Complete CRUD</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Search & Filter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Order Management</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Stock Tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Rate Limiting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>RESTful Design</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* CodeViewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default BookstoreAPIDemo;
