import { useSelector } from "react-redux";
import GameBoard from "../components/GameBoard";

import PlayerComponent from "../components/PlayerComponent";
import { useEffect, useState } from "react";
import WinnerModal from "../components/WinnerModal";
import socket from "../socket";

const GamePage = () => {
  const [showwinner, setShowWinner] = useState(false);
  const gameBoard = useSelector((state) => state.gameBoard);
  const activeTileId = useSelector((state) => state.activeTileId);

  if (!gameBoard) {
    return null;
  }

  const player = useSelector((state) => state.playerid);
  const winner=useSelector((state)=>state.winner)

  return (
    <div className="justify-center items-center bg-red-100 h-full w-full flex flex-col">
      {showwinner ? (
        <WinnerModal />
      ) : (
        <div>
          {" "}
          <PlayerComponent player={2} />
          <div className="h-96 w-96 bg-indigo-200 rounded-xl self-center">
            <GameBoard gameBoard={gameBoard} activeTileId={activeTileId} />
          </div>
          <PlayerComponent player={1} />
        </div>
      )}
    </div>
  );
};
export default GamePage;
