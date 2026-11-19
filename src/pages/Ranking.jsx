
import { useState } from "react";
import useTravarScroll from "../hooks/useTravarScroll";

import trofeuImg from "../assets/imgs/missoesacaorapida.png";
import avatarImg from "../assets/imgs/usuarioclaro.png";
import Avatar from "../components/Avatar";
import coroaImg from "../assets/imgs/coroa.png";

const ABAS = [
  { chave: "geral", nome: "Geral" },
  { chave: "semana", nome: "Esta Semana" },
  { chave: "mes", nome: "Este Mês" },
];

const TITULOS = {
  Ana: "Mestre da Reciclagem",
  Bruna: "Protetor da Natureza",
  Carlos: "Defensor do Planeta",
  Pedro: "Guardião Verde",
  João: "Herói do Reciclável",
  Maria: "Amiga do Clima",
  Júlia: "Eco Aventureira",
  Matheus: "Reciclador Pro",
  Lucas: "Mestre do Compostável",
  Fernanda: "Defensora das Águas",
  Rafael: "Eco Explorador",
  Camila: "Guardiã das Florestas",
};

const RANKING = {
  geral: {
    voce: { posicao: 42, pontos: 1250 },
    lista: [
      { nome: "Ana", pontos: 11250 },
      { nome: "Bruna", pontos: 10320 },
      { nome: "Carlos", pontos: 9960 },
      { nome: "Pedro", pontos: 9570 },
      { nome: "João", pontos: 9330 },
      { nome: "Maria", pontos: 9020 },
      { nome: "Júlia", pontos: 8570 },
      { nome: "Matheus", pontos: 8235 },
    ],
  },
  semana: {
    voce: { posicao: 18, pontos: 340 },
    lista: [
      { nome: "Lucas", pontos: 1480 },
      { nome: "Camila", pontos: 1325 },
      { nome: "Ana", pontos: 1210 },
      { nome: "Fernanda", pontos: 1105 },
      { nome: "Matheus", pontos: 980 },
      { nome: "Bruna", pontos: 915 },
      { nome: "Rafael", pontos: 860 },
      { nome: "Pedro", pontos: 790 },
    ],
  },
  mes: {
    voce: { posicao: 27, pontos: 780 },
    lista: [
      { nome: "Bruna", pontos: 4120 },
      { nome: "Carlos", pontos: 3890 },
      { nome: "Júlia", pontos: 3655 },
      { nome: "Ana", pontos: 3410 },
      { nome: "João", pontos: 3180 },
      { nome: "Fernanda", pontos: 2960 },
      { nome: "Lucas", pontos: 2745 },
      { nome: "Maria", pontos: 2530 },
    ],
  },
};

const formatar = (n) => n.toLocaleString("pt-BR");

function Podio({ lugar, pessoa, altura, primeiro }) {
  return (
    <div
      className={`flex flex-col items-center ${primeiro ? "w-[31%]" : "w-[28%]"
        }`}
    >
      <div className="relative z-10 -mb-5">
        <Avatar
          src={avatarImg}
          className={primeiro ? "h-11 w-11" : "h-10 w-10"}
        />

        {primeiro && (
          <img
            src={coroaImg}
            alt="Primeiro lugar"
            className="absolute -right-3 -top-3 h-6 w-6 rotate-12"
          />
        )}
      </div>

      <div
        className={`flex w-full flex-col items-center justify-center rounded-xl border px-1 pb-2 pt-6 text-center ${altura} ${primeiro
            ? "border-[#2f7a45] bg-[#9ad3a8]"
            : "border-[#6fae7e] bg-[#e1f1e3]"
          }`}
      >
        <span className="text-2xl font-bold leading-none">{lugar}</span>

        <span className="mt-0.5 text-[13px] font-medium leading-tight">
          {pessoa.nome}
        </span>

        <span className="text-[7px] leading-tight text-[#4d6a58]">
          {TITULOS[pessoa.nome] ?? "Eco Herói"}
        </span>

        <span className="mt-1 text-[10px] font-bold text-[#1f6b34]">
          {formatar(pessoa.pontos)} Pontos
        </span>
      </div>
    </div>
  );
}

function Ranking() {
  const [aba, setAba] = useState("geral");

  useTravarScroll();

  const { voce, lista } = RANKING[aba];
  const [primeiro, segundo, terceiro, ...demais] = lista;

  return (
    <section className="mx-auto min-h-full w-full max-w-md px-3.5 pb-4 pt-3 text-[#1d3a27]">
      <h1 className="flex items-center gap-2 text-[28px] font-bold">
        <img
          src={trofeuImg}
          alt=""
          className="h-8 w-8 object-contain"
        />
        Ranking
      </h1>

      <p className="mb-3 mt-1 text-sm">
        Veja quem está fazendo a diferença
      </p>

      <div className="mb-6 flex items-center rounded-full border border-[#6fae7e] bg-[#e1f1e3] p-0.5">
        {ABAS.map((item, i) => (
          <div key={item.chave} className="flex flex-1 items-center">
            {i > 0 && (
              <span className="h-5 w-px bg-[#6fae7e]/60" />
            )}

            <button
              type="button"
              onClick={() => setAba(item.chave)}
              className={`flex-1 rounded-full py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1f6b34] ${aba === item.chave
                  ? "bg-[#3fe45a] font-bold"
                  : "font-normal"
                }`}
            >
              {item.nome}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-center gap-2">
        <Podio
          lugar={2}
          pessoa={segundo}
          altura="h-[88px]"
        />

        <Podio
          lugar={1}
          pessoa={primeiro}
          altura="h-[108px]"
          primeiro
        />

        <Podio
          lugar={3}
          pessoa={terceiro}
          altura="h-[82px]"
        />
      </div>

      <div className="mt-4 flex items-center rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] px-5 py-2.5">
        <span className="w-16 text-3xl font-bold">
          {voce.posicao}°
        </span>

        <span className="mr-3 h-8 w-px bg-[#1d3a27]/40" />

        <Avatar
          src={avatarImg}
          className="h-9 w-9"
        />

        <span className="ml-3 flex-1 text-sm">
          Você
        </span>

        <span className="text-[11px] font-bold text-[#1f6b34]">
          {formatar(voce.pontos)} Pontos Eco
        </span>
      </div>

      <ol className="mt-3 flex flex-col gap-1.5">
        {demais.map((pessoa, i) => (
          <li
            key={pessoa.nome}
            className="flex items-center rounded-full border border-[#6fae7e] bg-[#e1f1e3] px-4 py-1"
          >
            <span className="w-10 text-xl font-bold">
              {i + 4}°
            </span>

            <Avatar
              src={avatarImg}
              className="h-8 w-8"
            />

            <span className="ml-3 flex-1 text-sm">
              {pessoa.nome}
            </span>

            <span className="text-[11px] font-bold text-[#1f6b34]">
              {formatar(pessoa.pontos)} Pontos Eco
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Ranking;
