import Link from 'next/link'

export default function Nav() {
    return (
        <nav>
            <ul className="flex">
                <li className="mr-4">
                    <Link href="/" className="p-3 inline-block">Home</Link>
                </li>
                <li>
                    <Link href="/about" className="p-3 inline-block">About</Link>
                </li>
            </ul>
        </nav>
    )
}