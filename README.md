# BFHL API Project

A simple REST API built with Node.js and Express that handles mathematical operations and AI queries.

## What it does

This API provides two main endpoints:
- `/health` - Check if the server is running
- `/bfhl` - Process requests for fibonacci sequences, prime numbers, LCM, HCF calculations, and AI questions

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then create a `.env` file in the root folder with these values:

```
PORT=3000
OFFICIAL_EMAIL=aditya1679.be23@chitkara.edu.in
GEMINI_API_KEY=your_api_key
```

You can get a free Gemini API key from https://aistudio.google.com (just sign in with Google and click "Get API Key")

Start the server:

```bash
npm start
```

The server will run on http://localhost:3000

## How to use

### Check server health

```bash
curl http://localhost:3000/health
```

Returns:
```json
{
  "is_success": true,
  "official_email": "aditya1679.be23@chitkara.edu.in"
}
```

### Calculate Fibonacci sequence

Send a number to get the fibonacci sequence up to that length:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

Returns: `[0, 1, 1, 2, 3, 5, 8]`

### Filter prime numbers

Send an array of numbers to get only the prime ones:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2,4,7,9,11]}'
```

Returns: `[2, 7, 11]`

### Find LCM (Least Common Multiple)

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12,18,24]}'
```

Returns: `72`

### Find HCF (Highest Common Factor)

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24,36,60]}'
```

Returns: `12`

### Ask AI a question

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of Maharashtra?"}'
```

Returns: `"Mumbai"`

## Deploying online

Want to make your API publicly accessible? Here are some free options:

**Vercel** (easiest):
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder
3. Follow the prompts
4. Add your environment variables in the Vercel dashboard

**Railway**:
1. Push your code to GitHub
2. Go to railway.app and create a new project
3. Connect your GitHub repo
4. Add environment variables in settings
5. Deploy!

**Render**:
1. Push to GitHub
2. Create account at render.com
3. New Web Service → connect your repo
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

## Notes

- The API only accepts one operation per request (you can't send both fibonacci and prime in the same request)
- All responses include an `is_success` field so you know if it worked
- Invalid requests return error messages with proper HTTP status codes
- The AI feature needs a valid Gemini API key to work
