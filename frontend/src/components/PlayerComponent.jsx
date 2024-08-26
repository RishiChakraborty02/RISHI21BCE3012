import { useSelector } from "react-redux";
const PlayerComponent = ({ player }) => {
 
  return (
    <div className="h-16 w-96 bg-red-400 rounded-md m-2 flex justify-center items-center">
      <p>Player {player}</p>
    </div>
  );
};
export default PlayerComponent;
