import { useEffect, useState } from "react";
import useTravarScroll from "../hooks/useTravarScroll";

import camisaImg from "../assets/imgs/personalizacaousuario.png";
import desconhecidoImg from "../assets/imgs/usuarioclaro.png";
import superReciclaImg from "../assets/imgs/super-recicla.png";
import tampinhasImg from "../assets/imgs/mestretampinhas.png"; // ajuste o nome se for diferente


const SKINS = [
  { id: "super", nome: "Super-Recicla", img: superReciclaImg, desbloqueada: true },
  { id: "tampinhas", nome: "Mestre das Tampinhas", img: tampinhasImg, desbloqueada: true },
  { id: "skin3", desbloqueada: false },
  { id: "skin4", desbloqueada: false },
  { id: "skin5", desbloqueada: false },
  { id: "skin6", desbloqueada: false },
];

const TITULOS = [
  { id: "guardiao", nome: "Eco Guardião", desbloqueado: true },
  { id: "novato", nome: "Novato Verde", desbloqueado: true },
  { id: "protetor", nome: "Protetor da Natureza", desbloqueado: true },
  { id: "defensor", nome: "Defensor do Planeta", desbloqueado: false },
  { id: "mestre", nome: "Mestre da Reciclagem", desbloqueado: false },
];

const CHAVE = "ecolevel_personalizacao";

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo?.skin && salvo?.titulo) return salvo;
  } catch (e) {}
  return { skin: "super", titulo: "guardiao" };
}

function Personalizacao() {
  const [escolha, setEscolha] = useState(carregar);

  // trava o scroll da página (igual às outras telas)
  useTravarScroll();

  // salva a escolha
  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(escolha));
  }, [escolha]);

  return (
    <section className="mx-auto w-full max-w-md px-3.5 pb-2 text-[#1d3a27]">
      <h1 className="-mt-1 flex items-center gap-2 text-2xl font-bold">
        <img src={camisaImg} alt="" className="h-9 w-9 object-contain" />
        Personalização
      </h1>


      <h2 className="mb-1.5 mt-4 text-lg font-bold">Skins</h2>

      <div className="grid grid-cols-3 gap-x-2 gap-y-3 rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] p-3">
        {SKINS.map((skin) => {
          const selecionada = escolha.skin === skin.id;

          return (
            <button
              key={skin.id}
              type="button"
              disabled={!skin.desbloqueada}
              onClick={() => setEscolha({ ...escolha, skin: skin.id })}
              className="flex flex-col items-center text-center disabled:cursor-not-allowed"
            >
              <img
                src={skin.desbloqueada ? skin.img : desconhecidoImg}
                alt={skin.nome || "Skin bloqueada"}
                className={`h-16 w-16 rounded-full object-cover ${
                  selecionada ? "ring-2 ring-[#1f6b34]" : ""
                }`}
              />

              <span className="mt-1 min-h-[22px] text-[9px] leading-tight text-[#4d6a58]">
                {skin.desbloqueada ? skin.nome : "???"}
              </span>

              {skin.desbloqueada && (
                <span className="text-xs font-bold text-[#1f6b34]">
                  {selecionada ? "Selecionado" : "Selecionar"}
                </span>
              )}
            </button>
          );
        })}
      </div>


      <h2 className="mb-1.5 mt-4 text-lg font-bold">Títulos</h2>

      <div className="flex flex-col gap-2">
        {TITULOS.map((titulo) => {
          const selecionado = escolha.titulo === titulo.id;
          const status = !titulo.desbloqueado
            ? "Bloqueado"
            : selecionado
            ? "Selecionado"
            : "Selecionar";

          return (
            <button
              key={titulo.id}
              type="button"
              disabled={!titulo.desbloqueado}
              onClick={() => setEscolha({ ...escolha, titulo: titulo.id })}
              className={`flex items-center justify-between rounded-2xl border px-4 py-2.5 text-left disabled:cursor-not-allowed ${
                selecionado
                  ? "border-[#1f6b34] bg-[#3fe45a]/25"
                  : "border-[#6fae7e] bg-[#e1f1e3]"
              } ${titulo.desbloqueado ? "" : "opacity-60"}`}
            >
              <span className="text-sm font-semibold">{titulo.nome}</span>
              <span className="text-xs font-bold text-[#1f6b34]">{status}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Personalizacao;
