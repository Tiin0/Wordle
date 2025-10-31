import Row from './Row';

type Cell = {letter: string, status: string | null};
type Grid = Cell[][] | null;
type GridProps = {grid: Grid;};

function Grid({grid}: GridProps) {
    if (!grid) return null;
    return(
        <div className='absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y[50%] border-4'>
            {grid.map((row, rowIndex) => (
                <Row key={rowIndex} row={row}/>
            ))}
        </div>
    )



}


export default Grid;