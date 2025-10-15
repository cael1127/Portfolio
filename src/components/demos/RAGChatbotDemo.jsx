import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const RAGChatbotDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);

  const sampleDocuments = [
    {
      id: 1,
      title: 'Product Documentation',
      content: 'Our product features include real-time analytics, automated workflows, and seamless integrations.',
      type: 'docs',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'API Reference',
      content: 'The API supports REST and GraphQL endpoints with authentication via JWT tokens.',
      type: 'api',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      title: 'FAQ',
      content: 'Common questions about pricing, features, and implementation.',
      type: 'faq',
      lastUpdated: '2024-01-13'
    }
  ];

  const sampleConversation = [
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant with access to your knowledge base. How can I help you today?',
      timestamp: new Date(Date.now() - 60000).toISOString(),
      sources: []
    }
  ];

  useEffect(() => {
    setDocuments(sampleDocuments);
    setMessages(sampleConversation);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString(),
      sources: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate RAG response
    await new Promise(resolve => setTimeout(resolve, 2000));

    const assistantMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: 'Based on the documentation, our product offers real-time analytics and automated workflows. The API supports both REST and GraphQL endpoints with JWT authentication. Would you like more details about any specific feature?',
      timestamp: new Date().toISOString(),
      sources: [
        { docId: 1, title: 'Product Documentation', relevance: 0.92 },
        { docId: 2, title: 'API Reference', relevance: 0.85 }
      ]
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const codeData = {
    code: `import openai
import numpy as np
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
import pinecone

# RAG (Retrieval-Augmented Generation) Chatbot

class RAGChatbot:
    def __init__(self, pinecone_api_key, openai_api_key):
        # Initialize Pinecone
        pinecone.init(
            api_key=pinecone_api_key,
            environment="us-west1-gcp"
        )
        
        self.index_name = "knowledge-base"
        self.embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
        
        # Create or connect to existing index
        if self.index_name not in pinecone.list_indexes():
            pinecone.create_index(
                name=self.index_name,
                dimension=1536,  # OpenAI embedding dimension
                metric="cosine"
            )
        
        self.vectorstore = Pinecone.from_existing_index(
            self.index_name,
            self.embeddings
        )
        
        # Initialize LLM
        self.llm = OpenAI(
            temperature=0.7,
            openai_api_key=openai_api_key,
            model="gpt-4"
        )
        
        # Create retrieval chain
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vectorstore.as_retriever(
                search_kwargs={"k": 3}  # Retrieve top 3 documents
            ),
            return_source_documents=True
        )
    
    def ingest_documents(self, documents):
        """Ingest documents into the vector store"""
        # Split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        
        texts = []
        metadatas = []
        
        for doc in documents:
            chunks = text_splitter.split_text(doc['content'])
            
            for chunk in chunks:
                texts.append(chunk)
                metadatas.append({
                    'source': doc['title'],
                    'doc_id': doc['id'],
                    'type': doc['type']
                })
        
        # Create embeddings and store in Pinecone
        self.vectorstore.add_texts(
            texts=texts,
            metadatas=metadatas
        )
        
        return len(texts)
    
    def query(self, question, conversation_history=None):
        """Query the chatbot with RAG"""
        # Add conversation context if provided
        if conversation_history:
            context = "\\n".join([
                f"{msg['role']}: {msg['content']}"
                for msg in conversation_history[-3:]  # Last 3 messages
            ])
            enhanced_question = f"Context:\\n{context}\\n\\nQuestion: {question}"
        else:
            enhanced_question = question
        
        # Get response from RAG chain
        result = self.qa_chain({"query": enhanced_question})
        
        return {
            'answer': result['result'],
            'sources': [
                {
                    'content': doc.page_content,
                    'metadata': doc.metadata,
                    'relevance': self._calculate_relevance(question, doc.page_content)
                }
                for doc in result['source_documents']
            ]
        }
    
    def _calculate_relevance(self, query, document):
        """Calculate relevance score between query and document"""
        query_embedding = self.embeddings.embed_query(query)
        doc_embedding = self.embeddings.embed_query(document)
        
        # Cosine similarity
        similarity = np.dot(query_embedding, doc_embedding) / (
            np.linalg.norm(query_embedding) * np.linalg.norm(doc_embedding)
        )
        
        return float(similarity)
    
    def hybrid_search(self, query, alpha=0.5):
        """Combine vector search with keyword search"""
        # Vector search
        vector_results = self.vectorstore.similarity_search_with_score(
            query,
            k=5
        )
        
        # Keyword search (simplified - in production use BM25)
        keyword_results = self._keyword_search(query, k=5)
        
        # Combine results with weighted scores
        combined_results = {}
        
        for doc, score in vector_results:
            doc_id = doc.metadata['doc_id']
            combined_results[doc_id] = {
                'doc': doc,
                'score': alpha * score
            }
        
        for doc, score in keyword_results:
            doc_id = doc.metadata['doc_id']
            if doc_id in combined_results:
                combined_results[doc_id]['score'] += (1 - alpha) * score
            else:
                combined_results[doc_id] = {
                    'doc': doc,
                    'score': (1 - alpha) * score
                }
        
        # Sort by combined score
        sorted_results = sorted(
            combined_results.values(),
            key=lambda x: x['score'],
            reverse=True
        )
        
        return [result['doc'] for result in sorted_results[:3]]

# FastAPI Backend
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Initialize RAG chatbot
chatbot = RAGChatbot(
    pinecone_api_key=os.getenv("PINECONE_API_KEY"),
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

class Message(BaseModel):
    content: str
    conversation_history: Optional[List[dict]] = None

class Document(BaseModel):
    id: int
    title: str
    content: str
    type: str

@app.post("/api/chat")
async def chat(message: Message):
    try:
        result = chatbot.query(
            message.content,
            conversation_history=message.conversation_history
        )
    
    return {
            "answer": result['answer'],
            "sources": result['sources'],
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/documents/ingest")
async def ingest_documents(documents: List[Document]):
    try:
        count = chatbot.ingest_documents([doc.dict() for doc in documents])
        return {
            "success": True,
            "chunks_created": count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/documents/search")
async def search_documents(query: str, limit: int = 5):
    try:
        results = chatbot.vectorstore.similarity_search(query, k=limit)
        return {
            "results": [
                {
                    "content": doc.page_content,
                    "metadata": doc.metadata
                }
                for doc in results
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Frontend Integration
import React, { useState } from 'react';
import axios from 'axios';

const RAGChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post('/api/chat', {
        content: input,
        conversation_history: messages
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.answer,
        sources: response.data.sources
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      {messages.map((msg, i) => (
        <div key={i} className={\`message \${msg.role}\`}>
          <p>{msg.content}</p>
          {msg.sources && (
            <div className="sources">
              {msg.sources.map((source, j) => (
                <span key={j} className="source-tag">
                  {source.metadata.source}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`,
    explanation: `Advanced RAG (Retrieval-Augmented Generation) chatbot that combines large language models with vector search for accurate, context-aware responses.

## Core Implementation

**Key Features**: This demo showcases a production-ready RAG chatbot using OpenAI embeddings, Pinecone vector database, and LangChain for document retrieval and answer generation with source citations.

**Architecture**: Built with Python, LangChain for RAG pipeline, Pinecone for vector storage, OpenAI GPT-4 for generation, and FastAPI for REST API, with React frontend.

**Performance**: Implements efficient vector search with cosine similarity, hybrid search combining semantic and keyword matching, conversation context tracking, and sub-second response times.

## Technical Benefits

- **Accurate Responses**: Grounds answers in your actual documents
- **Source Citations**: Shows which documents were used for each answer
- **Scalable**: Handles millions of documents with vector search
- **Context-Aware**: Maintains conversation history for follow-up questions`,
    technologies: [
      {
        name: 'LangChain',
        description: 'Framework for LLM-powered applications',
        tags: ['LLM', 'AI', 'Python']
      },
      {
        name: 'Pinecone',
        description: 'Vector database for similarity search',
        tags: ['Vector DB', 'Search', 'Cloud']
      },
      {
        name: 'OpenAI GPT-4',
        description: 'Large language model for generation',
        tags: ['LLM', 'AI', 'NLP']
      },
      {
        name: 'OpenAI Embeddings',
        description: 'Text embeddings for semantic search',
        tags: ['Embeddings', 'AI', 'Search']
      }
    ],
    concepts: [
      {
        name: 'Retrieval-Augmented Generation (RAG)',
        description: 'Combining retrieval with generation',
        example: 'Search docs → Pass to LLM → Generate answer'
      },
      {
        name: 'Vector Embeddings',
        description: 'Numerical representation of text meaning',
        example: '1536-dimensional vectors for semantic similarity'
      },
      {
        name: 'Semantic Search',
        description: 'Finding documents by meaning, not keywords',
        example: 'Cosine similarity between query and document vectors'
      },
      {
        name: 'Chunking Strategy',
        description: 'Splitting documents into searchable pieces',
        example: '1000 char chunks with 200 char overlap'
      }
    ],
    features: [
      'Document ingestion and chunking',
      'Vector embeddings with OpenAI',
      'Semantic search with Pinecone',
      'Context-aware conversation',
      'Source citation for answers',
      'Hybrid search (vector + keyword)',
      'Conversation history tracking',
      'Multi-document knowledge base',
      'Real-time document updates',
      'Confidence scoring for sources'
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
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🤖 RAG Chatbot Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Retrieval-Augmented Generation chatbot that answers questions using your documents with source citations.
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
          {/* Chat Messages */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Chat</h2>
            
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600'
                      : 'bg-gray-700'
                  }`}>
                    <p className="text-white">{message.content}</p>
                    
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-xs text-gray-400 mb-2">Sources:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.sources.map((source, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-600 px-2 py-1 rounded cursor-pointer hover:bg-gray-500"
                              onClick={() => setSelectedDocument(source.docId)}
                            >
                              📄 {source.title} ({(source.relevance * 100).toFixed(0)}%)
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                    
                    <p className="text-xs text-gray-400 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
            ))}
            
            {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
                </motion.div>
            )}
          </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
              <motion.button
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </div>
          </motion.div>

          {/* Selected Document */}
          {selectedDocument && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Document Preview</h2>
              {(() => {
                const doc = documents.find(d => d.id === selectedDocument);
                return doc ? (
                  <div>
                    <h3 className="font-bold text-lg mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Type: {doc.type} • Updated: {doc.lastUpdated}
                    </p>
                    <p className="text-gray-300">{doc.content}</p>
          </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Knowledge Base */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">📚 Knowledge Base</h3>
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-650 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedDocument(doc.id)}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="font-semibold text-sm">{doc.title}</h4>
                  <p className="text-xs text-gray-400">{doc.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">📊 Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Documents:</span>
                <span className="font-semibold">{documents.length}</span>
            </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Messages:</span>
                <span className="font-semibold">{messages.length}</span>
            </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Response:</span>
                <span className="text-green-400 font-semibold">1.2s</span>
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
                <span>Source Citations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Semantic Search</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Context Aware</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Real-time Updates</span>
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

export default RAGChatbotDemo;
