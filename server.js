const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'aditya1679.be23@chitkara.edu.in';

function generateFibonacci(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  if (n === 0) return [];
  if (n === 1) return [0];
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib.slice(0, n);
}

function isPrime(num) {
  if (!Number.isInteger(num)) return false;
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  const sqrt = Math.sqrt(num);
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  if (arr.length === 0) {
    throw new Error('Array cannot be empty');
  }
  if (!arr.every(num => Number.isInteger(num))) {
    throw new Error('All elements must be integers');
  }
  return arr.filter(isPrime);
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function calculateHCF(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  if (arr.length === 0) {
    throw new Error('Array cannot be empty');
  }
  if (!arr.every(num => Number.isInteger(num))) {
    throw new Error('All elements must be integers');
  }
  if (arr.some(num => num === 0)) {
    throw new Error('Array cannot contain zero');
  }
  return arr.reduce((acc, num) => gcd(acc, num));
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function calculateLCM(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array');
  }
  if (arr.length === 0) {
    throw new Error('Array cannot be empty');
  }
  if (!arr.every(num => Number.isInteger(num))) {
    throw new Error('All elements must be integers');
  }
  if (arr.some(num => num === 0)) {
    throw new Error('Array cannot contain zero');
  }
  return arr.reduce((acc, num) => lcm(acc, num));
}

async function getAIResponse(question) {
  if (typeof question !== 'string' || question.trim().length === 0) {
    throw new Error('Question must be a non-empty string');
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('AI service not configured');
  }
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: `Answer the following question with a single word or very short phrase (maximum 3 words): ${question}`
          }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Invalid AI response');
    }
    return text.trim().split(/\s+/).slice(0, 3).join(' ');
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error('AI service rate limit exceeded');
    }
    if (error.code === 'ECONNABORTED') {
      throw new Error('AI service timeout');
    }
    throw new Error('AI service unavailable');
  }
}

app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

app.post('/bfhl', async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid request body'
      });
    }
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: 'Request body cannot be empty'
      });
    }
    if (keys.length > 1) {
      return res.status(400).json({
        is_success: false,
        error: 'Request must contain exactly one key'
      });
    }
    const key = keys[0];
    const value = req.body[key];
    let data;
    switch (key) {
      case 'fibonacci':
        if (!Number.isInteger(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'Fibonacci input must be an integer'
          });
        }
        if (value < 0) {
          return res.status(400).json({
            is_success: false,
            error: 'Fibonacci input must be non-negative'
          });
        }
        if (value > 50) {
          return res.status(400).json({
            is_success: false,
            error: 'Fibonacci input too large (max 50)'
          });
        }
        data = generateFibonacci(value);
        break;
      case 'prime':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'Prime input must be an array'
          });
        }
        if (value.length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'Prime array cannot be empty'
          });
        }
        if (value.length > 1000) {
          return res.status(400).json({
            is_success: false,
            error: 'Array too large (max 1000 elements)'
          });
        }
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'All elements must be integers'
          });
        }
        data = filterPrimes(value);
        break;
      case 'lcm':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'LCM input must be an array'
          });
        }
        if (value.length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'LCM array cannot be empty'
          });
        }
        if (value.length > 100) {
          return res.status(400).json({
            is_success: false,
            error: 'Array too large (max 100 elements)'
          });
        }
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'All elements must be integers'
          });
        }
        if (value.some(num => num === 0)) {
          return res.status(400).json({
            is_success: false,
            error: 'LCM array cannot contain zero'
          });
        }
        data = calculateLCM(value);
        break;
      case 'hcf':
        if (!Array.isArray(value)) {
          return res.status(400).json({
            is_success: false,
            error: 'HCF input must be an array'
          });
        }
        if (value.length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'HCF array cannot be empty'
          });
        }
        if (value.length > 100) {
          return res.status(400).json({
            is_success: false,
            error: 'Array too large (max 100 elements)'
          });
        }
        if (!value.every(num => Number.isInteger(num))) {
          return res.status(400).json({
            is_success: false,
            error: 'All elements must be integers'
          });
        }
        if (value.some(num => num === 0)) {
          return res.status(400).json({
            is_success: false,
            error: 'HCF array cannot contain zero'
          });
        }
        data = calculateHCF(value);
        break;
      case 'AI':
        if (typeof value !== 'string') {
          return res.status(400).json({
            is_success: false,
            error: 'AI input must be a string'
          });
        }
        if (value.trim().length === 0) {
          return res.status(400).json({
            is_success: false,
            error: 'AI question cannot be empty'
          });
        }
        if (value.length > 500) {
          return res.status(400).json({
            is_success: false,
            error: 'Question too long (max 500 characters)'
          });
        }
        data = await getAIResponse(value);
        break;
      default:
        return res.status(400).json({
          is_success: false,
          error: `Unknown key: ${key}. Allowed keys: fibonacci, prime, lcm, hcf, AI`
        });
    }
    res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });
  } catch (error) {
    console.error('Error processing request:', error);
    if (error.message.includes('AI service')) {
      return res.status(503).json({
        is_success: false,
        error: error.message
      });
    }
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      is_success: false,
      error: 'Invalid JSON format'
    });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({
    is_success: false,
    error: 'Internal server error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});