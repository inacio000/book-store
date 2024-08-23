import BookCards from "./components/BookCards"
import Container from "@/components/Container";
import polygon from "@/public/polygon.svg";
import arrow from "@/public/Arrow.svg"
import Image from "next/image";

export default async function page() {

    return (
        <main className="min-h-screen flex flex-col items-center p-5">
            <section className="max-w-[450px] min-w-screen md:max-w-[500px] h-full flex flex-col gap-5">
                <Container className="px-14 py-7 text-center">
                    <h1 className="text-3xl md:text-[56px] transition-all">Book Store</h1>
                </Container>
                <Container className="flex justify-between px-4 py-3">
                    <ul className="flex flex-wrap gap-3 text-xs">
                        <li className="flex justify-center gap-[3px]">
                            <span className="flex items-center font-normal">price</span>
                            <Image
                                className="flex h-full"
                                src={arrow}
                                width={6}
                                height={6}
                                alt="arrow icon"
                            />
                        </li>
                        <li className="flex justify-center gap-[2px]">
                            <span className="flex items-center font-normal">author</span>
                            <Image
                                className="flex h-full"
                                src={arrow}
                                width={6}
                                height={6}
                                alt="arrow icon"
                            />
                        </li>
                        <li className="flex justify-center gap-[2px]">
                            <span className="flex items-center font-normal">date</span>
                            <Image
                                className="flex h-full"
                                src={arrow}
                                width={6}
                                height={6}
                                alt="arrow icon"
                            />
                        </li>
                    </ul>
                    <ul className="flex flex-wrap items-center gap-3 text-xs">
                        <li className="flex item-center gap-1">
                            <span className="font-extrabold">Tags</span>
                            <Image
                                src={polygon}
                                width={10}
                                height={10}
                                alt="arrow icon"
                            />
                        </li>
                        <li>reset rules</li>
                    </ul>
                </Container>
                <BookCards />
            </section>
        </main>
    )
}