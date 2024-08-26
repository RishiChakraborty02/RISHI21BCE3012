import { useEffect, useState } from "react";
import socket from "../socket";
import { useDispatch } from "react-redux";
import { createnewSession, joinSession } from "../features/game/gameSlice";

const EntryPage = () => {
  const [game, setGame] = useState("");
  const dispatch = useDispatch();

  function joinGame() {
    if (game.length) {
      socket.emit("joinGame", game);
    }
  }

  function createSession() {
    socket.emit("createGame");
  }

  useEffect(() => {
    socket.on("gameJoined", (data) => {
      dispatch(joinSession(data))

    });

    socket.on("gameCreated", (data) => {
      console.log(data);
      dispatch(createnewSession(data.gameId));
    });

    return () => {
      socket.off("gameJoined");
      socket.off("gameCreated");
    };
  }, []);

  return (
    <div className="h-screen w-screen justify-center items-center flex">
      <div className="h-80 w-80 bg-sky-500 rounded-md self-center">
        <div className="justify-center items-center">
          <h1 className="text-2xl font-bold text-center">
            Welcome to the Game
          </h1>
          <div className="flex flex-col items-center">
            <h3 className="text-xl text-bold">Join a game</h3>
            <input
              type="text"
              placeholder="Enter Game ID"
              className="h-10 w-60 rounded-md m-2 p-2"
              onChange={(e) => setGame(e.target.value)}
            />
            <button
              className="p-2 flex justify-center items-center bg-blue-600 rounded-xl text-white"
              onClick={joinGame}
            >
              Join
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col">
          <h3 className="">Create a new game</h3>
          <button
            className="bg-red-400 p-2 rounded-xl text-white"
            onClick={createSession}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
