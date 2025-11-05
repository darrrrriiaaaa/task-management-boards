# Task Management Boards
This is a full-stack web app that allows users to manage their tasks visually using boards, columns, and cards.
Built with React, Redux Toolkit, Express, and MongoDB.

## Features
- create, edit, and delete boards, columns, and cards
- manage cards
- drag & drop support
- persistent data storage using MongoDB
- interface built with Tailwind

## Technologies
- **Frontend**: React, Redux Toolkit, React Router, DnD kit, Tailwind
- **Backend**: Node.js + Express, MongoDB, cors, dotenv

## Installation
1. Clone the repository
```
git clone https://github.com/darrrrriiaaaa/task-management-boards.git
cd task-management-boards
```
2. Install dependencies
```
cd backend
npm install
cd ../frontend
npm install
```
3. Run both frontend and backend
```
cd ..
npm install concurrently
npm start
```

## Usage
Click on any existing board name to open it. Create new boards, edit existing ones, or delete them.
Edit columns' names, delete them, add new ones. 
dd new cards, edit them, delete them, drag them to other columns.
Use Search bar on the Home page to search board by ID.

## Contributing
If you want to help, open a pull request or an issue. Any improvements are welcome!
