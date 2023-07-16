export default function Message({ justify, message, style, currentUser }) {
  return (
    <li style={style}>
      <div
        style={{
          width: "fit-content",
          padding: "8px",
          marginTop: "10px",
          borderRadius:
            currentUser?.data?._id === message.senderId
              ? "8px 8px 8px 0px"
              : "8px 0px 8px 8px",
          marginRight: currentUser?.data?._id === message.senderId ? 0 : "30px",
          backgroundColor:
            currentUser?.data?._id === message.senderId
              ? "rgb(20, 94, 168)"
              : "#E8E8E8",
        }}
      >
        <span>{message.content}</span>
      </div>
    </li>
  );
}
