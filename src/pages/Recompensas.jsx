
import { useEffect, useMemo, useState } from "react";
import usePontos from "../hooks/usePontos";
import Modal from "../components/Modal";
import GreenButton from "../components/GreenButton";
import Toast from "../components/Toast";

import carrefourImg from "../assets/imgs/carrefour.png";
import adidasImg from "../assets/imgs/adidas.png";
import googlePlayImg from "../assets/imgs/google.png";
import superReciclaImg from "../assets/imgs/super-recicla.png";
import recompensasacaorapidaImg from "../assets/imgs/recompensasacaorapida.png";
import folhaImg from "../assets/imgs/folha.png";

const REWARDS = [
  {
    id: "carrefour",
    type: "cupom",
    name: "Cupom de Desconto Carrefour",
    desc: "20% de desconto em suas compras.",
    cost: 1000,
    badge: "-20%",
    img: carrefourImg
  },
  {
    id: "adidas",
    type: "cupom",
    name: "Cupom de Desconto Outlet Adidas",
    desc: "15% de desconto em produtos selecionados.",
    cost: 2500,
    badge: "-15%",
    img: adidasImg
  },
  {
    id: "gplay",
    type: "giftcard",
    name: "Gift Card Google Play",
    desc: "Saldo para aproveitar seus jogos, apps e muito mais.",
    cost: 2000,
    img: googlePlayImg
  },
  {
    id: "skin",
    type: "skin",
    name: 'Skin "Super Recicla"',
    desc: 'Adquira a skin do "Super Recicla".',
    cost: 1500,
    badge: "EXCLUSIVO",
    img: superReciclaImg,
    unique: true
  },
];

const TABS = [
  { key: "all", label: "Todas" },
  { key: "cupom", label: "Cupons" },
  { key: "giftcard", label: "GiftCards" },
  { key: "skin", label: "Skins" },
];

const fmt = (n) => n.toLocaleString("pt-BR");

