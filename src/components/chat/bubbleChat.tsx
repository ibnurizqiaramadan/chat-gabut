export default function BubbleChat(props: {
  text: String
  timestamp: number
  sender?: Boolean
}) {
  return (
    <div className={`flex flex-col ${props.sender ? 'items-end justify-end' : 'items-start justify-start'}`}>
      <span className={`text-xs mb-1`}>
        {new Date(props.timestamp).toISOString()}
      </span>
      <div className="bg-gray-600 text-white p-3 rounded-xl max-w-md">
        {props.text}
      </div>
    </div>
  );
}
