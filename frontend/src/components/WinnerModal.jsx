import { useSelector } from "react-redux";
const WinnerModal = () => {
  const winner= useSelector((state) => state.winner);
  return (
    <div className="bg-black h-3/4 w-1/2 self-center flex" >

    </div>
  )
}
export default WinnerModal