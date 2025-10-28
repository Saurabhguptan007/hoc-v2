import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-24 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">HOC Cell</h3>
            <p className="text-muted-foreground text-sm">
              Connecting students with higher education and scholarship opportunities worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-muted-foreground hover:text-primary transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-muted-foreground hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@hoccell.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Education St, NY 10001</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 HOC Cell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
