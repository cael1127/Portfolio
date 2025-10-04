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

  // Add new book
  const addBook = async (bookData) => {
    try {
      const response = await axios.post(API_BASE_URL, bookData);
      setBooks([...books, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  };

  // Update existing book
  const updateBook = async (id, bookData) => {
    try {
      const response = await axios.put(\`\${API_BASE_URL}/\${id}\`, bookData);
      setBooks(books.map(book => book.id === id ? response.data : book));
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
      setBooks(books.filter(book => book.id !== id));
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
      throw error;
    }
  };

  // Filter books by genre
  const filterBooksByGenre = async (genre) => {
    try {
      const response = await axios.get(\`\${API_BASE_URL}/filter?genre=\${genre}\`);
      return response.data;
    } catch (error) {
      console.error('Error filtering books:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateBook(selectedBook.id, formData);
      } else {
        await addBook(formData);
      }
      resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit
  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      description: book.description
    });
    setIsEditing(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
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

  // Handle cancel edit
  const handleCancel = () => {
    resetForm();
  };

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Backend API Implementation (Express.js)
  const express = require('express');
  const cors = require('cors');
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // In-memory data store (in production, use a database)
  let books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 12.99,
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for Daisy Buchanan.'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      price: 14.99,
      description: 'The story of young Scout Finch and her father Atticus in 1930s Alabama.'
    }
  ];

  let nextId = 3;

  // Routes

  // GET /api/books - Get all books
  app.get('/api/books', (req, res) => {
    res.json(books);
  });

  // GET /api/books/:id - Get book by ID
  app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
  });

  // POST /api/books - Create new book
  app.post('/api/books', (req, res) => {
    const { title, author, genre, price, description } = req.body;
    
    // Validation
    if (!title || !author || !genre || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newBook = {
      id: nextId++,
      title,
      author,
      genre,
      price: parseFloat(price),
      description: description || ''
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
  });

  // PUT /api/books/:id - Update book
  app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const { title, author, genre, price, description } = req.body;
    
    // Validation
    if (!title || !author || !genre || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    books[bookIndex] = {
      ...books[bookIndex],
      title,
      author,
      genre,
      price: parseFloat(price),
      description: description || ''
    };
    
    res.json(books[bookIndex]);
  });

  // DELETE /api/books/:id - Delete book
  app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
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
    const results = books.filter(book => book.genre === genre);
    res.json(results);
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  // Start server
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
  });

  module.exports = app;`;

  // Demo data for the UI
  const mockBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      price: 12.99,
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for Daisy Buchanan.'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      price: 14.99,
      description: 'The story of young Scout Finch and her father Atticus in 1930s Alabama.'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      price: 13.99,
      description: 'A dystopian social science fiction novel about totalitarian control.'
    },
    {
      id: 4,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      price: 15.99,
      description: 'A fantasy novel about a hobbit who goes on an unexpected journey.'
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBooks(books.map(book => 
        book.id === selectedBook.id ? { ...book, ...formData } : book
      ));
    } else {
      const newBook = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price)
      };
      setBooks([...books, newBook]);
    }
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      description: book.description
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

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

  const handleCancel = () => {
    resetForm();
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === 'all' || book.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  const stats = {
    total: books.length,
    genres: [...new Set(books.map(book => book.genre))].length,
    averagePrice: books.length > 0 ? (books.reduce((sum, book) => sum + book.price, 0) / books.length).toFixed(2) : 0,
    features: [
      "CRUD operations",
      "Data validation", 
      "Error handling",
      "API documentation"
    ]
  };

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
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Books</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{stats.genres}</div>
            <div className="text-gray-400 text-sm">Genres</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">${stats.averagePrice}</div>
            <div className="text-gray-400 text-sm">Avg Price</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">100%</div>
            <div className="text-gray-400 text-sm">API Coverage</div>
          </div>
        </div>

        {/* Book Form */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4 text-white">
            {isEditing ? '✏️ Edit Book' : '➕ Add New Book'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Self-Help">Self-Help</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                {isEditing ? 'Update Book' : 'Add Book'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Thriller">Thriller</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Self-Help">Self-Help</option>
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">{book.title}</h3>
                <p className="text-blue-400 text-sm mb-1">by {book.author}</p>
                <p className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded inline-block mb-2">{book.genre}</p>
                <p className="text-gray-300 text-sm mb-3">{book.description}</p>
                <p className="text-yellow-400 font-bold">${book.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* API Features */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">🚀 API Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-blue-400 mb-3">REST Endpoints</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• GET /api/books - List all books</li>
                <li>• POST /api/books - Create new book</li>
                <li>• PUT /api/books/:id - Update book</li>
                <li>• DELETE /api/books/:id - Delete book</li>
                <li>• GET /api/books/search - Search books</li>
                <li>• GET /api/books/filter - Filter by genre</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-green-400 mb-3">Implementation Details</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Express.js server setup</li>
                <li>• CORS middleware</li>
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