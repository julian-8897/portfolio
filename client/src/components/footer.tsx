import { Logo } from "./logo";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="w-7 h-7 text-foreground" />
            <span className="display-font text-base font-semibold">Julian Chan</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Scientific machine learning, neural operators, and the physics in between.
          </p>
        </div>

        <div className="md:justify-self-center">
          <div className="text-xs uppercase tracking-widest mono-font text-muted-foreground mb-2">
            Elsewhere
          </div>
          <ul className="space-y-1.5 text-sm">
            <li>
              <a
                href="https://github.com/julian-8897"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
                data-testid="link-footer-github"
              >
                <Github className="w-4 h-4" /> github.com/julian-8897
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/julian-chan-a86b2921b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
                data-testid="link-footer-linkedin"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:julianchan8897@gmail.com"
                className="inline-flex items-center gap-2 hover:text-primary"
                data-testid="link-footer-email"
              >
                <Mail className="w-4 h-4" /> julianchan8897@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="md:justify-self-end">
          <div className="text-xs uppercase tracking-widest mono-font text-muted-foreground mb-2">
            Last updated
          </div>
          <div className="text-sm">May 2026 · Guildford, UK</div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between text-xs text-muted-foreground mono-font">
          <span>© {new Date().getFullYear()} Julian Chan</span>
          <span>Built with React, Tailwind & ODE integration</span>
        </div>
      </div>
    </footer>
  );
}
