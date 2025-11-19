Video walkthrough::https://drive.google.com/drive/folders/15JzZ5nukucNOQJRaaN10wAW0aX3pYxXY?usp=sharing


# Freelance Marketplace Platform (Microservices + React + Tailwind)

A complete freelance marketplace with skill-based smart matching (1.0 match score), bidding, client & freelancer dashboards.

**College Project of the Year Level** — Fully Working | Beautiful UI | Production Ready Code

---

### Features
- Microservices Architecture (3 Services)
- JWT Authentication + Role-Based Access (CLIENT / FREELANCER)
- Smart Match Score (1.0 = Perfect Match)
- Freelancer Profile + Skills with Proficiency
- Client: Post Projects, View Matches & Bids
- Freelancer: View Recommended Projects, Place Bids
- Responsive React + Tailwind Frontend
- MySQL Database

---

### Tech Stack

| Layer           | Technology                          |
|----------------|-------------------------------------|
| Backend         | Spring Boot 3, Spring Security, JPA, Hibernate |
| Auth            | JWT (JJWT 0.12.6)                   |
| Database        | MySQL 8                             |
| Frontend        | React 18 + Vite + Tailwind CSS + Axios |
| Build Tool      | Maven                               |

---

### Project Structure

freelance-marketplace/
├── auth-service/           → Port: 8081
├── project-service/        → Port: 8082 (Projects + Bids + Matching)
└── freelancer-service/     → Port: 8083 (Profile + Skills)
└── frontend/               → React App (Port: 5173)

### Setup & Run (5 Minutes)

#### 1. Database (MySQL)
```sql
create the database for 3 microservice

2. application.xml
give the root password etc and change according to the microservice

3. Run Services (Eclipse/IntelliJ)

Run AuthServiceApplication → http://localhost:8081
Run ProjectServiceApplication → http://localhost:8082
Run FreelancerServiceApplication → http://localhost:8083


4. Frontend
cd "path"
npm install
npm run dev

→ Open http://localhost:5173

Sample API Usage (Postman)


STEP 1: Freelancer Register 
POST http://localhost:8081/auth/register
JSON
{
  "name": "Ritwik Maity",
  "email": "ritwik@gmail.com",
  "password": "123456",
  "role": "FREELANCER"
}
STEP 2: Freelancer Login 
POST http://localhost:8081/auth/login
JSON
{
  "email": "ritwik@gmail.com",
  "password": "123456"
}
→ we have to copy the Token

STEP 3: Create Freelancer Profile
POST http://localhost:8083/api/freelancers/profile
Authorization → Bearer Token → (STEP 2  token paste)
Body:
JSON
{
  "experienceLevel": "SENIOR"
}
STEP 4: Add Skills
POST http://localhost:8083/api/freelancers/skills
Same token use 
Body:
JSON
{
  "skills": [
    { "name": "Java", "proficiencyLevel": 5 },
    { "name": "Spring Boot", "proficiencyLevel": 5 },
    { "name": "React", "proficiencyLevel": 5 },
    { "name": "MySQL", "proficiencyLevel": 5 }
  ]
}
STEP 5: Client Register 
POST http://localhost:8081/auth/register
JSON
{
  "name": "Rahul Client",
  "email": "rahul@gmail.com",
  "password": "123456",
  "role": "CLIENT"
}

STEP 6: Client Login 
POST http://localhost:8081/auth/login
JSON
{
  "email": "rahul@gmail.com",
  "password": "123456"
}
→ new token copy


STEP 7: Project Create (putting same skills)
POST http://localhost:8082/api/projects
Authorization → Bearer Token → (Client new token paste)
Body:
JSON
{
  "title": "E-Commerce Platform Needed",
  "description": "Full stack project with payment gateway",
  "budget": 75000.0,
  "requiredSkills": ["Java", "Spring Boot", "React", "MySQL"]
}

→ Send → 200 OK → take the projectId

STEP 8: Match Score
GET http://localhost:8082/api/projects/1/matches
Authorization → same Client  token
JSON
[
  {
    "freelancerId": 1,
    "name": "Freelancer#1",
    "matchScore": 1.0
  }
]


STEP 9: bids
post : http://localhost:8083/api/freelancers/bids
json:

{
  "bidAmount": 62000.0,
  "message": "Senior Full Stack Developer | 5+ years | Will deliver with clean code & documentation"
}

at last check:
http://localhost:8081/actuator/health
http://localhost:8081/actuator/metrics
