import { useSelector } from "react-redux";
const PlayerComponent = ({ player, showLoading, showCode }) => {


  console.log(showLoading)

  return (
    <div className={`h-16 w-96 bg-red-400 rounded-md m-2 flex justify-center items-center`}>
      {player == 1 ? (
        <h1 className="text-xl font-sans text-red-800">Player {player} : You</h1>
      ) : null}

      {
        player == 2 && !showLoading ? (
          <h1 className="text-xl font-sans text-red-800">Player {player} : Opponent</h1>
        ) : null
      }

      {
        player == 2 && showLoading ? (
          <h1 className="text-xl font-sans text-red-800">
            Waiting for opponent to join: {showCode}
          </h1>
        ) : null
      }
    </div>
  );
};
export default PlayerComponent;
