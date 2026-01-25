# MongoDB Cloud Setup Guide

This guide will help you connect your app to MongoDB Atlas (cloud-hosted MongoDB).

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Sign in to your account

## Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose the **FREE** M0 cluster tier
3. Select your preferred cloud provider and region (choose one closest to your users)
4. Name your cluster (or keep the default name)
5. Click "Create"

## Step 3: Create a Database User

1. In the Security section, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. **IMPORTANT**: Save these credentials securely - you'll need them for the connection string
6. Set the role to "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access

1. In the Security section, click "Network Access"
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, restrict this to your server's IP addresses
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Go back to "Database" in the left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as your driver
5. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Update Your .env File

1. Open your `.env` file
2. Replace the current `MONGO_URI` with your connection string
3. Replace `<username>` with your database username
4. Replace `<password>` with your database password
5. Optionally, add a database name before the `?`:
   ```
   MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/personal-website?retryWrites=true&w=majority
   ```

Example:
```env
MONGO_URI=mongodb+srv://johndoe:SecurePass123@cluster0.abc123.mongodb.net/personal-website?retryWrites=true&w=majority
```

## Step 7: Test Your Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the test endpoint:
   ```
   http://localhost:3000/api/test-db
   ```

3. You should see a success message with your database name and collections

## Using MongoDB in Your App

### In API Routes

```typescript
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  const db = await getDatabase();
  const data = await db.collection('your_collection').find({}).toArray();
  return Response.json(data);
}
```

### Example CRUD Operations

The following API endpoints are already set up for you:

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a single post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post

### Testing with curl

```bash
# Create a post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Post","content":"Hello World!","excerpt":"A test post"}'

# Get all posts
curl http://localhost:3000/api/posts

# Get a specific post (replace <id> with actual post ID)
curl http://localhost:3000/api/posts/<id>

# Update a post
curl -X PUT http://localhost:3000/api/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:3000/api/posts/<id>
```

## Best Practices

1. **Never commit your .env file** - It's already in .gitignore
2. **Use environment variables** for different environments (dev, staging, prod)
3. **Create indexes** for better query performance on frequently accessed fields
4. **Close connections** in serverless environments (the connection utility handles this automatically)
5. **Handle errors** properly in all database operations
6. **Validate input** before inserting into database

## Troubleshooting

### Connection Timeout
- Check your IP is whitelisted in Network Access
- Verify your username and password are correct
- Ensure your connection string format is correct

### Authentication Failed
- Double-check your username and password
- Make sure there are no special characters that need URL encoding in your password
- Verify the database user has proper permissions

### Database Not Found
- MongoDB creates databases on first write operation
- Ensure your connection string includes the database name

## Additional Resources

- [MongoDB Node.js Driver Documentation](https://docs.mongodb.com/drivers/node/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Connection String Options](https://docs.mongodb.com/manual/reference/connection-string/)
