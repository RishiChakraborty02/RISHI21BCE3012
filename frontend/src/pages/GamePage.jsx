import { useDispatch, useSelector } from "react-redux";
import GameBoard from "../components/GameBoard";
import PlayerComponent from "../components/PlayerComponent";
import { useEffect, useState } from "react";
import WinnerModal from "../components/WinnerModal";
import socket from "../socket";
import { playerJoinUpdate } from "../features/game/gameSlice";

const GamePage = () => {
  const dispatch = useDispatch();
  const gameBoard = useSelector((state) => state.gameBoard);
  const activeTileId = useSelector((state) => state.activeTileId);
  const winner = useSelector((state) => state.winner);
  const gameCode = useSelector((state) => state.sessionDetails.game_id);

  const player2Joined = useSelector(
    (state) => state.sessionDetails.player_2_joined
  );
  const playerId = useSelector((state) => state.playerid);

  const deletedObjects = useSelector((state) => state.deletedObjects);
  const movesHistory = useSelector((state) => state.movesHistory);

  console.log(deletedObjects);

  if (!gameBoard) {
    return null;
  }

  useEffect(() => {
    socket.on("playerJoined", (data) => {
      console.log("MEOW,data", data);
      dispatch(playerJoinUpdate());
    });
  }, []);

  return (
    <div className="justify-center items-center bg-red-100 h-full w-full flex flex-col">
      <div className="flex flex-col justify-center items-center">
        {winner && <WinnerModal winner={winner} />}
        <PlayerComponent
          player={2}
          showLoading={!player2Joined}
          showCode={gameCode}
        />
        {/* Assuming player 2 is the opponent */}
        <div className="flex flex-row justify-center gap-2 ">
          <div className="h-90 w-36 bg-indigo-400 rounded-xl">
            <div className="justify-center items-center flex">
              <h1 className="text-xl mt-1">Move history</h1>
            </div>

            <div className="h-80 overflow-y-auto">
              {" "}
              {/* Added fixed height and overflow */}
              {movesHistory
                .slice()
                .reverse()
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-around p-2 bg-blue-400 mb-1"
                    >
                      <div>{item.player}</div>
                      <div>
                        {item.fromId} to {item.toId}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="h-96 w-96 bg-indigo-200 rounded-xl self-center flex flex row">
            <GameBoard gameBoard={gameBoard} activeTileId={activeTileId} />
          </div>
          <div className="h-90 w-36 bg-indigo-400 rounded-xl ">
            <div className="justify-center items-center flex">
              <h1 className="text-xl mt-1 ">Out characters</h1>
            </div>
            <div>
              {deletedObjects.map((item, index) => {
                return <div className="flex justify-center items-center">
                  <div className="flex justify-center items-center text-center ">
                    <h1>{item.occupiedBy}-{item.character==0?"P":item.character==1?"H1":item.character==2?"H2":"error"}</h1>
                  </div>
                </div>;
              })}
            </div>
          </div>
        </div>

        <PlayerComponent
          player={1} // Assuming player 1 is the current player
        />
      </div>
    </div>
  );
};

export default GamePage;
