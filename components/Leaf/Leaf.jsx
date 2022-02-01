const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      className={leaf.showTooltip ? "tooltip" : ""}
      style={{
        backgroundColor: leaf.showTooltip ? "#ffeeba" : "",
      }}>
      {children}
    </span>
  );
};

export { Leaf };
