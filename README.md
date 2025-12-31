<div align="center"><img width="950" height="376" alt="image" src="https://github.com/user-attachments/assets/ff238113-6879-466e-ac24-6510137c3dbc" /></div>

<div>
  <p align="center">SantaMatch is a simple tool for organizing Secret Santa–style gift exchanges. It allows users to create groups, add participants, and automatically match each participant with someone to gift to, while keeping assignments private and fair.</p>
</div>

---

### Key Features 
- Zero Authentication Required – Instant group creation without sign-ups
- Random Matching – Handles exclusion constraints and ensures valid pairings
- One-Time Reveal – Prevents spoilers by enforcing single-view matches
- Shareable Links – Simple URL sharing for all participants
- Budget Management – Set spending limits for the group
- Automated Cleanup – AWS Lambda removes groups after 30 days
- Rate Limiting – Redis-based protection against brute-force attacks
- Real-Time Monitoring – Prometheus metrics for request tracking

---

### Key Design Decisions 
#### Why No Authentication? 
- Reduced friction for casual users
- Eliminates password storage and account management overhead
- Groups auto-expire after 30 days for privacy

#### Why PostgreSQL? 
- Relational data naturally fits group -> participants -> matches
- Native UUID support for secure, unguessable URLs

---

### Tech Stack 
#### Frontend 
- Next.js
- TypeScript
- Tailwind CSS
- Cypress

#### Backend 
- FastAPI
- SQLAlchemy
- Pydantic
- Pytest

#### Infrastructure 
- PostgreSQL
- Redis
- Docker
- AWS Lambda
- Prometheus
- GitHub Actions

---

### Documentation
To understand how different users interact with SantaMatch, refer to the use case diagram below.

![Use Case Diagram](docs/use-case-diagram.png)

Full API Documentation: https://santa-match.onrender.com/docs (Swagger UI) 

---

### CI Pipelines 
GitHub Actions automatically runs:
- All Pytest tests
- All Cypress E2E tests
- Prettier code formatting checks
