import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const SocialNetworkDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newPost, setNewPost] = useState({ content: '', image: null });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});

  const demoCode = `/**
 * Mini Social Network Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a social media platform
 * with user authentication, real-time posts, and interactive features.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialNetworkDemo = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [newPost, setNewPost] = useState({ content: '', image: null });
  const [isLoading, setIsLoading] = useState(false);

  // API Base URL
  const API_BASE_URL = 'http://localhost:5000/api';

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get(\`\${API_BASE_URL}/users\`),
          axios.get(\`\${API_BASE_URL}/posts\`)
        ]);
        
        setUsers(usersResponse.data);
        setPosts(postsResponse.data);
        setCurrentUser(usersResponse.data[0]); // Set first user as current
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Create new post
  const createPost = async () => {
    if (!newPost.content.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await axios.post(\`\${API_BASE_URL}/posts\`, {
        userId: currentUser.id,
        content: newPost.content,
        image: newPost.image
      });

      setPosts(prev => [response.data, ...prev]);
      setNewPost({ content: '', image: null });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add comment to post
  const addComment = async (postId, content) => {
    if (!content.trim()) return;

    try {
      const response = await axios.post(\`\${API_BASE_URL}/posts/\${postId}/comments\`, {
        userId: currentUser.id,
        content
      });

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), response.data]
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Toggle like on post
  const toggleLike = async (postId) => {
    try {
      const isLiked = likes[postId]?.includes(currentUser.id);
      
      if (isLiked) {
        await axios.delete(\`\${API_BASE_URL}/posts/\${postId}/likes/\${currentUser.id}\`);
        setLikes(prev => ({
          ...prev,
          [postId]: prev[postId].filter(id => id !== currentUser.id)
        }));
      } else {
        await axios.post(\`\${API_BASE_URL}/posts/\${postId}/likes\`, {
          userId: currentUser.id
        });
        setLikes(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), currentUser.id]
        }));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Get user by ID
  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return \`\${minutes}m ago\`;
    if (hours < 24) return \`\${hours}h ago\`;
    return \`\${days}d ago\`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">👥 Mini Social Network</h1>
            <p className="text-gray-400">Social media platform with real-time features</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Post */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Create Post</h2>
              <div className="space-y-4">
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="What's on your mind?"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none"
                  rows={4}
                />
                <button
                  onClick={createPost}
                  disabled={isLoading || !newPost.content.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {isLoading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {posts.map(post => {
                const user = getUserById(post.userId);
                const postComments = comments[post.id] || [];
                const postLikes = likes[post.id] || [];
                const isLiked = postLikes.includes(currentUser?.id);

                return (
                  <div key={post.id} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-2xl">{user?.avatar}</div>
                      <div>
                        <h3 className="font-semibold">{user?.name}</h3>
                        <p className="text-sm text-gray-400">@{user?.username}</p>
                      </div>
                      <span className="text-sm text-gray-400 ml-auto">
                        {formatTimestamp(post.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={\`flex items-center space-x-1 \${isLiked ? 'text-red-400' : 'text-gray-400'}\`}
                      >
                        <span>{isLiked ? '❤️' : '🤍'}</span>
                        <span>{postLikes.length}</span>
                      </button>
                      <span className="text-gray-400">💬 {postComments.length}</span>
                    </div>

                    {/* Comments */}
                    {postComments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="text-sm font-semibold mb-2">Comments</h4>
                        <div className="space-y-2">
                          {postComments.map(comment => {
                            const commentUser = getUserById(comment.userId);
                            return (
                              <div key={comment.id} className="bg-gray-700 rounded p-3">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium">{commentUser?.name}</span>
                                  <span className="text-xs text-gray-400">
                                    {formatTimestamp(comment.timestamp)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{comment.content}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialNetworkDemo;`;

  // Initialize with sample data
  useEffect(() => {
    const sampleUsers = [
      { id: 1, username: 'alice_dev', name: 'Alice Johnson', avatar: '👩‍💻', bio: 'Full-stack developer passionate about React and Node.js' },
      { id: 2, username: 'bob_ai', name: 'Bob Smith', avatar: '👨‍🔬', bio: 'AI/ML researcher working on cutting-edge algorithms' },
      { id: 3, username: 'charlie_ux', name: 'Charlie Brown', avatar: '👩‍🎨', bio: 'UX/UI designer creating beautiful user experiences' },
      { id: 4, username: 'diana_cloud', name: 'Diana Wilson', avatar: '👨‍💼', bio: 'Cloud architect specializing in AWS and microservices' }
    ];

    const samplePosts = [
      {
        id: 1,
        userId: 1,
        content: 'Just finished building a new React component library! 🚀 The modular design makes it super easy to maintain and extend. #React #WebDev',
        timestamp: '2024-01-15T10:30:00',
        likes: 12,
        comments: 3,
        image: null
      },
      {
        id: 2,
        userId: 2,
        content: 'Excited to share my latest research on transformer architectures! The attention mechanism is truly revolutionary for NLP tasks. #AI #MachineLearning #NLP',
        timestamp: '2024-01-15T09:15:00',
        likes: 28,
        comments: 7,
        image: null
      },
      {
        id: 3,
        userId: 3,
        content: 'Redesigned the user onboarding flow and saw a 40% increase in completion rate! User research really pays off. #UX #Design #Analytics',
        timestamp: '2024-01-15T08:45:00',
        likes: 15,
        comments: 4,
        image: null
      },
      {
        id: 4,
        userId: 4,
        content: 'Deployed our microservices architecture to production today. The auto-scaling is working perfectly! #Cloud #DevOps #AWS',
        timestamp: '2024-01-15T07:20:00',
        likes: 22,
        comments: 6,
        image: null
      }
    ];

    const sampleComments = {
      1: [
        { id: 1, userId: 2, content: 'This looks amazing! Would love to see the code.', timestamp: '2024-01-15T10:35:00' },
        { id: 2, userId: 3, content: 'Great work! The modular approach is spot on.', timestamp: '2024-01-15T10:40:00' },
        { id: 3, userId: 4, content: 'Can you share the GitHub repo?', timestamp: '2024-01-15T10:45:00' }
      ],
      2: [
        { id: 4, userId: 1, content: 'Fascinating research! How does it compare to BERT?', timestamp: '2024-01-15T09:20:00' },
        { id: 5, userId: 3, content: 'The attention visualization is incredible!', timestamp: '2024-01-15T09:25:00' }
      ]
    };

    const sampleLikes = {
      1: [1, 2, 3, 4],
      2: [1, 2, 3, 4, 5],
      3: [1, 2, 3],
      4: [1, 2, 3, 4]
    };

    setUsers(sampleUsers);
    setPosts(samplePosts);
    setComments(sampleComments);
    setLikes(sampleLikes);
    setCurrentUser(sampleUsers[0]);
  }, []);

  const createPost = async () => {
    if (!newPost.content.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const post = {
      id: Date.now(),
      userId: currentUser.id,
      content: newPost.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      image: newPost.image
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ content: '', image: null });
    setIsLoading(false);
  };

  const addComment = (postId, content) => {
    if (!content.trim()) return;

    const comment = {
      id: Date.now(),
      userId: currentUser.id,
      content,
      timestamp: new Date().toISOString()
    };

    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));

    // Update comment count
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  const toggleLike = (postId) => {
    const userLiked = likes[postId]?.includes(currentUser.id);
    
    if (userLiked) {
      // Unlike
      setLikes(prev => ({
        ...prev,
        [postId]: prev[postId].filter(id => id !== currentUser.id)
      }));
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      // Like
      setLikes(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), currentUser.id]
      }));
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const codeExample = `// Mini Social Network with Django/Express

// Backend - Django/Express Server
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: '👤'
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Post Schema
const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  image: {
    type: String,
    default: null
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 200
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error();
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Routes

// POST /api/auth/register - Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login - Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/posts - Get posts (with pagination)
app.get('/api/posts', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, userId } = req.query;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (userId) {
      query.userId = userId;
    }
    
    const posts = await Post.find(query)
      .populate('userId', 'username name avatar')
      .populate('comments.userId', 'username name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Post.countDocuments(query);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/posts - Create post
app.post('/api/posts', auth, async (req, res) => {
  try {
    const { content, image } = req.body;
    
    const post = new Post({
      userId: req.user._id,
      content,
      image
    });
    
    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'username name avatar');
    
    res.status(201).json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/posts/:id/like - Like/unlike post
app.post('/api/posts/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const likeIndex = post.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Unlike
      post.likes.splice(likeIndex, 1);
    } else {
      // Like
      post.likes.push(req.user._id);
    }
    
    await post.save();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/posts/:id/comments - Add comment
app.post('/api/posts/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    post.comments.push({
      userId: req.user._id,
      content
    });
    
    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('userId', 'username name avatar')
      .populate('comments.userId', 'username name avatar');
    
    res.json({
      success: true,
      data: populatedPost
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/:id - Get user profile
app.get('/api/users/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'username name avatar')
      .populate('following', 'username name avatar');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/users/:id/follow - Follow/unfollow user
app.post('/api/users/:id/follow', auth, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    
    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (req.user._id.equals(userToFollow._id)) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    
    const isFollowing = req.user.following.includes(userToFollow._id);
    
    if (isFollowing) {
      // Unfollow
      req.user.following = req.user.following.filter(id => !id.equals(userToFollow._id));
      userToFollow.followers = userToFollow.followers.filter(id => !id.equals(req.user._id));
    } else {
      // Follow
      req.user.following.push(userToFollow._id);
      userToFollow.followers.push(req.user._id);
    }
    
    await req.user.save();
    await userToFollow.save();
    
    res.json({
      success: true,
      data: {
        following: isFollowing,
        followersCount: userToFollow.followers.length,
        followingCount: req.user.following.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

// Frontend - React Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialNetwork = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts', {
        headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      await axios.post('/api/posts', 
        { content: newPost },
        { headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` } }
      );
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const likePost = async (postId) => {
    try {
      await axios.post(\`/api/posts/\${postId}/like\`, {}, {
        headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
      });
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const addComment = async (postId, content) => {
    try {
      await axios.post(\`/api/posts/\${postId}/comments\`, 
        { content },
        { headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` } }
      );
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Create Post */}
      <form onSubmit={createPost} className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 border rounded-lg resize-none"
          rows="3"
        />
        <button
          type="submit"
          disabled={loading || !newPost.trim()}
          className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl">{post.userId.avatar}</div>
              <div>
                <div className="font-semibold">{post.userId.name}</div>
                <div className="text-gray-500 text-sm">@{post.userId.username}</div>
              </div>
            </div>
            
            <p className="mb-4">{post.content}</p>
            
            <div className="flex items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => likePost(post._id)}
                  className={\`flex items-center space-x-1 \${post.likes.includes(currentUser?._id) ? 'text-red-500' : ''}\`}
                >
                  <span>❤️</span>
                  <span>{post.likes.length}</span>
                </button>
                <div className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div>{new Date(post.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialNetwork;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-purple-400">👥 Mini Social Network</h1>
            <p className="text-gray-400">Django/Express backend with React frontend</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current User */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">👤 Profile</h3>
              {currentUser && (
                <div className="text-center">
                  <div className="text-4xl mb-3">{currentUser.avatar}</div>
                  <div className="font-semibold text-white">{currentUser.name}</div>
                  <div className="text-sm text-gray-400">@{currentUser.username}</div>
                  <div className="text-xs text-gray-500 mt-2">{currentUser.bio}</div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">🧭 Navigation</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('feed')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'feed'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  📰 Feed
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'profile'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full p-3 rounded-lg transition-colors text-left ${
                    activeTab === 'users'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  👥 Users
                </button>
              </div>
            </div>

            {/* Users List */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">👥 Users</h3>
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-700">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className="font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-gray-400">@{user.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">✍️ Create Post</h3>
              
              <div className="space-y-4">
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="What's on your mind?"
                  className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      📷
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      😊
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      📍
                    </button>
                  </div>
                  
                  <button
                    onClick={createPost}
                    disabled={!newPost.content.trim() || isLoading}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <span>📤</span>
                        <span>Post</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => {
                const postUser = getUserById(post.userId);
                const userLiked = likes[post.id]?.includes(currentUser?.id);
                const postComments = comments[post.id] || [];
                
                return (
                  <div key={post.id} className="bg-gray-800 rounded-lg p-6">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{postUser?.avatar}</div>
                        <div>
                          <div className="font-semibold text-white">{postUser?.name}</div>
                          <div className="text-sm text-gray-400">@{postUser?.username} • {formatTimestamp(post.timestamp)}</div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        ⋯
                      </button>
                    </div>
                    
                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-white">{post.content}</p>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-700">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            userLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                          }`}
                        >
                          <span className="text-xl">{userLiked ? '❤️' : '🤍'}</span>
                          <span>{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <span className="text-xl">💬</span>
                          <span>{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                          <span className="text-xl">🔄</span>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Comments */}
                    {postComments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-400 mb-3">Comments</h4>
                        <div className="space-y-3">
                          {postComments.map((comment) => {
                            const commentUser = getUserById(comment.userId);
                            return (
                              <div key={comment.id} className="flex space-x-3">
                                <div className="text-lg">{commentUser?.avatar}</div>
                                <div className="flex-1">
                                  <div className="bg-gray-700 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-semibold text-sm">{commentUser?.name}</span>
                                      <span className="text-xs text-gray-400">{formatTimestamp(comment.timestamp)}</span>
                                    </div>
                                    <p className="text-sm text-gray-300">{comment.content}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Add Comment */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex space-x-3">
                        <div className="text-lg">{currentUser?.avatar}</div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && e.target.value.trim()) {
                                addComment(post.id, e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-teal-400">✨ Social Network Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">🔗 Backend Features</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• User Authentication & Authorization</li>
                <li>• JWT Token Management</li>
                <li>• Password Hashing (bcrypt)</li>
                <li>• MongoDB Database</li>
                <li>• RESTful API Design</li>
                <li>• File Upload Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">🎨 Frontend Features</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Real-time Feed Updates</li>
                <li>• Like & Comment System</li>
                <li>• User Profiles</li>
                <li>• Follow/Unfollow</li>
                <li>• Responsive Design</li>
                <li>• Modern UI/UX</li>
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
        title="Social Network Implementation"
      />
    </div>
  );
};

export default SocialNetworkDemo; 