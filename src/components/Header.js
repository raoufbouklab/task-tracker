import Button from "./Button";

const Header = ({ title, showAdd, onShowAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onShowAdd={onShowAdd}
      />
    </header>
  );
};

export default Header;
