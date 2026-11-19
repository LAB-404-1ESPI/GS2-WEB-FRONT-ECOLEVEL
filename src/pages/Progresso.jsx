import { useEffect, useState } from "react";
import useTravarScroll from "../hooks/useTravarScroll";
import useProgresso from "../hooks/useProgresso";
import usePontos from "../hooks/usePontos";
import IconCircle from "../components/IconCircle";
import ProgressBar from "../components/ProgressBar";
import Modal from "../components/Modal";
import GreenButton from "../components/GreenButton";

import progressoImg from "../assets/imgs/progressousuario.png";
import folhaImg from "../assets/imgs/folha.png";
import descarteImg from "../assets/imgs/registrardescarte.png";
import sacoImg from "../assets/imgs/saco.png";
import checkImg from "../assets/imgs/check.png";
import medalha1Img from "../assets/imgs/medalha1.png";
import medalha2Img from "../assets/imgs/medalha2.png";
import medalha3Img from "../assets/imgs/medalha3.png";


const LEVEL = 12;
const XP_GOAL = 5000;

const fmt = (n) =>
  n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

function Img({ src }) {
  return <img src={src} alt="" className="h-full w-full object-contain" />;
}


const ACHIEVEMENTS = [
  { id: "inteligente", name: "Reciclador Inteligente", xp: 100, img: medalha1Img, unlocked: (d) => d.descartes >= 25 },
  { id: "bemvindo", name: "Bem-vindo ao Eco Level", xp: 30, img: medalha2Img, unlocked: () => true },
  { id: "primeira", name: "Primeira Reciclagem", xp: 50, img: medalha3Img, unlocked: (d) => d.descartes >= 1 },
  { id: "meiosseculo", name: "Meio Século de Descartes", xp: 150, img: medalha1Img, unlocked: (d) => d.descartes >= 50 },
  { id: "pesopesado", name: "Peso Pesado", xp: 200, img: sacoImg, unlocked: (d) => d.kgDescartados >= 100 },
  { id: "validador", name: "Validador Confiável", xp: 120, img: checkImg, unlocked: (d) => d.kgValidados >= 50 },
];

function StatCard({ icon, value, label, iconSize = "h-8 w-8" }) {
  return (
    <div className="flex h-[118px] flex-col items-center justify-center rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-2 shadow-md">
      <IconCircle size="h-12 w-12" iconSize={iconSize}>
        {icon}
      </IconCircle>
      <strong className="mt-1 text-2xl font-extrabold leading-tight">{value}</strong>
      <span className="text-sm leading-tight text-[#3d5a47]">{label}</span>
    </div>
  );
}

function AchievementItem({ achievement, dados }) {
  const { name, xp, img, unlocked } = achievement;
  const ok = unlocked(dados);

  return (
    <div
      className={`flex flex-col items-center text-center ${ok ? "" : "opacity-40 grayscale"}`}
      title={ok ? "Conquista desbloqueada" : "Conquista bloqueada"}
    >
      <IconCircle size="h-16 w-16" iconSize="h-12 w-12">
        <Img src={img} />
      </IconCircle>
      <span className="mt-1 text-[10px] leading-tight">{name}</span>
      <span className="text-[9px] font-bold text-[#1f6b34]">{xp}XP</span>
    </div>
  );
}

function Progresso() {
  const { dados } = useProgresso();
  const { pontos } = usePontos();
  const [showModal, setShowModal] = useState(false);

  useTravarScroll();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowModal(false);

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const xpPercent = Math.min(100, Math.round((dados.xp / XP_GOAL) * 100));
  const xpFalta = Math.max(0, XP_GOAL - dados.xp);
  const visiveis = ACHIEVEMENTS.slice(0, 3);

  return (
    <section className="mx-auto w-full max-w-md px-3.5 pb-2 pt-2 text-[#1d3a27]" aria-labelledby="pg-title">
      <h1 id="pg-title" className="flex items-center gap-2 text-2xl font-bold">
        <img src={progressoImg} alt="" className="h-9 w-9 object-contain" />
        Meu progresso
      </h1>


      <div className="mt-3 rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-3 shadow-md">
        <h2 className="text-2xl font-bold leading-tight">Nível {LEVEL}</h2>

        <ProgressBar
          percent={xpPercent}
          className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-[#9ad3a8]"
          fillClassName="h-full rounded-full bg-[#1f9d3f]"
          role="progressbar"
          valueNow={dados.xp}
          valueMin={0}
          valueMax={XP_GOAL}
          label="Progresso de XP"
        />

        <p className="mt-1.5 text-xs">
          {fmt(dados.xp)} / {fmt(XP_GOAL)} XP
        </p>
        <p className="mt-0.5 text-[11px] font-bold text-[#1f6b34]">
          {xpFalta > 0 ? `Mais ${fmt(xpFalta)} XP para subir de nível` : "Pronto para subir de nível!"}
        </p>
      </div>


      <h2 className="mb-2 mt-4 text-lg font-bold">Visão Geral</h2>

      <div className="grid grid-cols-2 gap-3 px-2">
        <StatCard
          icon={<Img src={folhaImg} />}
          value={fmt(pontos)}
          label="Pontos Eco"
        />
        <StatCard
          icon={<Img src={descarteImg} />}
          value={fmt(dados.descartes)}
          label="Descartes"
        />
        <StatCard icon={<Img src={sacoImg} />} iconSize="h-11 w-11" value={`${fmt(dados.kgDescartados)}kg`} label="Descartados" />
        <StatCard icon={<Img src={checkImg} />} iconSize="h-10 w-10" value={`${fmt(dados.kgValidados)}kg`} label="Validados" />
      </div>


      <div className="mb-2 mt-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Conquistas</h2>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="text-[11px] font-bold text-[#1f6b34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1f6b34]"
        >
          Ver todos
        </button>
      </div>

      <div className="grid grid-cols-3 gap-x-2 gap-y-3 rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-3 shadow-md">
        {visiveis.map((a) => (
          <AchievementItem key={a.id} achievement={a} dados={dados} />
        ))}
      </div>


      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          ariaLabelledBy="pg-all-title"
          contentClassName="max-h-[80vh] w-full max-w-md overflow-auto rounded-3xl bg-white px-4 pb-5 pt-5 shadow-2xl"
        >
            <h2 id="pg-all-title" className="mb-3 text-lg font-bold">
              Todas as conquistas
            </h2>

            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
              {ACHIEVEMENTS.map((a) => (
                <AchievementItem key={a.id} achievement={a} dados={dados} />
              ))}
            </div>

            <GreenButton onClick={() => setShowModal(false)} className="mt-5 w-full rounded-full border-[1.5px] border-[#1f6b34] bg-[#3fe45a] py-2.5 text-sm font-semibold">
              Fechar
            </GreenButton>
        </Modal>
      )}
    </section>
  );
}

export default Progresso;
