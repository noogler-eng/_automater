"use client";

import Link from "next/link";
import { Home, Info, Briefcase, Mail, Phone, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();

  return (
    <motion.div
      className="w-full bg-black"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.footer
        className="w-full bg-zinc-900 text-white shadow-lg border-t border-zinc-700 p-10 rounded-t-full flex flex-col items-center mt-12"
        animate={{
          boxShadow: [
            "-2px 2px 4px #FF4500",
            "-2px 2px 4px #FF6347",
            "2px 2px 8px #FF7F50",
            "2px 2px 8px #FFA07A",
            "2px 2px 8px #FF4500",
            "-2px 2px 4px #FF4500",
            "-2px 2px 4px #FF6347",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <h2 className="text-2xl font-bold mb-4">_Automator</h2>
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { href: "/", label: "Home", icon: Home },
            { href: "/about", label: "About", icon: Info },
            { href: "/services", label: "Services", icon: Briefcase },
            { href: "/contact", label: "Contact", icon: Mail },
            { href: "/team", label: "Team", icon: Users },
            { href: "/support", label: "Support", icon: Phone },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center transition-all ${
                pathname === href
                  ? "text-orange-400 scale-110"
                  : "hover:text-orange-300"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm">{label}</span>
            </Link>
          ))}
        </motion.div>
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </motion.footer>
    </motion.div>
  );
}
