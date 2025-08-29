import { useState } from "react"
import MobileMenu from "./MobileMenu"
import Header from "./Header"

export default function Head() {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white">
            <MobileMenu open={open} setOpen={setOpen} />
            <Header setOpen={setOpen} />
        </div>
    )
}