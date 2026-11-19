import { NavLink } from "react-router-dom";

import inicioImg from "../assets/imgs/inicio.png";
import inicio2Img from "../assets/imgs/inicio2.png";
import rankingImg from "../assets/imgs/ranking.png";
import ranking2Img from "../assets/imgs/ranking2.png";
import recompensasImg from "../assets/imgs/recompensas.png";
import recompensas2Img from "../assets/imgs/recompensas2.png";
import configuracoesImg from "../assets/imgs/configuracoes.png";
import configuracoes2Img from "../assets/imgs/configuracoes2.png";
import missoesImg from "../assets/imgs/missoes.png";
import missoes2Img from "../assets/imgs/missoes2.png";

function BottomNav() {
    const links = [
        { name: "Início", path: "/", icons: { normal: inicioImg, active: inicio2Img } },
        { name: "Ranking", path: "/ranking", icons: { normal: rankingImg, active: ranking2Img } },
        { name: "Recompensas", path: "/recompensas", icons: { normal: recompensasImg, active: recompensas2Img } },
        { name: "Configurações", path: "/configuracoes", icons: { normal: configuracoesImg, active: configuracoes2Img } },
        { name: "Missões", path: "/missoes", icons: { normal: missoesImg, active: missoes2Img } },
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
                                    src={isActive ? link.icons.active : link.icons.normal}
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