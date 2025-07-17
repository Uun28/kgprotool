import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full z-10">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
      

        {/* ✅ Lower Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© {new Date().getFullYear()} KGPROTOOL Powered By MK-G From Minangkabau. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
