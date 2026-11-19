import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ecolevel_rewards";
const STARTING_POINTS = 1250;
const POINTS_EVENT = "ecolevel-points-updated";

function lerPontos() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (salvo && typeof salvo.points === "number") {
      return {
        points: salvo.points,
        history: Array.isArray(salvo.history) ? salvo.history : [],
      };
    }
  } catch {
    // Mantém os valores iniciais se o armazenamento estiver inválido.
  }

  return { points: STARTING_POINTS, history: [] };
}

function usePontos({ persistir = false } = {}) {
  const [dadosPontos, setDadosPontos] = useState(lerPontos);
  const atualizarPontos = useCallback(() => setDadosPontos(lerPontos()), []);

  useEffect(() => {
    const atualizar = atualizarPontos;

    window.addEventListener("focus", atualizar);
    window.addEventListener("storage", atualizar);
    if (!persistir) window.addEventListener(POINTS_EVENT, atualizar);

    return () => {
      window.removeEventListener("focus", atualizar);
      window.removeEventListener("storage", atualizar);
      if (!persistir) window.removeEventListener(POINTS_EVENT, atualizar);
    };
  }, [persistir, atualizarPontos]);

  useEffect(() => {
    if (!persistir) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosPontos));
      window.dispatchEvent(new Event(POINTS_EVENT));
    } catch {
      // Mantém o funcionamento da tela mesmo se o armazenamento falhar.
    }
  }, [dadosPontos, persistir]);

  return {
    dadosPontos,
    setDadosPontos,
    atualizarPontos,
    pontos: dadosPontos.points,
    historico: dadosPontos.history,
  };
}

export default usePontos;
