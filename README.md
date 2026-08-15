# ⚡ Energy Cost Calculator (Full-Stack Project)

This project is a web application that calculates energy costs based on annual and monthly consumption data, taking custom discount systems into account. The goal of the project was the practical implementation of Docker-based containerization and self-hosting (On-premise).

---

## 💡 Technical Approach & Takeaways

Although the frontend relies on Vanilla HTML/JS, the real power of the project lies in the backend. During development, the biggest challenge and learning point was building the infrastructure:

*   **Docker & Docker Compose:** The frontend and backend run in separate containers, ensuring portability.
*   **Network & Security:** Hosted on my own server (under Apache2), I learned Reverse Proxy configurations, SSL encryption implementation, and how an HTTPS frontend can communicate with an HTTP Docker backend.

---

## 📊 Features

*   **Matrix-based data entry:** Handling monthly and annual data in a CSV-like format.
*   **Intelligent Discount System:** If the cost exceeds 350,000 HUF for two consecutive years, the system automatically applies a 13% discount for the following year, which is also indicated visually (with highlighting and a star).
*   **Responsive Tables:** On mobile devices, the table doesn't just "shrink", but reorganizes into columns, keeping it readable on smaller screens.

---

## 🛠️ Installation and Running (Docker)

Docker and Docker Compose are essential to run the project. If you haven't installed them yet, you can find the installation guide for all operating systems on the official website:

    https://www.docker.com/products/docker-desktop/

**Step 1: Build the Backend image** 
Navigate to the `BACKEND/Villanyszamla_backend` folder and run:

    docker build -t villanyszamlakoltsegek-backend .

**Step 2: Build the Frontend image** 
Navigate to the `FRONTEND/Villanyszamlakoltsegek` folder and run:

    docker build -t villanyszamlakoltsegek-frontend .

**Step 3: Start the containers** 
Navigate to the `DOCKER` directory (where the `docker-compose.yaml` is located) and run:

    docker compose up

**Step 4: Open in browser** 
After a successful start, the application is accessible at the following address:

    http://127.0.0.1:8081/
