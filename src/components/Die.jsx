export default function Die(props) {
  return (
    <div
      className={` h-12 w-12 drop-shadow-md rounded-md flex items-center justify-center cursor-pointer bg-white ${
        props.isHeld ? "bg-green-400" : "bg-white"
      }`}
      onClick={props.holdDice}
    >
      <p className="text-4xl font-semibold cursor-pointer">{props.value}</p>
    </div>
  );
}
