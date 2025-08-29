import { Github, InfoIcon, Linkedin } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Zecky Julian Himawan, All rights reserved.
            </p>
            <div className="p-2 flex rounded-full bg-muted gap-4">
                <a href="https://github.com/zeckyjulian" target="_blank">
                    <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/zecky-julian-himawan" target="_blank">
                    <Linkedin size={20} />
                </a>
                <a href="https://zecky-julian-site.vercel.app" target="_blank">
                    <InfoIcon size={20} />
                </a>
            </div>
        </footer>
    )
}