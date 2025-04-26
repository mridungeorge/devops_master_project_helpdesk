
# DevCompass - AI-Powered Issue Tracker and DevOps Dashboard

## Local Development Setup

### Prerequisites
- Node.js 16+ and npm
- Docker and Docker Compose (for containerized deployment)
- Supabase account (for backend services)

### Environment Setup
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Setup
1. Create a new Supabase project
2. Set up the following tables in the Supabase database:

**users**
```sql
create table users (
  id uuid references auth.users on delete cascade,
  name text not null,
  email text not null unique,
  role text not null check (role in ('Admin', 'Developer', 'Tester')),
  avatar text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table users enable row level security;

-- Create policies
create policy "Users can view all users" on users
  for select using (true);

create policy "Users can update their own user data" on users
  for update using (auth.uid() = id);
```

**tickets**
```sql
create table tickets (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  status text not null check (status in ('Open', 'In Progress', 'Review', 'Done')),
  priority text not null check (priority in ('Low', 'Medium', 'High', 'Critical')),
  assignee_id uuid references users(id),
  reporter_id uuid references users(id) not null,
  ai_suggestion text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table tickets enable row level security;

-- Create policies
create policy "Users can view all tickets" on tickets
  for select using (true);

create policy "Users can create tickets" on tickets
  for insert with check (auth.uid() = reporter_id);

create policy "Users can update tickets they created or are assigned to" on tickets
  for update using (
    auth.uid() = reporter_id or 
    auth.uid() = assignee_id
  );
```

**comments**
```sql
create table comments (
  id uuid default uuid_generate_v4() primary key,
  ticket_id uuid references tickets(id) on delete cascade not null,
  content text not null,
  author_id uuid references users(id) not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table comments enable row level security;

-- Create policies
create policy "Users can view all comments" on comments
  for select using (true);

create policy "Users can create comments" on comments
  for insert with check (auth.uid() = author_id);
```

3. Enable Email Authentication in Supabase Auth settings

### Running Locally

#### Development Mode
```bash
npm install
npm run dev
```

#### Production Build
```bash
npm install
npm run build
npm run preview
```

### Docker Deployment

#### Build and Run with Docker Compose
```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Login with email and password

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@example.com",
    "role": "Developer",
    "avatar": "https://avatar-url"
  },
  "session": {
    "access_token": "jwt-token",
    "refresh_token": "refresh-token"
  }
}
```

#### POST /api/auth/logout
Log out the current user

#### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "Developer"
}
```

### Ticket Endpoints

#### GET /api/tickets
Get all tickets

#### POST /api/tickets
Create a new ticket

**Request:**
```json
{
  "title": "New Feature Request",
  "description": "Add dark mode to the application",
  "status": "Open",
  "priority": "Medium",
  "assignee_id": "uuid-or-null"
}
```

#### GET /api/tickets/:id
Get a specific ticket by ID

#### PUT /api/tickets/:id
Update a ticket

**Request:**
```json
{
  "title": "Updated Title",
  "status": "In Progress",
  "priority": "High"
}
```

#### DELETE /api/tickets/:id
Delete a ticket

#### GET /api/tickets/:id/comments
Get all comments for a ticket

#### POST /api/tickets/:id/comments
Add a comment to a ticket

**Request:**
```json
{
  "content": "This is looking good. Ready for review."
}
```

### User Endpoints

#### GET /api/users
Get all users

#### GET /api/users/:id
Get a specific user by ID

### Health Check

#### GET /health
Get application health status

**Response:**
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2025-04-26T12:34:56.789Z"
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_SUPABASE_URL | Supabase project URL | https://xyz.supabase.co |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous/public API key | eyJhbGciOiJI... |
| VITE_API_BASE_URL | Base URL for API calls | http://localhost:8080/api |
| VITE_ENABLE_AI_FEATURES | Toggle AI features | true |
| VITE_APP_VERSION | Application version | 1.0.0 |
