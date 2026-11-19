import { useState } from "react";
import useTravarScroll from "../hooks/useTravarScroll";
import IconCircle from "../components/IconCircle";
import ProgressBar from "../components/ProgressBar";
import Modal from "../components/Modal";
import GreenButton from "../components/GreenButton";

import missoesIconeImg from "../assets/imgs/missoesusuario.png";
import garrafaImg from "../assets/imgs/garrafapet.png";
import sacoImg from "../assets/imgs/sacoreciclavel.png"; 
import caixaImg from "../assets/imgs/caixa.png"; 

const EM_ANDAMENTO = {
  titulo: "Conhecendo a cidade",
  desc: "Realize entregas em cinco máquinas diferentes.",
  atual: 2,
  total: 5,
  xp: 100,
  img: garrafaImg,
};

const CONCLUIDAS = [
  {
    id: 1,
    titulo: "Conexão sustentável",
    desc: "Utilize o QR Code de uma máquina para iniciar uma sessão de reciclagem.",
    xp: 30,
    img: garrafaImg,
  },
  {
    id: 2,
    titulo: "Compromisso Verde",
    desc: "Complete 10 entregas válidas durante o mês.",
    xp: 150,
    img: sacoImg,
  },
  {
    id: 3,
    titulo: "Peso da Sustentabilidade",
    desc: "Acumule 5 kg de materiais recicláveis aprovados nas máquinas.",
    xp: 200,
    img: caixaImg,
  },
];

// Card usado nas duas listas
function CardMissao({ selo, titulo, desc, img, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-2xl border border-[#5d8a68] bg-[#E2F0DA] p-3 text-left shadow-md"
    >
      <span className="min-w-0 flex-1">
        <span className="inline-flex rounded-full border border-[#2f7a45] bg-[#8fd69c] px-2 py-0.5 text-[9px] font-semibold">
          {selo}
        </span>

        <strong className="mt-1 block text-sm font-bold leading-tight">{titulo}</strong>
        <span className="block text-[11px] leading-tight text-[#3d5a47]">{desc}</span>

        {children}
      </span>

      <IconCircle src={img} size="h-14 w-14" iconSize="absolute inset-0 m-auto h-10 w-10 object-contain" />

      <span className="text-xl">›</span>
    </button>
  );
}

function Missoes() {
  const [aberto, setAberto] = useState(null); 

  const porcentagem = Math.round((EM_ANDAMENTO.atual / EM_ANDAMENTO.total) * 100);
  useTravarScroll();

  return (
    <section className="mx-auto w-full max-w-md px-3.5 pb-2 text-[#1d3a27]">
      <h1 className="-mt-1 flex items-center gap-2 text-2xl font-bold">
        <img src={missoesIconeImg} alt="" className="h-9 w-9 object-contain" />
        Missões
      </h1>

  
      <div className="mt-3">
        <CardMissao
          selo="Missão em andamento"
          titulo={EM_ANDAMENTO.titulo}
          desc={EM_ANDAMENTO.desc}
          img={EM_ANDAMENTO.img}
          onClick={() =>
            setAberto({
              titulo: EM_ANDAMENTO.titulo,
              texto: `${EM_ANDAMENTO.desc}\n\nProgresso: ${EM_ANDAMENTO.atual} / ${EM_ANDAMENTO.total}\nRecompensa: ${EM_ANDAMENTO.xp} XP`,
            })
          }
        >
          <span className="mt-1 block text-[11px]">
            {EM_ANDAMENTO.atual} / {EM_ANDAMENTO.total}
          </span>

          <ProgressBar
            percent={porcentagem}
            className="mt-0.5 block h-2.5 w-full overflow-hidden rounded-full bg-[#9ad3a8]"
            fillClassName="block h-full rounded-full bg-[#1f9d3f]"
          />
        </CardMissao>
      </div>


      <h2 className="mb-2 mt-4 text-lg font-bold">Missões concluídas</h2>

      <div className="flex flex-col gap-2.5">
        {CONCLUIDAS.map((m) => (
          <CardMissao
            key={m.id}
            selo="Missão concluída"
            titulo={m.titulo}
            desc={m.desc}
            img={m.img}
            onClick={() =>
              setAberto({
                titulo: m.titulo,
                texto: `${m.desc}\n\nMissão concluída! Você recebeu ${m.xp} XP.`,
              })
            }
          />
        ))}
      </div>


      {aberto && (
        <Modal onClose={() => setAberto(null)}>

            <h2 className="mb-2 text-lg font-bold">{aberto.titulo}</h2>

            <p className="mb-4 whitespace-pre-line text-sm text-[#3d5a47]">{aberto.texto}</p>

            <GreenButton onClick={() => setAberto(null)}>Fechar</GreenButton>
        </Modal>
      )}
    </section>
  );
}

export default Missoes;
