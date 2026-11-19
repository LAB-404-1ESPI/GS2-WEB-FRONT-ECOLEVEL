import { useEffect, useRef, useState } from "react";
import useTravarScroll from "../hooks/useTravarScroll";
import Modal from "../components/Modal";
import GreenButton from "../components/GreenButton";
import Arrow from "../components/Arrow";

import suporteImg from "../assets/imgs/suporteusuario.png";

const FAQ = [
  {
    pergunta: "Como funciona a reciclagem?",
    resposta: "Você leva seus recicláveis até uma máquina ou ponto de coleta parceiro, registra o descarte no app e, depois que ele for validado, recebe Pontos Eco e XP.",
  },
  {
    pergunta: "Como registrar uma entrega?",
    resposta: 'Na tela Início, toque em "Registrar Descarte", informe o material e o peso em kg e confirme. O descarte fica pendente até ser validado.',
  },
  {
    pergunta: "Quando recebo meus Pontos Eco?",
    resposta: "Assim que o descarte é validado, normalmente em até 24 horas. Você acompanha tudo em Meu progresso.",
  },
  {
    pergunta: "Como resgatar recompensas?",
    resposta: "Abra a aba Recompensas, escolha um item e toque em COMPRAR. O código fica salvo no histórico de trocas.",
  },
];

const CATEGORIAS = ["Dúvida", "Problema", "Sugestão"];

const CHAMADOS_INICIAIS = [
  { id: 99, status: "Em análise", texto: "Meu descarte de 3 kg ainda não foi validado.", resposta: null },
  { id: 74, status: "Finalizado", texto: "Como altero o e-mail da minha conta?", resposta: "Você pode alterar em Configurações > Dados da conta." },
];

const CHAVE = "ecolevel_suporte";

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (Array.isArray(salvo)) return salvo;
  } catch (e) {}
  return CHAMADOS_INICIAIS;
}

function Suporte() {
  const [chamados, setChamados] = useState(carregar);
  const [categoria, setCategoria] = useState("Dúvida");
  const [texto, setTexto] = useState("");
  const [anexos, setAnexos] = useState([]);
  const [aviso, setAviso] = useState("");
  const [aberto, setAberto] = useState(null); // { titulo, texto }
  const inputRef = useRef(null);

  // número do próximo chamado (começa em #103)
  const proximo = Math.max(102, ...chamados.map((c) => c.id)) + 1;

  // trava o scroll da página (igual às outras telas)
  useTravarScroll();

  // salva os chamados
  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(chamados));
  }, [chamados]);

  // some com o aviso depois de 2,5 segundos
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(""), 2500);
    return () => clearTimeout(t);
  }, [aviso]);

  function escolherArquivos(e) {
    const nomes = Array.from(e.target.files).map((f) => f.name);
    setAnexos(nomes.slice(0, 3));
    e.target.value = "";
  }

  function enviar() {
    if (texto.trim().length < 5) {
      setAviso("Descreva sua solicitação (mínimo 5 letras).");
      return;
    }

    const novo = {
      id: proximo,
      status: "Em análise",
      texto: `[${categoria}] ${texto.trim()}`,
      resposta: null,
    };

    setChamados([novo, ...chamados]);
    setTexto("");
    setAnexos([]);
    setAviso(`Chamado #${novo.id} enviado!`);
  }

  function abrirChamado(c) {
    setAberto({
      titulo: `Solicitação #${c.id} · ${c.status}`,
      texto: `${c.texto}\n\nResposta: ${c.resposta || "Nossa equipe está analisando seu chamado."}`,
    });
  }

  return (
    <section className="mx-auto w-full max-w-md px-3.5 pb-2 text-[#1d3a27]">
      <h1 className="-mt-1 flex items-center gap-2 text-2xl font-bold">
        <img src={suporteImg} alt="" className="h-9 w-9 object-contain" />
        Suporte
      </h1>

      <p className="mt-2 text-base font-bold">Como podemos te ajudar?</p>

      <h2 className="mb-1.5 mt-3 text-sm font-bold">FAQ</h2>

      <div className="flex flex-col gap-1.5">
        {FAQ.map((item) => (
          <button
            key={item.pergunta}
            type="button"
            onClick={() => setAberto({ titulo: item.pergunta, texto: item.resposta })}
            className="flex items-center justify-between rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] px-3.5 py-2 text-left text-xs font-semibold"
          >
            {item.pergunta}
            <Arrow variant="text" className="text-base" />
          </button>
        ))}
      </div>


      <h2 className="mb-1.5 mt-3 text-sm font-bold">Fale conosco</h2>

      <div className="rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-bold">Solicitação #{proximo}</span>

          <div className="flex gap-1">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategoria(c)}
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                  categoria === c
                    ? "border-[#1f6b34] bg-[#3fe45a]"
                    : "border-[#6fae7e] bg-white/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={300}
          placeholder="Descreva sua solicitação aqui..."
          className="h-[72px] w-full resize-none rounded-xl border border-[#6fae7e] bg-white px-3 py-2 text-xs outline-none focus:border-[#1f6b34]"
        />

        <div className="mt-2 flex gap-2">
          <input ref={inputRef} type="file" multiple hidden onChange={escolherArquivos} />

          <button
            type="button"
            onClick={() => inputRef.current.click()}
            className="flex-1 rounded-full border-[1.5px] border-[#1f6b34] bg-white py-1.5 text-xs font-bold"
          >
            {anexos.length > 0 ? `${anexos.length} anexo(s)` : "Anexar arquivos"}
          </button>

          <button
            type="button"
            onClick={enviar}
            className="flex-1 rounded-full border-[1.5px] border-[#1f6b34] bg-[#3fe45a] py-1.5 text-xs font-bold"
          >
            Enviar chamado
          </button>
        </div>

        {aviso && <p className="mt-2 text-center text-xs font-semibold text-[#1f6b34]">{aviso}</p>}
      </div>

  
      <h2 className="mb-1.5 mt-3 text-sm font-bold">Meus chamados</h2>

      <div className="flex flex-col gap-1.5">
        {chamados.slice(0, 2).map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => abrirChamado(c)}
            className="flex items-center justify-between rounded-full border border-[#6fae7e] bg-[#e1f1e3] px-4 py-1.5"
          >
            <span className="text-xs italic text-[#4d6a58]">Solicitação #{c.id}</span>
            <span className="text-xs font-bold text-[#1f6b34]">{c.status}</span>
          </button>
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

export default Suporte;
