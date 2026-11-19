const STORAGE_KEY = "ecolevel_progress";
export const PROGRESS_EVENT = "ecolevel-progress-updated";

export const PROGRESSO_INICIAL = {
  descartes: 34,
  kgDescartados: 45,
  kgValidados: 38,
  xp: 2350,
};

const arredondar = (n) => Math.round(n * 10) / 10;

export function getProgresso() {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (salvo && typeof salvo.descartes === "number") {
      return { ...PROGRESSO_INICIAL, ...salvo };
    }
  } catch (e) {
    /* ignora */
  }

  return { ...PROGRESSO_INICIAL };
}

function salvar(dados) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch (e) {
    /* ignora */
  }

  return dados;
}
export function registrarDescarte({ kg = 0, xp = 0 } = {}) {
  const atual = getProgresso();

  return salvar({
    ...atual,
    descartes: atual.descartes + 1,
    kgDescartados: arredondar(atual.kgDescartados + Math.max(0, kg)),
    xp: atual.xp + Math.max(0, xp),
  });
}

export function validarDescarte({ kg = 0, xp = 0 } = {}) {
  const atual = getProgresso();
  const novoValidado = Math.min(
    atual.kgDescartados,
    arredondar(atual.kgValidados + Math.max(0, kg))
  );

  return salvar({
    ...atual,
    kgValidados: novoValidado,
    xp: atual.xp + Math.max(0, xp),
  });
}

export function resetarProgresso() {
  return salvar({ ...PROGRESSO_INICIAL });
}