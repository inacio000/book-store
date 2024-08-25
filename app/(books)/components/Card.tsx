'use client'

import Title from '@/components/Tittle'
import Image from 'next/image'
import line from "@/public/line.svg"
import arrowDown from "@/public/arrowDown.svg"
import arrowUp from "@/public/arrowUp.svg"
import polygonDown from "@/public/polygonDown.svg";
import polygonUp from "@/public/polygonUp.svg";

import noData from "@/public/empty.png"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Container from '@/components/Container'

export interface Books {
    id: string;
    title: string;
    author: string;
    publicationDate: string;
    price: string;
    tags: string[];
}

export default function Card() {
    const [value, setValue] = useState("")
    const [searchOption, setSearchOption] = useState("")
    const [books, setBooks] = useState<Books[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [tagsVisible, setTagsVisible] = useState(false);

    const sortTags = [
        "science fiction",
        "environmentalism",
        "astronomy",
        "physics",
        "climate change",
        "biology",
        "medicine",
        "Biochemistry",
        "health"
    ]

    const sortSearchOption = [
        "price",
        "author",
        "date",
    ]

    const loadingBookData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/books");
            setBooks(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadingBookData();
    }, []);

    const handleSearch = async (e: any) => {
        e.preventDefault();

        return await axios.get(`http://localhost:3001/books?q=${value}`)
            .then((response) => {
                setBooks(response.data)
                setValue("")
            })
            .catch((error) => console.log(error));
    }

    const handleReset = async () => {
        loadingBookData();
        setSearchOption("");
    }

    const handleSearchOption = async (option: string) => {
        setSearchOption(option);
        setSelectedOption(option);

        return await axios
            .get(`http://localhost:3001/books?q=${option}&_order=asc`)
            .then((response) => {
                setBooks(response.data)
            })
            .catch((error) => console.log(error));
    }

    const handleFilter = async (option: string) => {
        setSearchOption(option);
        setSelectedOption(option);

        return await axios
            .get(`http://localhost:3001/books?_sort=${option}&_order=asc`)
            .then((response) => {
                setBooks(response.data)
            })
            .catch((error) => console.log(error));
    }

    const toggleTagsVisibility = () => {
        setTagsVisible(!tagsVisible);
    }

    return (
        <>
            <Container className="flex justify-between px-4 py-3">
                <ul className="flex flex-wrap gap-3 text-xs">
                    {
                        sortSearchOption.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleFilter(option)}
                                className={`flex justify-center gap-[3px]`}
                            >
                                <span
                                    className={`flex items-center font-normal transition ease-in-out delay-200 opacity-[0.8] hover:opacity-[1] ${searchOption === option ? 'opacity-[2]' : 'opacity-[0.8]'}`}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </span>
                                <Image
                                    className="flex h-full"
                                    src={selectedOption === option ? arrowUp : arrowDown}
                                    width={6}
                                    height={6}
                                    alt="arrow icon"
                                />
                            </li>
                        ))
                    }
                </ul>

                <ul className="flex flex-wrap items-center gap-3 text-xs">
                    <li className="flex item-center gap-1" onClick={toggleTagsVisibility}>
                        <span className="font-extrabold">Tags</span>
                        <Image
                            src={tagsVisible ? polygonUp : polygonDown}
                            width={10}
                            height={10}
                            alt="arrow icon"
                            className="transition ease-in-out delay-200"
                        />
                    </li>
                    <li
                        onClick={() => handleReset()}
                        className='opacity-[0.8] hover:opacity-[1]'
                    >reset rules</li>
                </ul>
            </Container>
            {tagsVisible && (
                <ul className="transition ease-in-out delay-200 w-full rounded-2xl text-[var(--text-color)] bg-[var(--secondary-bg)] flex flex-wrap gap-3 p-5 text-black">
                    {sortTags.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSearchOption(option)}
                            className={`flex justify-center item-center cursor-pointer px-2 py-1 rounded-3xl text-xs transition ease-in-out delay-200 ${searchOption === option ? 'border-2 border-gray-200 bg-[var(--secondary-bg)] text-[var(--text-color)]' : 'bg-gray-200'}`}
                        >
                            {option.charAt(0).toLowerCase() + option.slice(1)}
                        </li>
                    ))}
                </ul>
            )}
            <Container className="flex flex-col gap-5 p-5">
                {/* <form
                    onSubmit={handleSearch}
                >
                    <input
                        value={value}
                        placeholder='Search books...'
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    <button onClick={() => handleReset()}>Reset</button>
                </form> */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="animate-spin" size={48} />
                    </div>
                ) : books.length === 0 ? (
                    <div className='flex flex-col justify-center items-center mb-4'>
                        <Image
                            className="flex h-full"
                            src={noData}
                            width={150}
                            height={150}
                            alt="arrow icon"
                        />
                        <h3>No Books Available</h3>
                    </div>
                ) : (
                    books.map((book: Books) => (
                        <Container key={book.id} className="flex flex-col gap-4 bg-[var(--tertiary-bg)] p-4 rounded-2xl">
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
                                {book.tags.map(tag => (
                                    <span key={tag} className="flex justify-center items-center text-black text-sm bg-[var(--text-color)] px-3 py-2 rounded-3xl">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                        </Container>
                    ))
                )}

                <div>
                    <h1>
                        <span className='font-extrabold'>TOTAL</span>: 2678$
                    </h1>
                </div>
            </Container>
        </>

    );
}