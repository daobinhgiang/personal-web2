# Admin Authentication Setup Guide

This guide will help you set up MongoDB connection and create your first admin account.

## Step 1: Fix MongoDB Connection String

Your `.env` file needs a **complete** MongoDB connection string. Follow these steps:

### Get Your MongoDB Atlas Connection String

1. Log into [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string

It should look like this:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database_name?retryWrites=true&w=majority
```

### Update Your .env File

Open your `.env` file and replace the incomplete connection string with your full one:

```env
MONGO_URI=mongodb+srv://myusername:mypassword@cluster0.abc123.mongodb.net/personal-website?retryWrites=true&w=majority
JWT_SECRET=some_random_long_string_change_this_in_production
```

**IMPORTANT**: 
- Replace `myusername` with your MongoDB username
- Replace `mypassword` with your MongoDB password
- Replace `cluster0.abc123.mongodb.net` with your actual cluster URL
- If your password contains special characters like `@`, `#`, `%`, etc., you need to URL-encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`
  - Or use the MongoDB Atlas "Copy" button which auto-encodes it for you

### Generate a JWT Secret

Generate a strong random string for JWT_SECRET:

```bash
# On Mac/Linux, run this in terminal:
openssl rand -base64 32

# Or use Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Add it to your `.env` file:
```env
JWT_SECRET=your_generated_secret_here
```

## Step 2: Test MongoDB Connection

1. Start your development server:
```bash
npm run dev
```

2. Test the connection by visiting:
```
http://localhost:3000/api/test-db
```

You should see:
```json
{
  "success": true,
  "message": "Connected to MongoDB successfully",
  "database": "personal-website",
  "collections": []
}
```

If you see an error like "bad auth : authentication failed":
- ✅ Double-check your username and password
- ✅ Make sure special characters are URL-encoded
- ✅ Verify the user exists in MongoDB Atlas (Database Access section)
- ✅ Check that your IP is whitelisted (Network Access section)

## Step 3: Create Your First Admin Account

### Option A: Using the API (Recommended)

Use curl or Postman to create your admin account:

```bash
curl -X POST http://localhost:3000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourdomain.com",
    "password": "YourSecurePassword123!",
    "name": "Your Name"
  }'
```

You should see:
```json
{
  "success": true,
  "message": "Admin account created successfully",
  "adminId": "..."
}
```

### Option B: Using a Web Form

Create a temporary page at `src/app/setup/page.tsx`:

```tsx
"use client";

import { useState } from "react";

export default function Setup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      setMessage(data.success ? "Admin created!" : data.error);
    } catch (err) {
      setMessage("Error creating admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Create Admin Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Admin
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
```

Then visit `http://localhost:3000/setup` and create your account. **Delete this page after you're done!**

## Step 4: Login

1. Visit `http://localhost:3000/adminlogin`
2. Enter the email and password you just created
3. You should be redirected to the admin dashboard at `/admin`

## Step 5: Secure Your Setup (IMPORTANT)

### For Production:

1. **Disable or protect the create-admin endpoint** by adding this check to the top of the route handler:

```typescript
// In src/app/api/auth/create-admin/route.ts
if (process.env.NODE_ENV === 'production') {
  return NextResponse.json(
    { success: false, error: 'This endpoint is disabled in production' },
    { status: 403 }
  );
}
```

2. **Delete the setup page** if you created one

3. **Use a strong JWT_SECRET** - generate a new one for production

4. **Enable HTTPS** for your production deployment

5. **Set secure cookie settings** - already configured in `src/lib/auth.ts`

## How It Works

1. **Login Flow**:
   - User submits email/password at `/adminlogin`
   - API validates credentials against MongoDB `admins` collection
   - If valid, creates a JWT token and sets an HTTP-only cookie
   - User is redirected to `/admin`

2. **Protected Routes**:
   - Admin dashboard checks for valid session on load
   - If no valid session, redirects to login
   - Session persists for 7 days

3. **Logout**:
   - Clears the authentication cookie
   - Redirects to login page

## Troubleshooting

### "bad auth : authentication failed"
- Your MongoDB credentials are wrong or your connection string is malformed
- Check username, password, and make sure special characters are URL-encoded

### "Failed to connect to MongoDB"
- Your MongoDB URI is incomplete or incorrect
- Check that MongoDB Atlas cluster is running
- Verify your IP is whitelisted in Network Access

### "Invalid email or password" when logging in
- Make sure you've created an admin account first
- Check that the credentials match exactly
- Verify the admin exists in MongoDB Atlas (browse the `admins` collection)

### Redirects to login immediately after successful login
- Check browser console for errors
- Make sure cookies are enabled
- Verify JWT_SECRET is set in .env

## Next Steps

- Add password reset functionality
- Implement email verification
- Add multi-factor authentication
- Create admin user management page
- Set up role-based permissions
