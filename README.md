# BFHL REST API – Chitkara University

A production-ready REST API built as part of the BFHL API Assessment, implementing multiple computational utilities and AI integration with Google Gemini, deployed on Vercel.

This service exposes secure, publicly accessible endpoints with strict response formatting, robust validation, and graceful error handling.

## 📌 Live Deployment (Vercel)

**Base URL:**
```
https://<your-vercel-project>.vercel.app
```

**Health Check:**
```
GET /health
```

**Core API:**
```
POST /bfhl
```

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Deployment:** Vercel
- **AI Integration:** Google Gemini API
- **Security:** Helmet, CORS, Environment Variables
- **HTTP Client:** Axios

## 📂 Project Structure

```
bfhl-api/
│── server.js
│── package.json
│── .env        (not committed)
│── README.md
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
PORT=3000
OFFICIAL_EMAIL=your_email@chitkara.edu.in
GEMINI_API_KEY=your_google_gemini_api_key
```

⚠️ **Never commit .env to GitHub.**

## 📡 API Endpoints

### ✅ GET /health

Health check endpoint to verify service availability.

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in"
}
```

**HTTP Status:** `200 OK`

### 🔁 POST /bfhl

Processes exactly one operation per request.

#### 🔢 Supported Operations

| Key | Input Type | Output Type | Description |
|-----|------------|-------------|-------------|
| `fibonacci` | Integer | Integer Array | Fibonacci series |
| `prime` | Integer Array | Integer Array | Prime numbers |
| `lcm` | Integer Array | Integer | Least Common Multiple |
| `hcf` | Integer Array | Integer | Highest Common Factor |
| `AI` | String | Single-word String | AI response |

## 📘 Request & Response Examples

### Fibonacci

**Request:**
```json
{
  "fibonacci": 7
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [0,1,1,2,3,5,8]
}
```

### Prime Numbers

**Request:**
```json
{
  "prime": [2,4,7,9,11]
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": [2,7,11]
}
```

### LCM

**Request:**
```json
{
  "lcm": [12,18,24]
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 72
}
```

### HCF

**Request:**
```json
{
  "hcf": [24,36,60]
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": 12
}
```

### AI (Google Gemini)

**Request:**
```json
{
  "AI": "What is the capital of Maharashtra?"
}
```

**Response:**
```json
{
  "is_success": true,
  "official_email": "your_email@chitkara.edu.in",
  "data": "Mumbai"
}
```

## ⚠️ Error Handling

All errors return:
```json
{
  "is_success": false,
  "error": "Error description"
}
```

### Common HTTP Status Codes

- **400** → Invalid input / incorrect request format
- **500** → Internal server or AI API failure

## 🔐 Security & Validation

- Input validation for all request types
- Strict JSON body parsing limits
- Helmet for secure HTTP headers
- Environment-based secret management
- Graceful failure handling (no crashes)

## 🤖 AI Integration (Google Gemini)

The AI functionality uses Google Gemini API to generate answers.
Responses are sanitized to return a single-word output, ensuring compliance with evaluation rules.

## 🚀 Deployment (Vercel)

### Steps:

1. Push project to a public GitHub repository
2. Go to [https://vercel.com](https://vercel.com)
3. Click **New Project**
4. Import GitHub repository
5. Add environment variables:
   - `OFFICIAL_EMAIL`
   - `GEMINI_API_KEY`
6. Deploy 🚀

## 🧪 Local Development

```bash
npm install
node server.js
```

Server runs on:
```
http://localhost:3000
```

## 👤 Author

- **Name:** Aditya Chawla
- **University:** Chitkara University
- **Email:** aditya1679.be23@chitkara.edu.in

## 📄 License

This project is created for academic evaluation purposes.
