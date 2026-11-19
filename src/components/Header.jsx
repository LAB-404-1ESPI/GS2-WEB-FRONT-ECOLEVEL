import { Link } from "react-router-dom";

import usuarioImg from "../assets/imgs/usuario.png";
import logoImg from "../assets/imgs/logo.png";

function Header() {
    return (
        <header className="sticky top-0 z-50 w-full shrink-0 border-b border-gray-300 bg-[#E2F0DA] shadow-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
                <Link to="/usuario" className="ml-2 mt-2 w-12 shrink-0">
                    <img
                        src={usuarioImg}
                        alt="usuario"
                        className="h-auto w-full"
                    />
                </Link>

                <img
                    src={logoImg}
                    alt="logo"
                    className="mr-2 mt-2 h-auto w-28 max-w-[45%] object-contain"
                />
            </div>
        </header>
    );
}

export default Header;