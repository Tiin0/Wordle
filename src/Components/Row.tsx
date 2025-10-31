import Cell from "./Cell";

type CellData = { 
  letter: string; 
  status: string | null 
};

type RowProps = {
  row: CellData[];
};

function Row({ row }: RowProps) {
  return (
    <div className="flex">
      {row.map((cell, cellIndex) => (
        <Cell
          key={cellIndex}
          letter={cell.letter}
          status={cell.status}
          index={cellIndex}
        />
      ))}
    </div>
  );
}

export default Row;
