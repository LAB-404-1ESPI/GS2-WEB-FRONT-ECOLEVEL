import { useNavigate } from "react-router-dom";
import usePontos from "../hooks/usePontos";
import IconCircle from "../components/IconCircle";
import ProgressBar from "../components/ProgressBar";


import globoImg from "../assets/imgs/globo.png";
import folhaImg from "../assets/imgs/folha.png";
import estrelaImg from "../assets/imgs/estrela.png";
import registrarDescarteImg from "../assets/imgs/registrardescarte.png";
import mapaImg from "../assets/imgs/mapa.png";
import missoesImg from "../assets/imgs/missoesacaorapida.png";
import recompensasImg from "../assets/imgs/recompensasacaorapida.png";
import circuloImg from "../assets/imgs/circulo.png";
import garrafaPetImg from "../assets/imgs/garrafapet.png";

function Inicio() {
    const { pontos: pontosEco } = usePontos();
    const navigate = useNavigate();

    return (
        <section className="mx-auto flex w-full min-w-0 max-w-md flex-col gap-2.5 overflow-x-hidden text-[#1d3a27]">


            <div className="mt-3 flex w-full min-w-0 items-center justify-between gap-2">
                <div className="min-w-0 flex-1 pl-3 sm:pl-4">
                    <h1 className="text-[clamp(20px,6vw,26px)] font-extrabold leading-tight text-[#1d3a27]">
                        Olá, Usuário!
                    </h1>

                    <p className="mt-0.5 max-w-[210px] text-sm leading-tight text-[#1d3a27]">
                        Vamos continuar fazendo a diferença hoje?
                    </p>
                </div>

                <div className="w-[38%] max-w-[150px] shrink-0">
                    <img
                        src={globoImg}
                        alt=""
                        className="h-auto w-full object-contain"
                    />
                </div>
            </div>


            <div className="grid min-h-[100px] w-full min-w-0 grid-cols-2 rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-2 shadow-md sm:min-h-[116px] sm:p-4">
                <div className="flex min-w-0 items-center justify-center gap-1.5 border-r border-[#1d3a27]/60 pr-1 sm:gap-2 sm:pr-2">
                    <IconCircle
                        src={folhaImg}
                        size="relative h-10 w-10 shrink-0 sm:h-16 sm:w-16"
                        iconSize="absolute inset-0 m-auto h-6 w-6 object-contain sm:h-9 sm:w-9"
                    />

                    <div className="min-w-0 text-center leading-none">
                        <h2 className="text-[clamp(19px,5vw,32px)] font-extrabold text-[#1d3a27]">
                            {pontosEco.toLocaleString("pt-BR")}
                        </h2>

                        <p className="mt-1 text-[11px] text-[#3d5a47] sm:text-[15px]">
                            Pontos Eco
                        </p>
                    </div>
                </div>

                <div className="flex min-w-0 items-center justify-center gap-1.5 pl-1 sm:gap-2 sm:pl-2">
                    <IconCircle
                        src={estrelaImg}
                        size="relative h-10 w-10 shrink-0 sm:h-16 sm:w-16"
                        iconSize="absolute inset-0 m-auto h-6 w-6 object-contain sm:h-9 sm:w-9"
                    />

                    <div className="min-w-0 text-center leading-none">
                        <h2 className="text-[clamp(19px,5vw,32px)] font-extrabold text-[#1d3a27]">
                            12
                        </h2>

                        <p className="mt-1 text-[11px] text-[#3d5a47] sm:text-[15px]">
                            Seu nível
                        </p>
                    </div>
                </div>
            </div>


            <div className="w-full min-w-0 space-y-2">
                <h2 className="pl-4 text-xl font-bold text-[#1d3a27]">
                    Ações Rápidas
                </h2>

                <div className="grid w-full min-w-0 grid-cols-4 gap-2 sm:gap-2.5">
                    <article
                        className="flex aspect-square min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-1 text-center shadow-md"
                        onClick={() => navigate("/registrardescarte")}
                    >
                        <img
                            src={registrarDescarteImg}
                            alt="Registrar descarte"
                            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                        />
                        <h3 className="mt-1 flex w-full items-center justify-center break-words text-[8px] font-bold leading-tight text-[#1d3a27] sm:text-[9px]">
                            Registrar Descarte
                        </h3>
                    </article>

                    <article
                        className="flex aspect-square min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-1 text-center shadow-md"
                        onClick={() => navigate("/mapa")}
                    >
                        <img
                            src={mapaImg}
                            alt="Mapa"
                            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                        />
                        <h3 className="mt-1 flex w-full items-center justify-center text-[8px] font-bold leading-tight text-[#1d3a27] sm:text-[9px]">
                            Mapa
                        </h3>
                    </article>

                    <article
                        className="flex aspect-square min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-1 text-center shadow-md"
                        onClick={() => navigate("/missoes")}
                    >
                        <img
                            src={missoesImg}
                            alt="Missões"
                            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                        />
                        <h3 className="mt-1 flex w-full items-center justify-center text-[8px] font-bold leading-tight text-[#1d3a27] sm:text-[9px]">
                            Missões
                        </h3>
                    </article>

                    <article
                        className="flex aspect-square min-w-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-1 text-center shadow-md"
                        onClick={() => navigate("/recompensas")}
                    >
                        <img
                            src={recompensasImg}
                            alt="Recompensas"
                            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                        />
                        <h3 className="mt-1 flex w-full items-center justify-center break-words text-[8px] font-bold leading-tight text-[#1d3a27] sm:text-[9px]">
                            Recompensas
                        </h3>
                    </article>
                </div>
            </div>


            <article
                className="flex min-w-0 cursor-pointer items-center justify-between gap-2 rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-3 shadow-md"
                onClick={() => { window.location.href = "/missoes"; }}
            >
                <div className="min-w-0 flex-1">
                    <span className="inline-flex rounded-full border border-[#2f7a45] bg-[#8fd69c] px-2 py-0.5 text-[10px] font-semibold text-[#1d3a27]">
                        Missão em andamento
                    </span>

                    <p className="mt-1.5 text-sm font-bold leading-tight text-[#1d3a27]">
                        Realize entregas em cinco máquinas diferentes.
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#3d5a47]">
                        2 / 5
                    </p>

                    <ProgressBar
                        percent={40}
                        className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-[#9ad3a8]"
                        fillClassName="h-full rounded-full bg-[#1f9d3f]"
                        role="progressbar"
                        valueNow={2}
                        valueMin={0}
                        valueMax={5}
                        label="Progresso da missão"
                    />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                        <img
                            src={circuloImg}
                            alt=""
                            className="absolute inset-0 h-full w-full object-contain"
                        />

                        <img
                            src={garrafaPetImg}
                            alt=""
                            className="absolute inset-0 m-auto h-10 w-10 object-contain sm:h-14 sm:w-14"
                        />
                    </div>

                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 fill-none stroke-[#1d3a27] stroke-[2.5]"
                    >
                        <path
                            d="m9 5 7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </article>


            <article
                className="flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] px-3 py-2.5 shadow-md"
                onClick={() => { window.location.href = "/mapa"; }}
            >
                <img
                    src={mapaImg}
                    alt=""
                    className="h-9 w-9 shrink-0 object-contain"
                />

                <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium leading-tight text-[#1d3a27]">
                        Encontre máquinas de reciclagem perto de você!
                    </p>
                </div>

                <span className="shrink-0 text-sm font-bold text-[#1f6b34]">
                    Ver mapa
                </span>
            </article>

        </section>
    );
}

export default Inicio;