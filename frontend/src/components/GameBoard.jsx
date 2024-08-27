import { useSelector } from "react-redux";
import TilesComponent from "./TilesComponent";

const GameBoard = ({ gameBoard, activeTileId }) => {
  const isGameCreatedByMe=useSelector((state)=>state.playerid)
  return (
    <div className={`grid grid-cols-5 gap-2 p-4 ${isGameCreatedByMe==1?"rotate-180":""} justify-center items-center`}>
      {gameBoard.map((tile) => (
        <TilesComponent key={tile.id} item={tile} />
      ))}
    </div>
  );
};

export default GameBoard;
