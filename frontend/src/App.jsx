import { useState, useEffect } from "react";
import GamePage from "./pages/GamePage";
import EntryPage from "./pages/EntryPage";
import socket from "./socket";
import { useSelector } from "react-redux";

function App() {
  const gameId = useSelector((state) => state.sessionDetails.game_id);
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      socket.emit("leaveGame");
      console.log("Disconnected from server:", reason);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-screen justify-center items-center">
      {gameId ? <GamePage /> : <EntryPage />}
    </div>
  );
}

export default App;
