interface TittleProps {
    tittle: string;
    number: string;
}

function Title({
    tittle,
    number
}: TittleProps) {
    return (
        <div className='flex gap-1'>
            <span>{number}</span>
            <h1 className='font-extrabold'>{tittle}</h1>
        </div>
    )
}

export default Title;