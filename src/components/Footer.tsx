import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <span className="text-2xl font-bold text-green-600">Tram</span>
                            <span className="text-2xl font-bold text-gray-900">AI</span>
                        </Link>
                        <p className="text-gray-600 max-w-sm leading-relaxed mb-6">
                            Building the future of urban mobility with intelligent traffic management
                            and seamless multi-modal transportation solutions for modern India.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><Link href="/dashboard" className="text-gray-600 hover:text-green-600">Dashboard</Link></li>
                            <li><Link href="/map" className="text-gray-600 hover:text-green-600">Live Map</Link></li>
                            <li><Link href="/routing" className="text-gray-600 hover:text-green-600">Route Planning</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-gray-600 hover:text-green-600">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:text-green-600">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-600 hover:text-green-600">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-gray-200">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Tram AI. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <span className="text-gray-400 text-sm tracking-widest uppercase">Designed for Pune</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
