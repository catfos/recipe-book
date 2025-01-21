import { PropsWithChildren } from "react"
import Nav from "./Nav"

export default function Page(props: PropsWithChildren) {
    return (
        <>
            <header className="border-b px-4 flex justify-between items-center sticky top-0 bg-white/90">
                LOGO
                <Nav />
            </header>
            <main className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
                { props.children }
            </main>
        </>
    )
}