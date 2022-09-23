const Button = ({ color, text, onShowAdd }) => {
  return (
    <div>
      <button
        onClick={onShowAdd}
        className="btn"
        style={{ backgroundColor: color }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
