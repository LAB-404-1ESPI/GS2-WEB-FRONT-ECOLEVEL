import { NavLink } from "react-router-dom";

function BottomNav() {
    const links = [
        { name: "Início", path: "/", icon: "inicio" },
        { name: "Ranking", path: "/ranking", icon: "ranking" },
        { name: "Recompensas", path: "/recompensas", icon: "recompensas" },
        { name: "Configurações", path: "/configuracoes", icon: "configuracoes" },
        { name: "Missões", path: "/missoes", icon: "missoes" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 mx-3 mb-3 rounded-2xl bg-white shadow-lg border border-gray-200 z-50 overflow-hidden">

            <div className="grid grid-cols-5 items-stretch">

                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end={link.path === "/"}
                        className={({ isActive }) =>
                            `relative flex flex-col items-center justify-center h-[68px] min-w-0 px-1 gap-1 transition ${
                                isActive ? "text-green-600" : "text-gray-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <img
                                    src={
                                        isActive
                                            ? `./src/assets/imgs/${link.icon}2.png`
                                            : `./src/assets/imgs/${link.icon}.png`
                                    }
                                    alt={link.name}
                                    className="w-6 h-6 object-contain shrink-0"
                                />

                                <span className="text-[10px] font-medium text-center leading-none whitespace-nowrap">
                                    {link.name}
                                </span>
                                {isActive && (
                                    <span className="absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-green-600" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}

            </div>
        </nav>
    );
}

export default BottomNav;
