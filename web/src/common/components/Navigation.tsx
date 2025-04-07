import { useNavStore } from "@/store/useNavStore";
import Image from "next/image";
import Link from "next/link";
import FocusLock from "react-focus-lock";
import { logout } from "@/services/api/auth";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation() {
  const { isNavOpen } = useNavStore();
  const router = useRouter();

  const handleLogout = async () => {
    console.log("logout");
    try {
      await logout();
      router.push("/login");
    } catch (error) {}
  };

  return (
    <div>
      <AnimatePresence>
        {isNavOpen && (
          <FocusLock group="navigation">
            <motion.nav
              id="navigation"
              className="fixed left-0 top-0 flex h-full w-full flex-col items-center bg-primary text-secondary bg-custom-nav "
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.93, 0.11, 0.48, 1],
                delay: 0.1,
              }}
            >
              <motion.ul
                initial={{ x: "30%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "30%", opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.35 }}
                className="my-auto flex h-3/5 flex-col items-center justify-center gap-10 text-7xl lg:flex-row lg:gap-20"
              >
                <li className="">
                  <Link className="hover:scale-125 duration-75 block" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    className="hover:scale-125 duration-75"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </motion.ul>

              <Link
                href="https://github.com/NoNamedCobble"
                className="mb-4 flex gap-2 p-2 hover:scale-125 duration-75 "
              >
                <Image
                  src="images/github.svg"
                  alt="github"
                  width="40"
                  height="40"
                  unoptimized
                  className=""
                />
                <p className="flex flex-col justify-center text-sm leading-none">
                  created by
                  <span className="text-lg leading-none">nonamedcobble</span>
                </p>
              </Link>
            </motion.nav>
          </FocusLock>
        )}
      </AnimatePresence>
    </div>
  );
}
