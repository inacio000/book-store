import Container from '@/components/Container'
import Card from './Card'

function BookCards() {
    return (
        <Container className="flex flex-col gap-5 p-5">
            <Card />
            <div>
                <h1>
                    <span className='font-extrabold'>TOTAL</span>: 2678$
                </h1>
            </div>
        </Container>
    )
}

export default BookCards;