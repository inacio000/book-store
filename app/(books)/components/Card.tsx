import Title from '@/components/Tittle'
import Image from 'next/image'
import line from "@/public/line.svg"

interface Books {
    id: string;
    title: string,
    author: string,
    publicationDate: string,
    price: string,
    tags: []
}

export default async function Card() {
    const response = await fetch("http://localhost:3001/books")
    const books = await response.json();

    return (
        <>
            {
                books.map((book: Books) => (
                    <div className="flex flex-col gap-4 bg-[var(--tertiary-bg)] p-4 rounded-2xl">
                        <div>
                            <Title
                                tittle={book.title}
                                number={book.id}
                            />
                        </div>
                        <div>
                            <p className="text-sm">{book.author}</p>
                            <p className="text-sm">{book.publicationDate}</p>
                            <p className="text-sm">{book.price}$</p>
                        </div>
                        <Image
                            src={line}
                            width={0}
                            height={0}
                            alt="Line Separator"
                        />
                        <div className="flex flex-wrap gap-4">
                            {
                                book.tags.map(tag => (

                                    <span className="flex justify-center items-center text-black text-sm bg-[var(--text-color)] px-3 py-2 rounded-3xl">{tag}</span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}