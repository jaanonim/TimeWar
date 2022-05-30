function SelectBoard({ infoText, options, value, onChange }) {
  let board = [];
  const generateBlankBoard = (width, height) => {
    let tab = [];
    for (let i = 0; i < height; i++) {
      tab[i] = [];
      for (let j = 0; j < width; j++) {
        if (options.length !== 0) {
          tab[i][j] = options[0]["value"];
        } else {
          tab[i][j] = 0;
        }
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
        <select
          key={`select${i}x${j}`}
          value={value.board[j][i]}
          onChange={(e) => {
            value.board[j][i] = e.target.value;
            onChange({
              width: value.width,
              height: value.height,
              board: [...value.board],
            });
          }}
        >
          {options.map((opt) => (
            <option
              key={opt["value"]}
              value={opt["value"]}
              selected={opt["value"] === value.board[j][i]}
            >
              {opt["name"]}
            </option>
          ))}
        </select>
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

export default SelectBoard;