function Recompensas() {
  const {
    dadosPontos: state,
    setDadosPontos: setState
  } = usePontos({ persistir: true });

  const [filter, setFilter] = useState("all");
  const [pending, setPending] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;

    const t = setTimeout(() => setToast(null), 2600);

    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setPending(null);
        setShowHistory(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const list = useMemo(
    () => REWARDS.filter(
      (r) => filter === "all" || r.type === filter
    ),
    [filter]
  );

  const owned = (id) => state.history.some((h) => h.id === id);

  const askConfirm = (reward) => {
    if (state.points < reward.cost) {
      setToast({
        msg: "Pontos Eco insuficientes.",
        error: true
      });
      return;
    }

    setPending(reward);
  };

  const confirmPurchase = () => {
    if (!pending) return;

    if (state.points < pending.cost) {
      setToast({
        msg: "Pontos Eco insuficientes.",
        error: true
      });

      setPending(null);
      return;
    }

    const entry = {
      id: pending.id,
      name: pending.name,
      cost: pending.cost,
      date: Date.now(),
      code: pending.type === "skin"
        ? null
        : "ECO-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    };

    setState((s) => ({
      points: s.points - pending.cost,
      history: [...s.history, entry],
    }));

    setToast({
      msg: pending.type === "skin"
        ? "Skin adquirida!"
        : "Troca realizada! Veja o código no histórico.",
      error: false,
    });

    setPending(null);
  };

  return (
    <section
      className="mx-auto min-h-full w-full max-w-md px-3.5 pb-25 pt-3 text-[#1d3a27]"
      aria-labelledby="rw-title"
    >
      <h1 id="rw-title" className="flex items-center gap-2 text-2xl font-bold">
        <img
          src={recompensasacaorapidaImg}
          alt=""
          className="h-6 w-6 object-contain"
        />
        Recompensas
      </h1>

      <p className="mb-3 mt-1 text-xs text-[#5c7565]">
        Troque seus Pontos Eco por recompensas incríveis!
      </p>

      <div className="flex items-center gap-3 rounded-full border-[1.5px] border-[#6fae7e] bg-[#bee6c6]/55 px-3 py-2.5">
        <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#bfe6c6]">
          <img
            src={folhaImg}
            alt="Pontos Eco"
            className="h-6 w-6 object-contain"
          />
        </div>

        <div className="flex-1 text-center leading-none">
          <strong className="block text-2xl">
            {fmt(state.points)}
          </strong>
          <span className="text-xs text-[#5c7565]">
            Pontos Eco
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowHistory(true)}
          className="rounded-full border border-[#6fae7e] bg-[#bfe6c6] px-3 py-1.5 text-[11px] font-semibold"
        >
          Ver histórico
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Categorias de recompensas"
        className="my-3 flex rounded-full border-[1.5px] border-[#6fae7e] bg-white/40 p-0.5"
      >
        {TABS.map((t) => {
          const active = filter === t.key;

          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(t.key)}
              className={`flex-1 rounded-full py-1.5 text-xs transition-colors ${active
                  ? "bg-[#3fe45a] font-bold ring-[1.5px] ring-inset ring-[#1f6b34]"
                  : "font-medium"
                }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="grid grid-cols-2 gap-2.5">
        {list.length === 0 && (
          <p className="col-span-2 py-8 text-center text-sm text-[#5c7565]">
            Nenhuma recompensa nesta categoria ainda.
          </p>
        )}

        {list.map((r) => {
          const has = r.unique && owned(r.id);
          const noPoints = state.points < r.cost;
          const disabled = has || noPoints;

          return (
            <article
              key={r.id}
              className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border-[1.5px] border-[#6fae7e] bg-white/75"
            >
              {r.badge && (
                <span className="absolute right-1.5 top-1.5 z-10 rounded-md border border-[#1f6b34] bg-[#3fe45a] px-1.5 py-0.5 text-[9px] font-bold">
                  {r.badge}
                </span>
              )}

              <div className="flex h-20 w-full items-center justify-center overflow-hidden bg-white px-3 py-2">
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  className={`h-full w-full object-contain ${r.id === "gplay" || r.id === "skin"
                      ? "-translate-y-2"
                      : ""
                    }`}
                />
              </div>

              <div className="flex flex-1 flex-col gap-1 px-2 pb-2 pt-1.5">
                <h3 className="text-[11px] font-semibold leading-tight">
                  {r.name}
                </h3>

                <p className="flex-1 text-[9px] leading-tight text-[#5c7565]">
                  {r.desc}
                </p>

                <div className="mt-1 flex items-center justify-between rounded-lg border border-[#6fae7e] bg-[#bee6c6]/60 py-1 pl-2 pr-1">
                  <span className="text-[9px] font-bold">
                    {fmt(r.cost)} PE
                  </span>

                  <button
                    type="button"
                    disabled={disabled}
                    title={noPoints && !has ? "Pontos insuficientes" : undefined}
                    onClick={() => askConfirm(r)}
                    className="rounded-md border border-[#1f6b34] bg-[#3fe45a] px-2 py-0.5 text-[8px] font-bold disabled:cursor-not-allowed disabled:border-[#9bb0a2] disabled:bg-[#d5dfd8] disabled:text-[#6c8074]"
                  >
                    {has ? "ADQUIRIDA" : "COMPRAR"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {pending && (
        <Modal
          onClose={() => setPending(null)}
          ariaLabelledBy="rw-confirm-title"
          contentClassName="max-h-[80vh] w-full max-w-md overflow-auto rounded-3xl bg-white px-4 pb-6 pt-5 shadow-2xl"
        >
          <h2 id="rw-confirm-title" className="mb-1.5 text-lg font-bold">
            Confirmar troca
          </h2>

          <p className="mb-3.5 text-sm text-[#5c7565]">
            Trocar {fmt(pending.cost)} Pontos Eco por "{pending.name}"?
            Você ficará com {fmt(state.points - pending.cost)} PE.
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPending(null)}
              className="flex-1 rounded-full border-[1.5px] border-[#1f6b34] bg-white py-2.5 text-sm font-semibold"
            >
              Cancelar
            </button>

            <GreenButton
              autoFocus
              onClick={confirmPurchase}
              className="flex-1 rounded-full border-[1.5px] border-[#1f6b34] bg-[#3fe45a] py-2.5 text-sm font-semibold"
            >
              Confirmar
            </GreenButton>
          </div>
        </Modal>
      )}

      {showHistory && (
        <Modal
          onClose={() => setShowHistory(false)}
          ariaLabelledBy="rw-history-title"
          contentClassName="max-h-[80vh] w-full max-w-md overflow-auto rounded-3xl bg-white px-4 pb-6 pt-5 shadow-2xl"
        >
          <h2 id="rw-history-title" className="mb-1.5 text-lg font-bold">
            Histórico de trocas
          </h2>

          <ul className="mb-3.5">
            {state.history.length === 0 && (
              <li className="py-2.5 text-sm">
                Você ainda não fez nenhuma troca.
              </li>
            )}

            {[...state.history].reverse().map((h, i) => (
              <li
                key={h.date + "-" + i}
                className="flex justify-between gap-2 border-b border-[#e3eee6] py-2.5 text-sm"
              >
                <div>
                  {h.name}
                  <small className="block text-[11px] text-[#5c7565]">
                    {new Date(h.date).toLocaleDateString("pt-BR")}
                    {h.code ? ` · Código: ${h.code}` : ""}
                  </small>
                </div>

                <span className="whitespace-nowrap font-semibold text-[#b3261e]">
                  -{fmt(h.cost)} PE
                </span>
              </li>
            ))}
          </ul>

          <GreenButton onClick={() => setShowHistory(false)}>
            Fechar
          </GreenButton>
        </Modal>
      )}

      <Toast
        visible={Boolean(toast)}
        error={Boolean(toast?.error)}
        className={`pointer-events-none fixed bottom-24 left-1/2 z-[110] max-w-[90%] -translate-x-1/2 rounded-full px-4 py-2.5 text-center text-sm text-white transition-opacity ${toast ? "opacity-100" : "opacity-0"
          } ${toast?.error ? "bg-[#b3261e]" : "bg-[#1f6b34]"}`}
      >
        {toast?.msg}
      </Toast>
    </section>
  );
}

export default Recompensas;
