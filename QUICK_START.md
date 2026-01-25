# Quick Start: Fix MongoDB & Setup Admin Login

## 🔴 Issue: "bad auth : authentication failed"

Your MongoDB connection string is incomplete. Here's how to fix it:

## ✅ Step 1: Get Your Complete MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the **complete** connection string

It should look like:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/personal-website?retryWrites=true&w=majority
```

## ✅ Step 2: Update Your .env File

Open `/Users/giangmichaeldao/project/personal-web/.env` and replace the current incomplete line with:

```env
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/personal-website?retryWrites=true&w=majority
JWT_SECRET=please_change_this_to_a_random_long_string
```

**Replace**:
- `YOUR_USERNAME` = your MongoDB username
- `YOUR_PASSWORD` = your MongoDB password (URL-encode special characters!)
- `YOUR_CLUSTER` = your cluster address (e.g., cluster0.abc123)

### ⚠️ Special Characters in Password

If your password has special characters, URL-encode them:
- `@` → `%40`
- `#` → `%23`  
- `%` → `%25`
- `&` → `%26`

Example:
```
Password: Pass@123#
Encoded:  Pass%40123%23
```

## ✅ Step 3: Generate JWT Secret

Run this in your terminal:

```bash
openssl rand -base64 32
```

Copy the output and add it to your `.env`:

```env
JWT_SECRET=the_generated_string_goes_here
```

## ✅ Step 4: Test MongoDB Connection

```bash
# Start dev server
npm run dev

# In another terminal or browser:
curl http://localhost:3000/api/test-db
```

You should see:
```json
{"success":true,"message":"Connected to MongoDB successfully",...}
```

## ✅ Step 5: Create Your First Admin Account

### Option 1: Use the Setup Page (Easiest)

1. Visit: `http://localhost:3000/setup`
2. Fill in your details:
   - Name: Your Name
   - Email: admin@yourdomain.com
   - Password: (at least 8 characters)
3. Click "Create Admin Account"
4. **IMPORTANT**: Delete `/src/app/setup/page.tsx` after you're done!

### Option 2: Use curl

```bash
curl -X POST http://localhost:3000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yourdomain.com",
    "password": "YourSecurePassword123",
    "name": "Your Name"
  }'
```

## ✅ Step 6: Login

1. Go to: `http://localhost:3000/adminlogin`
2. Enter your email and password
3. You should be redirected to the admin dashboard!

## 🎉 Done!

Your admin authentication is now working with MongoDB!

## Common Issues

### Still getting "bad auth"?
- ✅ Username/password is wrong
- ✅ Special characters aren't URL-encoded
- ✅ Database user doesn't exist in Atlas (check "Database Access")
- ✅ IP not whitelisted (check "Network Access")

### "Invalid email or password" when logging in?
- ✅ Did you create an admin account first?
- ✅ Are you using the exact email/password you created?

### Can't connect to MongoDB at all?
- ✅ Is your cluster running in MongoDB Atlas?
- ✅ Is your connection string complete?
- ✅ Check MongoDB Atlas status page

## Need More Help?

See the detailed guides:
- `AUTH_SETUP.md` - Complete authentication setup guide
- `MONGODB_SETUP.md` - MongoDB Atlas setup guide
