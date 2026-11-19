import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePontos from "../hooks/usePontos";
import IconCircle from "../components/IconCircle";
import Avatar from "../components/Avatar";
import Arrow from "../components/Arrow";
import MenuRow from "../components/MenuRow";
import ProgressBar from "../components/ProgressBar";
import Modal from "../components/Modal";
import GreenButton from "../components/GreenButton";

import usuarioImg from "../assets/imgs/usuario.png";
import folhaImg from "../assets/imgs/folha.png";
import guardiaoImg from "../assets/imgs/super-recicla.png";
import progressoImg from "../assets/imgs/progressousuario.png";
import recompensasImg from "../assets/imgs/recompensasusuario.png";
import missoesImg from "../assets/imgs/missoesusuario.png";
import configuracoesImg from "../assets/imgs/configuracoesusuario.png";
import personalizacaoImg from "../assets/imgs/personalizacaousuario.png";
import suporteImg from "../assets/imgs/suporteusuario.png";
import sairImg from "../assets/imgs/sairusuario.png";

const USUARIO = {
  nome: "Administrador ECO",
  nivel: 12,
  titulo: "Eco Guardião",
  xp: 2350,
  xpMeta: 5000,
  id: "EC 0001",
};

const MENU = [
  { titulo: "Meu progresso", desc: "Veja seu progresso no Eco Level", img: progressoImg, to: "/progresso" },
  { titulo: "Minhas recompensas", desc: "Confira suas recompensas resgatadas", img: recompensasImg, to: "/recompensas" },
  { titulo: "Minhas missões", desc: "Acompanhe suas missões ativas", img: missoesImg, to: "/missoes" },
  { titulo: "Configurações", desc: "Personalize sua experiência", img: configuracoesImg, to: "/configuracoes" },
  { titulo: "Personalização", desc: "Personalize seu avatar e desbloqueie itens", img: personalizacaoImg, to: "/personalizacao" },
  { titulo: "Suporte", desc: "Tire suas dúvidas e fale conosco", img: suporteImg, to: "/suporte" },
  { titulo: "Sair da conta", desc: "Encerre sua sessão", img: sairImg, sair: true },
];

const formatar = (n) => n.toLocaleString("pt-BR");

function Usuario({ setUsuarioLogado }) {
  const navigate = useNavigate();

  const { dadosPontos: dados, atualizarPontos } = usePontos();
  const [historicoAberto, setHistoricoAberto] = useState(false);

  const porcentagem = Math.min(100, Math.round((USUARIO.xp / USUARIO.xpMeta) * 100));


  useEffect(() => {
    const fecharComEsc = (e) => e.key === "Escape" && setHistoricoAberto(false);

    window.addEventListener("keydown", fecharComEsc);
    return () => window.removeEventListener("keydown", fecharComEsc);
  }, []);

  function abrirHistorico() {
    atualizarPontos();
    setHistoricoAberto(true);
  }

  function sair() {
    localStorage.removeItem("usuarioLogado");
    setUsuarioLogado(false);
    navigate("/login", { replace: true });
  }

  const linha =
    "flex w-full items-center gap-3 rounded-full border border-[#6fae7e] bg-[#e1f1e3] py-1 pl-2.5 pr-4 text-left transition-colors hover:bg-[#d3ebd7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b34]";

  return (
    <section className="mx-auto w-full max-w-md px-3.5 pb-2 pt-1 text-[#1d3a27]">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <img src={usuarioImg} alt="" className="h-8 w-8 object-contain" />
        Área do Usuário
      </h1>

      <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] p-2.5">
        <Avatar
          src={guardiaoImg}
          alt={`Avatar de ${USUARIO.nome}`}
          className="h-16 w-16 border border-[#2f7a45] bg-white object-cover"
        />

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[22px] font-bold leading-tight">{USUARIO.nome}</h2>

          <p className="text-sm leading-tight">
            Nível {USUARIO.nivel} • <span className="font-bold text-[#1f6b34]">{USUARIO.titulo}</span>
          </p>

          <ProgressBar percent={porcentagem} className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#9ad3a8]" fillClassName="h-full rounded-full bg-[#1f9d3f]" />

          <p className="mt-1 text-[10px]">
            {formatar(USUARIO.xp)} / {formatar(USUARIO.xpMeta)} XP
          </p>

          <p className="text-[9px] text-[#4d6a58]">ID do usuário: {USUARIO.id}</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] px-4 py-2">
        <IconCircle src={folhaImg} size="h-12 w-12" iconSize="relative object-contain h-7 w-7" />

        <div className="ml-4 flex-1 leading-none">
          <strong className="block text-2xl font-bold">{formatar(dados.points)}</strong>
          <span className="text-sm">Pontos Eco</span>
        </div>

        <span className="mr-3 h-12 w-px bg-[#1d3a27]/60" />

        <button
          type="button"
          onClick={abrirHistorico}
          className="rounded-full bg-[#9ad3a8] px-4 py-2 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b34]"
        >
          Ver histórico
        </button>
      </div>

      <div className="mt-2.5 flex flex-col gap-1.5">
        {MENU.map((item) => {
          const conteudo = (
            <>
              <IconCircle src={item.img} size="h-10 w-10" iconSize="relative object-contain h-7 w-7" />

              <span className="flex-1 leading-tight">
                <strong className="block text-sm font-bold">{item.titulo}</strong>
                <span className="text-[10px] text-[#4d6a58]">{item.desc}</span>
              </span>

              <Arrow />
            </>
          );

          return item.sair ? (
            <MenuRow key={item.titulo} onClick={sair} className={linha}>
              {conteudo}
            </MenuRow>
          ) : (
            <MenuRow key={item.titulo} to={item.to} className={linha}>
              {conteudo}
            </MenuRow>
          );
        })}
      </div>

      {historicoAberto && (
        <Modal
          onClose={() => setHistoricoAberto(false)}
          contentClassName="max-h-[80vh] w-full max-w-md overflow-auto rounded-3xl bg-white px-4 pb-6 pt-5 shadow-2xl"
        >
            <h2 className="mb-1.5 text-lg font-bold">Histórico de trocas</h2>

            <ul className="mb-3.5">
              {dados.history.length === 0 && (
                <li className="py-2.5 text-sm">Você ainda não fez nenhuma troca.</li>
              )}

              {[...dados.history].reverse().map((troca, i) => (
                <li
                  key={`${troca.date}-${i}`}
                  className="flex justify-between gap-2 border-b border-[#e3eee6] py-2.5 text-sm"
                >
                  <div>
                    {troca.name}
                    <small className="block text-[11px] text-[#5c7565]">
                      {new Date(troca.date).toLocaleDateString("pt-BR")}
                      {troca.code ? ` · Código: ${troca.code}` : ""}
                    </small>
                  </div>

                  <span className="whitespace-nowrap font-semibold text-[#b3261e]">
                    -{formatar(troca.cost)} PE
                  </span>
                </li>
              ))}
            </ul>

            <GreenButton onClick={() => setHistoricoAberto(false)}>
              Fechar
            </GreenButton>
        </Modal>
      )}
    </section>
  );
}

export default Usuario; 
