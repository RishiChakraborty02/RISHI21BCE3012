import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Game from "./Game.js";

const app = express();
const PORT = 3001;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust this to match your client URL
    methods: ["GET", "POST"],
  },
});

const games = new Map();

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 9);
}

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("createGame", () => {
    const gameId = generateUniqueId();
    const game = new Game(gameId);

    games.set(gameId, game);
    socket.join(gameId);
    socket.emit("gameCreated", { gameId });
  });

  //when the player disconnects from the game emit an event that the player has left the game

  socket.on("leaveGame", (gameId) => {
    const game = games.get(gameId);
    if (game) {
      game.removePlayer(socket.id);
      socket.leave(gameId);
      if (game.isEmpty()) {
        games.delete(gameId);
      }
      socket.emit("gameLeft");
    } else {
      socket.emit("error", "Game not found");
    }
  });

  socket.on("joinGame", (gameId) => {
    const game = games.get(gameId);
    if (game) {
      game.addPlayer(socket.id);
      socket.join(gameId);
      socket.emit("gameJoined", { gameId, gameState: game.getGameState() });
      io.to(gameId).emit("playerJoined");
      console.log("Player joined game", gameId);
    } else {
      socket.emit("error", "Game not found");
    }
  });

  socket.on("move", ({ gameId, fromId, toId }) => {
    const game = games.get(gameId);
    if (game) {
      console.log("MEOW");
      game.makeMove(fromId, toId);
      io.to(gameId).emit("move", {
        fromId,
        toId,
        gameState: game.getGameState(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
