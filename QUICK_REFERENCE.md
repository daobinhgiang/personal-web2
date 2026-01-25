# Quick Reference Guide - Blog Management

Quick commands and endpoints for managing your blog.

---

## 🚀 Quick Start

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env with your MongoDB URI

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Access admin dashboard
# Visit: http://localhost:3000/adminlogin
```

---

## 🔗 Important URLs

| Page | URL | Purpose |
|------|-----|---------|
| Home | `http://localhost:3000` | Main landing page |
| Blog | `http://localhost:3000/blog` | All blog posts |
| Admin Login | `http://localhost:3000/adminlogin` | Admin authentication |
| Admin Dashboard | `http://localhost:3000/admin` | Post management |
| Create Post | `http://localhost:3000/admin/new-post` | New post form |
| Test DB | `http://localhost:3000/api/test-db` | MongoDB connection test |

---

## 📡 API Endpoints Cheat Sheet

### Get All Posts
```javascript
GET /api/posts
// Returns: { success: true, posts: [...] }
```

### Create Post
```javascript
POST /api/posts
Body: { title, content, excerpt, author }
// Returns: { success: true, postId: "..." }
```

### Get Single Post
```javascript
GET /api/posts/[id]
// Returns: { success: true, post: {...} }
```

### Update Post
```javascript
PUT /api/posts/[id]
Body: { title, content, excerpt }
// Returns: { success: true, modified: true }
```

### Delete Post
```javascript
DELETE /api/posts/[id]
// Returns: { success: true }
```

### Batch Delete
```javascript
POST /api/posts/batch-delete
Body: { postIds: ["id1", "id2", ...] }
// Returns: { success: true, deletedCount: n }
```

---

## 🎯 Common Tasks

### Create a New Post
1. Go to Admin Dashboard → Click "New Post"
2. Fill in title and content (required)
3. Add excerpt (optional)
4. Click "Publish Post"

### Delete a Single Post
1. Go to Admin Dashboard
2. Find post in "Recent Posts"
3. Click "Delete" button
4. Confirm deletion

### Delete Multiple Posts
1. Go to Admin Dashboard
2. Click "Delete Posts" button
3. Check boxes for posts to delete
4. Click "Delete (n)" button
5. Confirm deletion

### View a Post
- From home page: Click post title
- From blog page: Click post title or "Read more"
- From dashboard: Click "View" button

---

## 🔐 Environment Variables

```bash
# Required
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Optional
NEXT_PUBLIC_BASE_URL=http://localhost:3000
JWT_SECRET=your-secret-key
```

---

## 📋 Post Object Structure

```javascript
{
  _id: "65abc123...",              // MongoDB ID
  title: "Post Title",             // Required
  content: "Post content...",      // Required
  excerpt: "Brief summary",        // Optional
  author: "Author Name",           // Default: "Anonymous"
  createdAt: "2026-01-25T...",    // Auto-generated
  updatedAt: "2026-01-25T..."     // Auto-updated
}
```

---

## 🛠️ Troubleshooting

### Can't Connect to MongoDB
```bash
# Check connection string
echo $MONGO_URI

# Test connection
curl http://localhost:3000/api/test-db
```

### No Posts Showing
```bash
# Check API directly
curl http://localhost:3000/api/posts
```

### Can't Access Admin Dashboard
```bash
# Clear cookies and login again
# Check session endpoint
curl http://localhost:3000/api/auth/session
```

---

## 📝 Markdown Support

Posts support basic markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**bold text**
*italic text*
`inline code`

[link text](https://url.com)
```

---

## 🔥 Quick Bash Commands

```bash
# Create new post via API
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Content here"}'

# Get all posts
curl http://localhost:3000/api/posts

# Get single post
curl http://localhost:3000/api/posts/[POST_ID]

# Delete post
curl -X DELETE http://localhost:3000/api/posts/[POST_ID]
```

---

## 📊 Stats & Analytics

Current dashboard shows:
- Total Posts count
- Recent posts list (all posts)
- Post creation date
- Author information
- Read time calculation

---

## 🎨 Customization

### Change Author Name
Edit in `/src/app/admin/new-post/page.tsx`:
```javascript
author: user?.name || user?.email || 'Admin'
```

### Change Posts Per Page (Home)
Edit in `/src/app/page.tsx`:
```javascript
data.posts.slice(0, 3)  // Change 3 to desired number
```

### Change Read Speed
Edit read time calculation:
```javascript
const wordsPerMinute = 200;  // Adjust this value
```

---

## 📚 File Structure

```
/src
  /app
    /admin              # Dashboard
      /new-post         # Create post page
      page.tsx          # Dashboard home
    /api
      /posts            # Post endpoints
        /[id]           # Single post operations
        /batch-delete   # Bulk delete
        route.ts        # List & create
    /blog               # Public blog
      /[id]             # Individual post
      page.tsx          # Blog list
    page.tsx            # Home page
  /lib
    mongodb.ts          # DB connection
  /components           # Reusable components
```

---

## ⚡ Performance Tips

1. **Use Batch Operations**: Delete multiple posts at once
2. **Cache Strategy**: Pages use `cache: 'no-store'` for fresh data
3. **Index Database**: Add indexes for frequently queried fields
4. **Pagination**: Consider for blogs with 50+ posts

---

## 🔒 Security Checklist

- [ ] `.env` file in `.gitignore`
- [ ] MongoDB IP whitelist configured
- [ ] Strong database password
- [ ] Admin dashboard protected
- [ ] JWT_SECRET is random and strong
- [ ] HTTPS enabled in production

---

## 📞 Need Help?

1. Check `MONGODB_API_GUIDE.md` for detailed docs
2. Check `CHANGES_SUMMARY.md` for what changed
3. Check browser console for errors
4. Check terminal for server errors
5. Test API endpoints with curl

---

**Quick Tip**: Bookmark this page for fast reference during development!
