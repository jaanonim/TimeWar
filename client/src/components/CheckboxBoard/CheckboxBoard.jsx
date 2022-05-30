function CheckboxBoard({ infoText, value, onChange }) {
  let board = [];

  const generateBlankBoard = (width, height) => {
    let tab = [];
    for (let i = 0; i < height; i++) {
      tab[i] = [];
      for (let j = 0; j < width; j++) {
        tab[i][j] = false;
      }
    }
    return tab;
  };

  if (value.board == null) {
    let tab = generateBlankBoard(value.width, value.height);
    onChange({
      width: value.width,
      height: value.height,
      board: tab,
    });
    return null;
  }

  for (let i = 0; i < value.width; i++) {
    for (let j = 0; j < value.height; j++) {
      board.push(
        <input
          key={`checkbox${i}x${j}`}
          type={"checkbox"}
          checked={value.board[j][i]}
          onChange={(e) => {
            value.board[j][i] = e.target.checked;
            onChange({
              width: value.width,
              height: value.height,
              board: [...value.board],
            });
          }}
        />
      );
    }
    board.push(<br />);
  }
  return (
    <div>
      <div>
        {infoText}
        <input
          type="number"
          size="2"
          value={value.width}
          onChange={(e) => {
            let tab = generateBlankBoard(e.target.value, value.height);
            onChange({
              width: e.target.value,
              height: value.height,
              board: tab,
            });
          }}
        />
        X
        <input
          type="number"
          size="2"
          value={value.height}
          onChange={(e) => {
            let tab = generateBlankBoard(value.width, e.target.value);
            onChange({
              width: value.width,
              height: e.target.value,
              board: tab,
            });
          }}
        />
      </div>
      <div>{board}</div>
    </div>
  );
}

export default CheckboxBoard;
