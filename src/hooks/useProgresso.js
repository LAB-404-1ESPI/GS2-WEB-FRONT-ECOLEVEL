import { useCallback, useEffect, useState } from "react";
import {
  getProgresso,
  PROGRESS_EVENT,
  registrarDescarte as salvarDescarte,
  validarDescarte as salvarValidacao,
  resetarProgresso as salvarReset,
} from "../js/progresso";

function useProgresso() {
  const [dados, setDados] = useState(getProgresso);

  const atualizar = useCallback(() => {
    setDados(getProgresso());
  }, []);

  useEffect(() => {
    window.addEventListener("focus", atualizar);
    window.addEventListener("storage", atualizar);
    window.addEventListener(PROGRESS_EVENT, atualizar);

    return () => {
      window.removeEventListener("focus", atualizar);
      window.removeEventListener("storage", atualizar);
      window.removeEventListener(PROGRESS_EVENT, atualizar);
    };
  }, [atualizar]);

  const registrarDescarte = useCallback((valores) => {
    const atualizado = salvarDescarte(valores);
    setDados(atualizado);
    return atualizado;
  }, []);

  const validarDescarte = useCallback((valores) => {
    const atualizado = salvarValidacao(valores);
    setDados(atualizado);
    return atualizado;
  }, []);

  const resetarProgresso = useCallback(() => {
    const atualizado = salvarReset();
    setDados(atualizado);
    return atualizado;
  }, []);

  return { dados, atualizar, registrarDescarte, validarDescarte, resetarProgresso };
}

export default useProgresso;
