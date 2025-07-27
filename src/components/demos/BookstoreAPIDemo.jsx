import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const BookstoreAPIDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState('GET /api/books');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState(null);
  const [logs, setLogs] = useState([]);

  // Simulate database
  const initialBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', price: 12.99, stock: 15 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', price: 11.99, stock: 8 },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 10.99, stock: 12 },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', price: 9.99, stock: 20 },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', price: 14.99, stock: 6 }
  ];

  useEffect(() => {
    setBooks(initialBooks);
  }, []);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
  };

  // Simulate API calls
  const simulateAPI = async (method, endpoint, data = null) => {
    setIsLoading(true);
    addLog(`${method} ${endpoint}`, 'request');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let result;
    switch (endpoint) {
      case '/api/books':
        if (method === 'GET') {
          result = { status: 200, data: books };
        } else if (method === 'POST') {
          const newBook = { ...data, id: books.length + 1 };
          setBooks(prev => [...prev, newBook]);
          result = { status: 201, data: newBook };
        }
        break;
        
      case '/api/books/1':
      case '/api/books/2':
      case '/api/books/3':
      case '/api/books/4':
      case '/api/books/5':
        const id = parseInt(endpoint.split('/').pop());
        const book = books.find(b => b.id === id);
        
        if (method === 'GET') {
          result = book ? { status: 200, data: book } : { status: 404, error: 'Book not found' };
        } else if (method === 'PUT') {
          const updatedBooks = books.map(b => b.id === id ? { ...b, ...data } : b);
          setBooks(updatedBooks);
          result = { status: 200, data: { ...book, ...data } };
        } else if (method === 'DELETE') {
          setBooks(prev => prev.filter(b => b.id !== id));
          result = { status: 204 };
        }
        break;
        
      case '/api/books/search':
        const query = data?.query?.toLowerCase() || '';
        const filteredBooks = books.filter(book => 
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
        );
        result = { status: 200, data: filteredBooks };
        break;
        
      default:
        result = { status: 404, error: 'Endpoint not found' };
    }

    addLog(`Response: ${result.status}`, result.status >= 400 ? 'error' : 'success');
    setResponse(result);
    setIsLoading(false);
    return result;
  };

  const handleEndpointClick = (method, endpoint) => {
    setActiveEndpoint(`${method} ${endpoint}`);
    setRequestBody('');
    setResponse(null);
    
    if (method === 'GET') {
      simulateAPI(method, endpoint);
    }
  };

  const handleSendRequest = () => {
    const [method, endpoint] = activeEndpoint.split(' ');
    
    let data = null;
    if (requestBody.trim()) {
      try {
        data = JSON.parse(requestBody);
      } catch (error) {
        addLog('Invalid JSON in request body', 'error');
        return;
      }
    }
    
    simulateAPI(method, endpoint, data);
  };

  const endpoints = [
    { method: 'GET', path: '/api/books', description: 'Get all books' },
    { method: 'GET', path: '/api/books/1', description: 'Get book by ID' },
    { method: 'POST', path: '/api/books', description: 'Create new book' },
    { method: 'PUT', path: '/api/books/1', description: 'Update book' },
    { method: 'DELETE', path: '/api/books/1', description: 'Delete book' },
    { method: 'GET', path: '/api/books/search', description: 'Search books' }
  ];

  const codeExample = `// Bookstore REST API with Express.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with real database in production)
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', price: 12.99, stock: 15 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', price: 11.99, stock: 8 },
  { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 10.99, stock: 12 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', price: 9.99, stock: 20 },
  { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', price: 14.99, stock: 6 }
];

// Validation middleware
const validateBook = (req, res, next) => {
  const { title, author, genre, price, stock } = req.body;
  
  if (!title || !author || !genre || !price || !stock) {
    return res.status(400).json({ 
      error: 'Missing required fields: title, author, genre, price, stock' 
    });
  }
  
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }
  
  if (typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({ error: 'Stock must be a non-negative number' });
  }
  
  next();
};

// Routes

// GET /api/books - Get all books
app.get('/api/books', (req, res) => {
  try {
    const { genre, author, minPrice, maxPrice } = req.query;
    let filteredBooks = [...books];
    
    // Apply filters
    if (genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }
    
    if (author) {
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredBooks = filteredBooks.filter(book => book.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      filteredBooks = filteredBooks.filter(book => book.price <= parseFloat(maxPrice));
    }
    
    res.json({
      success: true,
      data: filteredBooks,
      count: filteredBooks.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/books/:id - Get book by ID
app.get('/api/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/books - Create new book
app.post('/api/books', validateBook, (req, res) => {
  try {
    const { title, author, genre, price, stock } = req.body;
    
    // Check if book already exists
    const existingBook = books.find(book => 
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase()
    );
    
    if (existingBook) {
      return res.status(409).json({ error: 'Book already exists' });
    }
    
    const newBook = {
      id: Math.max(...books.map(b => b.id)) + 1,
      title,
      author,
      genre,
      price,
      stock,
      createdAt: new Date().toISOString()
    };
    
    books.push(newBook);
    
    res.status(201).json({
      success: true,
      data: newBook,
      message: 'Book created successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/books/:id - Update book
app.put('/api/books/:id', validateBook, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const updatedBook = {
      ...books[bookIndex],
      ...req.body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    books[bookIndex] = updatedBook;
    
    res.json({
      success: true,
      data: updatedBook,
      message: 'Book updated successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.status(204).json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/books/search - Search books
app.get('/api/books/search', (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    
    const query = q.toLowerCase();
    const searchResults = books.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query)
    );
    
    res.json({
      success: true,
      data: searchResults,
      count: searchResults.length,
      query: q
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">📚 Bookstore REST API</h1>
            <p className="text-gray-400">Express.js backend with full CRUD operations</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* API Testing Interface */}
          <div className="space-y-6">
            {/* Endpoints */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">🔗 API Endpoints</h3>
              <div className="grid grid-cols-1 gap-2">
                {endpoints.map((endpoint, index) => (
                  <button
                    key={index}
                    onClick={() => handleEndpointClick(endpoint.method, endpoint.path)}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      activeEndpoint === `${endpoint.method} ${endpoint.path}`
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{endpoint.method} {endpoint.path}</div>
                        <div className="text-xs opacity-70">{endpoint.description}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        endpoint.method === 'GET' ? 'bg-blue-600' :
                        endpoint.method === 'POST' ? 'bg-green-600' :
                        endpoint.method === 'PUT' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {endpoint.method}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Request Body */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">📝 Request Body</h3>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder="Enter JSON request body (for POST/PUT requests)..."
                className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-green-500"
              />
              <div className="mt-2 text-xs text-gray-400">
                Example: {"{"}"title": "New Book", "author": "Author Name", "genre": "Fiction", "price": 15.99, "stock": 10{"}"}
              </div>
            </div>

            {/* Send Request */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">🚀 Send Request</h3>
              <button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>📡</span>
                    <span>Send {activeEndpoint}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Response and Data */}
          <div className="space-y-6">
            {/* Response */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">📥 Response</h3>
              {response ? (
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      response.status >= 200 && response.status < 300 ? 'bg-green-600' :
                      response.status >= 400 ? 'bg-red-600' : 'bg-yellow-600'
                    }`}>
                      {response.status}
                    </span>
                    <span className="text-xs text-gray-400">{new Date().toLocaleTimeString()}</span>
                  </div>
                  <pre className="text-sm overflow-x-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="bg-gray-700 p-4 rounded-lg text-gray-400 text-center">
                  No response yet. Send a request to see the response.
                </div>
              )}
            </div>

            {/* Books Database */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">📚 Books Database</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => setSelectedBook(book)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">{book.title}</div>
                        <div className="text-sm text-gray-400">by {book.author}</div>
                        <div className="text-xs text-gray-500">{book.genre} • ${book.price} • Stock: {book.stock}</div>
                      </div>
                      <div className="text-xs bg-blue-600 px-2 py-1 rounded">ID: {book.id}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Logs */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">📋 API Logs</h3>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {logs.slice(-5).map((log, index) => (
                  <div key={index} className="text-xs flex items-center space-x-2">
                    <span className="text-gray-400">{log.timestamp}</span>
                    <span className={`px-2 py-1 rounded ${
                      log.type === 'error' ? 'bg-red-600' :
                      log.type === 'success' ? 'bg-green-600' :
                      'bg-blue-600'
                    }`}>
                      {log.type.toUpperCase()}
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Book Details */}
        {selectedBook && (
          <div className="mt-6 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">📖 Book Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-400">Title:</span>
                    <span className="ml-2 text-white font-semibold">{selectedBook.title}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Author:</span>
                    <span className="ml-2 text-white">{selectedBook.author}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Genre:</span>
                    <span className="ml-2 text-white">{selectedBook.genre}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <span className="ml-2 text-green-400 font-semibold">${selectedBook.price}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Stock:</span>
                    <span className={`ml-2 font-semibold ${
                      selectedBook.stock > 10 ? 'text-green-400' :
                      selectedBook.stock > 5 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {selectedBook.stock} units
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">ID:</span>
                    <span className="ml-2 text-blue-400">#{selectedBook.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-teal-400">✨ API Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">🔗 RESTful Endpoints</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• GET /api/books - Retrieve all books</li>
                <li>• GET /api/books/:id - Get specific book</li>
                <li>• POST /api/books - Create new book</li>
                <li>• PUT /api/books/:id - Update book</li>
                <li>• DELETE /api/books/:id - Delete book</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">🛡️ Advanced Features</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Input validation middleware</li>
                <li>• Error handling & logging</li>
                <li>• Query filtering & search</li>
                <li>• CORS support</li>
                <li>• JSON response formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeExample}
        language="javascript"
        title="Bookstore REST API Implementation"
      />
    </div>
  );
};

export default BookstoreAPIDemo; 