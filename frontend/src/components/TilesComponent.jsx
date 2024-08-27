import { useDispatch, useSelector } from "react-redux";
import { highlightTiles, validateAndMove,updateGameBoard } from "../features/game/gameSlice";
import socket from "../socket";
import { useEffect, useState } from "react";
// import clickSound from "../assets/sounds/click.mp3";
// import errorSound from "../assets/sounds/error.mp3";

const TilesComponent = ({ item }) => {
  const selectedTile = useSelector((state) => state.activeTileId);

  const created_by = useSelector((state) => state.playerid);
  const gameId = useSelector((state) => state.sessionDetails.game_id);

  const currentPlayer = useSelector((state) => state.currentPlayer);
  const dispatch = useDispatch();

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const onPressHighlight = (character, id) => {
    if (selectedTile && selectedTile !== id) {
      return;
    }
    

    // playSound(clickSound);
    dispatch(highlightTiles({ character, id }));
  };

  const moveWhenClicked = () => {
    if (selectedTile === null) {
      // playSound(errorSound);
      return;
    }

    // playSound(clickSound);
    socket.emit("move", { gameId, fromId: selectedTile, toId: item.id });
    dispatch(validateAndMove({ fromId: selectedTile, toId: item.id }));
  };


  useState(()=>{
    socket.on("move",(data)=>{
      console.log(data)
          dispatch(validateAndMove({ fromId: data.fromId, toId:data.toId }));
    })

  },[])

  return (
    <div
      className={`h-12 w-12 rounded-md m-1 justify-center items-center flex transition-all duration-300 ease-in-out transform hover:scale-105 ${
        item.tileDetails.isOccupied ? "bg-blue-500" : "bg-blue-500"
      } ${item.tileDetails.highlight ? "bg-green-400" : ""} ${
        selectedTile == item.id ? "ring-4 ring-yellow-500" : ""
      } ${created_by == 1 ? "rotate-180" : ""} `}
      onClick={moveWhenClicked}
    >
      {item.tileDetails.isOccupied && (
        <div
          className={`border-2 ${
            item.tileDetails.occupiedBy === "A" ? "bg-sky-400" : "bg-white"
          } h-12 w-12  rounded-md flex justify-center items-center ${
            item.tileDetails.highlight &&
            item.tileDetails.isOccupied &&
            "bg-red-500"
          }`}
          onClick={() => onPressHighlight(item.tileDetails.character, item.id)}
        >
          <p className="text-sm font-bold">
            {item.tileDetails.occupiedBy}-{item.tileDetails.characterName}
          </p>
        </div>
      )}
    </div>
  );
};

export default TilesComponent;
