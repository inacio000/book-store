import Container from "@/components/Container";
import Card from "./components/Card";

export default async function page() {

    return (
        <main className="min-h-screen flex flex-col items-center p-5">
            <section className="max-w-[450px] min-w-screen md:max-w-[500px] h-full flex flex-col gap-5">
                <Container className="px-14 py-7 text-center">
                    <h1 className="text-3xl md:text-[56px] transition-all">Book Store</h1>
                </Container>
                <Card />
            </section>
        </main>
    )
}