import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const BookstoreAPIDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');

  const demoCode = `/**
 * Bookstore REST API Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a complete REST API with CRUD operations,
 * search functionality, and full-stack integration using React and Express.js.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookstoreAPI = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // API Base URL
  const API_BASE_URL = 'http://localhost:3001/api/books';

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create new book
  const createBook = async (bookData) => {
    try {
      const response = await axios.post(API_BASE_URL, bookData);
      setBooks(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  };

  // Update existing book
  const updateBook = async (id, bookData) => {
    try {
      const response = await axios.put(\`\${API_BASE_URL}/\${id}\`, bookData);
      setBooks(prev => prev.map(book => 
        book.id === id ? response.data : book
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(\`\${API_BASE_URL}/\${id}\`);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };

  // Search books
  const searchBooks = async (query) => {
    try {
      const response = await axios.get(\`\${API_BASE_URL}/search?q=\${query}\`);
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  };

  // Filter books by genre
  const filterBooksByGenre = async (genre) => {
    try {
      const response = await axios.get(\`\${API_BASE_URL}/filter?genre=\${genre}\`);
      return response.data;
    } catch (error) {
      console.error('Error filtering books:', error);
      return [];
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const bookData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      price: parseFloat(formData.price),
      description: formData.description,
      publishedDate: new Date().toISOString(),
      isbn: generateISBN()
    };

    try {
      if (isEditing && selectedBook) {
        await updateBook(selectedBook.id, bookData);
        setIsEditing(false);
        setSelectedBook(null);
      } else {
        await createBook(bookData);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Edit book
  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price.toString(),
      description: book.description
    });
    setIsEditing(true);
  };

  // Delete book
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      genre: '',
      price: '',
      description: ''
    });
    setIsEditing(false);
    setSelectedBook(null);
  };

  // Generate ISBN
  const generateISBN = () => {
    return '978-' + Math.random().toString().slice(2, 5) + '-' + 
           Math.random().toString().slice(2, 5) + '-' + 
           Math.random().toString().slice(2, 3);
  };

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="bookstore-api">
      <div className="api-header">
        <h1>Bookstore REST API</h1>
        <p>Complete CRUD operations with Express.js backend</p>
      </div>

      <div className="api-content">
        {/* Book Form */}
        <div className="book-form">
          <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Genre:</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Genre</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="biography">Biography</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Update Book' : 'Add Book'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Books List */}
        <div className="books-list">
          <h2>Books ({books.length})</h2>
          {loading ? (
            <div className="loading">Loading books...</div>
          ) : (
            <div className="books-grid">
              {books.map(book => (
                <div key={book.id} className="book-card">
                  <h3>{book.title}</h3>
                  <p className="author">by {book.author}</p>
                  <p className="genre">{book.genre}</p>
                  <p className="price">$ {book.price}</p>
                  {book.description && (
                    <p className="description">{book.description}</p>
                  )}
                  <div className="book-actions">
                    <button onClick={() => handleEdit(book)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Backend API Implementation (Express.js)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory database (replace with real database)
let books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'fiction',
    price: 12.99,
    description: 'A story of the fabulously wealthy Jay Gatsby.',
    publishedDate: '1925-04-10T00:00:00.000Z',
    isbn: '978-0743273565'
  }
];

// GET /api/books - Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET /api/books/:id - Get book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// POST /api/books - Create new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, price, description } = req.body;
  
  if (!title || !author || !genre || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    price: parseFloat(price),
    description: description || '',
    publishedDate: new Date().toISOString(),
    isbn: generateISBN()
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /api/books/:id - Update book
app.put('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  const { title, author, genre, price, description } = req.body;
  
  books[bookIndex] = {
    ...books[bookIndex],
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
    genre: genre || books[bookIndex].genre,
    price: price ? parseFloat(price) : books[bookIndex].price,
    description: description || books[bookIndex].description
  };
  
  res.json(books[bookIndex]);
});

// DELETE /api/books/:id - Delete book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  books.splice(bookIndex, 1);
  res.status(204).send();
});

// GET /api/books/search?q=query - Search books
app.get('/api/books/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = books.filter(book => 
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query) ||
    book.description.toLowerCase().includes(query)
  );
  res.json(results);
});

// GET /api/books/filter?genre=genre - Filter by genre
app.get('/api/books/filter', (req, res) => {
  const genre = req.query.genre;
  if (genre === 'all') {
    return res.json(books);
  }
  
  const results = books.filter(book => book.genre === genre);
  res.json(results);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

export default BookstoreAPI;`;

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
                {/* The endpoints array is removed as per the new_code, so this section is now empty */}
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
        code={demoCode}
        language="javascript"
        title="Bookstore REST API Implementation"
      />
    </div>
  );
};

export default BookstoreAPIDemo; 