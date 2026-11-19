import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import MenuRow from "../components/MenuRow";
import Arrow from "../components/Arrow";
import Modal from "../components/Modal";
import GreenButton from "../components/GreenButton";
import Toast from "../components/Toast";

import engrenagemImg from "../assets/imgs/configuracoesusuario.png";


import contaImg from "../assets/imgs/iconeconta.png";
import senhaImg from "../assets/imgs/iconesenha.png";
import missoesImg from "../assets/imgs/iconemissoes.png";
import lembretesImg from "../assets/imgs/iconelembretes.png";
import idiomaImg from "../assets/imgs/iconeidioma.png";
import temaImg from "../assets/imgs/iconetema.png";
import versaoImg from "../assets/imgs/iconeversao.png";
import excluirImg from "../assets/imgs/iconeexcluir.png";

const CHAVE = "ecolevel_config";
const IDIOMAS = ["Português (BR)", "English (US)", "Español"];

const USUARIO = {
  nome: "Administrador ECO",
  id: "EC 0001",
  email: "ADM@ecolevel.com",
  telefone: "(11) 99999-0000",
};

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo) return salvo;
  } catch (e) {}
  return { missoes: true, lembretes: true, idioma: "Português (BR)", tema: "Claro" };
}


function aplicarTema(tema) {
  if (!document.getElementById("estilo-tema")) {
    const estilo = document.createElement("style");
    estilo.id = "estilo-tema";
    estilo.textContent = `
      .phone-preview, .app-screen { transition: filter .3s; }
      html.tema-escuro .phone-preview,
      html.tema-escuro .app-screen { filter: brightness(.58) hue-rotate(38deg); }
    `;
    document.head.appendChild(estilo);
  }
  document.documentElement.classList.toggle("tema-escuro", tema === "Escuro");
}

aplicarTema(carregar().tema);

// Botão liga/desliga
function Liga({ ligado }) {
  return (
    <span className={`relative h-7 w-12 flex-none rounded-full ${ligado ? "bg-[#3fe45a]" : "bg-[#b9c9bd]"}`}>
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-[#1d3a27] transition-all ${
          ligado ? "left-6" : "left-1"
        }`}
      />
    </span>
  );
}

function Valor({ texto }) {
  return (
    <span className="flex flex-none items-center gap-1">
      <span className="text-[10px] font-bold text-[#1f6b34]">{texto}</span>
      <Arrow variant="text" className="text-base" />
    </span>
  );
}

function Configuracoes({ setUsuarioLogado }) {
  const navigate = useNavigate();

  const [config, setConfig] = useState(carregar);
  const [modal, setModal] = useState(null); 
  const [aviso, setAviso] = useState("");
  const [senha, setSenha] = useState({ atual: "", nova: "", confirmar: "" });
  const [erro, setErro] = useState("");
  

 
  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(config));
    aplicarTema(config.tema);
  }, [config]);

  // some com o aviso depois de 2,5 segundos
  useEffect(() => {
    if (!aviso) return;
    const t = setTimeout(() => setAviso(""), 2500);
    return () => clearTimeout(t);
  }, [aviso]);

  function mudar(campo, valor, mensagem) {
    setConfig({ ...config, [campo]: valor });
    if (mensagem) setAviso(mensagem);
  }

  function abrirSenha() {
    setSenha({ atual: "", nova: "", confirmar: "" });
    setErro("");
    setModal("senha");
  }

  function salvarSenha() {
    if (!senha.atual || !senha.nova || !senha.confirmar) return setErro("Preencha todos os campos.");
    if (senha.nova.length < 6) return setErro("A nova senha precisa ter 6 ou mais caracteres.");
    if (senha.nova !== senha.confirmar) return setErro("A confirmação não confere.");

    setModal(null);
    setAviso("Simulação concluída: nenhuma senha foi modificada.");
  }

  function excluirConta() {
    ["usuarioLogado", "ecolevel_rewards", "ecolevel_progress"].forEach((k) =>
      localStorage.removeItem(k)
    );
    setUsuarioLogado(false);
    navigate("/login", { replace: true });
  }

  const campo =
    "w-full rounded-xl border border-[#6fae7e] bg-[#f4faf5] px-3 py-2 text-sm outline-none focus:border-[#1f6b34]";
  const botaoVerde =
    "w-full rounded-full border-[1.5px] border-[#1f6b34] bg-[#3fe45a] py-2.5 text-sm font-semibold";

  return (
    <section className="mx-auto w-full max-w-md px-3.5 pb-2 text-[#1d3a27]">
      <h1 className="-mt-1 flex items-center gap-2 text-2xl font-bold">
        <img src={engrenagemImg} alt="" className="h-9 w-9 object-contain" />
        Configurações
      </h1>


      <h2 className="mb-1 mt-2.5 px-1 text-sm font-semibold">Conta</h2>
      <div className="flex flex-col gap-1.5">
        <MenuRow variant="card" icon={contaImg} title="Dados da conta" description="Nome, ID, e-mail e telefone" right={<Arrow variant="text" className="text-base" />} onClick={() => setModal("conta")} />
        <MenuRow variant="card" icon={senhaImg} title="Alterar senha" description="Mantenha sua conta segura" right={<Arrow variant="text" className="text-base" />} onClick={abrirSenha} />
      </div>


      <h2 className="mb-1 mt-2.5 px-1 text-sm font-semibold">Notificações</h2>
      <div className="flex flex-col gap-1.5">
        <MenuRow
          variant="card"
          icon={missoesImg}
          title="Missões e metas"
          description="Progresso e novas missões"
          right={<Liga ligado={config.missoes} />}
          onClick={() => mudar("missoes", !config.missoes, config.missoes ? "Notificações de missões desativadas" : "Notificações de missões ativadas")}
        />
        <MenuRow
          variant="card"
          icon={lembretesImg}
          title="Lembretes de reciclagem"
          description="Um aviso por semana"
          right={<Liga ligado={config.lembretes} />}
          onClick={() => mudar("lembretes", !config.lembretes, config.lembretes ? "Lembretes desativados" : "Lembretes ativados")}
        />
      </div>


      <h2 className="mb-1 mt-2.5 px-1 text-sm font-semibold">Preferências</h2>
      <div className="flex flex-col gap-1.5">
        <MenuRow variant="card" icon={idiomaImg} title="Idioma" description="Escolha o idioma do app" right={<Valor texto={config.idioma} />} onClick={() => setModal("idioma")} />
        <MenuRow
          variant="card"
          icon={temaImg}
          title="Tema"
          description="Aparência do aplicativo"
          right={<Valor texto={config.tema} />}
          onClick={() => {
            const novo = config.tema === "Claro" ? "Escuro" : "Claro";
            mudar("tema", novo, `Tema ${novo.toLowerCase()} ativado`);
          }}
        />
      </div>


      <h2 className="mb-1 mt-2.5 px-1 text-sm font-semibold">Sobre</h2>
      <div className="flex flex-col gap-1.5">
        <MenuRow variant="card" icon={versaoImg} title="Versão do app" description="Informações do software" right={<Arrow variant="text" className="text-base" />} onClick={() => setModal("versao")} />
        <MenuRow variant="card" danger icon={excluirImg} title="Excluir a conta" description="Exclui definitivamente sua conta" right={<Arrow variant="text" className="text-base" />} onClick={() => setModal("excluir")} />
      </div>


      {modal && (
        <Modal
          onClose={() => setModal(null)}
          contentClassName={
            modal === "excluir"
              ? "w-full max-w-sm rounded-3xl bg-[#121a14] px-6 pb-6 pt-7 text-center shadow-2xl"
              : "w-full max-w-md rounded-3xl bg-white px-4 pb-5 pt-5 shadow-2xl"
          }
        >
            {modal === "conta" && (
              <>
                <h2 className="mb-3 text-lg font-bold">Dados da conta</h2>
                <div className="mb-4 rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] px-3 py-1 text-sm">
                  {[
                    ["Nome", USUARIO.nome],
                    ["ID do usuário", USUARIO.id],
                    ["E-mail", USUARIO.email],
                    ["Telefone", USUARIO.telefone],
                  ].map(([nome, valor]) => (
                    <p key={nome} className="flex justify-between gap-3 py-2">
                      <span className="text-[#4d6a58]">{nome}</span>
                      <strong className="truncate">{valor}</strong>
                    </p>
                  ))}
                </div>
                <GreenButton onClick={() => setModal(null)} className={botaoVerde}>Fechar</GreenButton>
              </>
            )}

            {modal === "senha" && (
              <>
                <h2 className="mb-3 text-lg font-bold">Alterar senha</h2>
                <div className="mb-3 flex flex-col gap-2.5">
                  <input type="password" placeholder="Senha atual" value={senha.atual} onChange={(e) => setSenha({ ...senha, atual: e.target.value })} className={campo} />
                  <input type="password" placeholder="Nova senha" value={senha.nova} onChange={(e) => setSenha({ ...senha, nova: e.target.value })} className={campo} />
                  <input type="password" placeholder="Confirmar nova senha" value={senha.confirmar} onChange={(e) => setSenha({ ...senha, confirmar: e.target.value })} className={campo} />
                </div>
                {erro && <p className="mb-3 text-xs font-semibold text-[#b3261e]">{erro}</p>}
                <div className="flex gap-2">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 rounded-full border-[1.5px] border-[#1f6b34] bg-white py-2.5 text-sm font-semibold">Cancelar</button>
                  <GreenButton onClick={salvarSenha} className="flex-1 rounded-full border-[1.5px] border-[#1f6b34] bg-[#3fe45a] py-2.5 text-sm font-semibold">Salvar</GreenButton>
                </div>
              </>
            )}

            {modal === "idioma" && (
              <>
                <h2 className="mb-3 text-lg font-bold">Idioma</h2>
                <div className="mb-4 flex flex-col gap-2">
                  {IDIOMAS.map((idioma) => (
                    <button
                      key={idioma}
                      type="button"
                      onClick={() => {
                        mudar("idioma", idioma, `Idioma alterado para ${idioma}`);
                        setModal(null);
                      }}
                      className={`flex justify-between rounded-2xl border px-4 py-2.5 text-sm font-semibold ${
                        config.idioma === idioma ? "border-[#1f6b34] bg-[#3fe45a]/30" : "border-[#6fae7e] bg-[#e1f1e3]"
                      }`}
                    >
                      {idioma}
                      {config.idioma === idioma && <span>✓</span>}
                    </button>
                  ))}
                </div>
                <GreenButton onClick={() => setModal(null)} className={botaoVerde}>Fechar</GreenButton>
              </>
            )}

            {modal === "versao" && (
              <>
                <h2 className="text-lg font-bold">Eco Level</h2>
                <p className="mb-3 text-xs text-[#4d6a58]">Versão 1.0.0 · Build 2026.11.14</p>
                <p className="mb-4 rounded-2xl border border-[#6fae7e] bg-[#e1f1e3] px-3 py-3 text-center text-sm font-semibold text-[#1f6b34]">
                  ✓ Você já está na versão mais recente
                </p>
                <GreenButton onClick={() => setModal(null)} className={botaoVerde}>Fechar</GreenButton>
              </>
            )}

            {modal === "excluir" && (
              <>
                <h2 className="text-xl font-bold leading-snug text-[#eaf7dd]">
                  Deseja excluir sua conta <span className="text-[#ff4d4d]">permanentemente</span>?
                </h2>
                <p className="mt-2 text-xs text-[#9db5a3]">Essa ação não pode ser desfeita e seus dados serão apagados.</p>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 rounded-full bg-[#5df065] py-2.5 text-sm font-bold text-[#0f2819]">Não</button>
                  <button type="button" onClick={excluirConta} className="flex-1 rounded-full bg-[#e5484d] py-2.5 text-sm font-bold text-white">Sim</button>
                </div>
              </>
            )}
        </Modal>
      )}


      {aviso && (
        <Toast className="pointer-events-none fixed bottom-24 left-1/2 z-[110] max-w-[90%] -translate-x-1/2 rounded-full bg-[#1f6b34] px-4 py-2.5 text-center text-sm text-white shadow-lg">
          {aviso}
        </Toast>
      )}
    </section>
  );
}

export default Configuracoes;
