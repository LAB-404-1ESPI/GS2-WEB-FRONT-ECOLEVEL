
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sacoImg from "../assets/imgs/saco.png";
import mapaImg from "../assets/imgs/mapa.png";

function RegistrarDescarte() {
    const [sacoFechado, setSacoFechado] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="w-full max-w-xl mx-auto flex flex-col gap-5 pb-4">


            <div>
                <div className="flex items-center gap-3">
                    <span className="text-4xl text-green-600">♻</span>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#203f32]">
                        Registrar descarte
                    </h1>
                </div>

                <p className="text-sm text-[#294638] mt-1">
                    Descarte seu saco de lixo fechado e ganhe Pontos Eco
                </p>

                <div className="w-12 h-1 bg-green-600 rounded-full mt-3" />
            </div>


            <div>
                <h2 className="text-sm font-bold text-[#64877d] mb-3">
                    Como funciona
                </h2>

                <div className="space-y-2">

    
                    <div className="flex items-center gap-3 bg-[#e2f0dc] border border-[#91a88b] rounded-xl p-3">
                        <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-green-400 to-green-700 text-white flex items-center justify-center text-xl font-bold shadow">
                            1
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-bold text-[#294638]">
                                Informe o código da máquina
                            </h3>
                            <p className="text-[10px] leading-tight text-[#64877d]">
                                Está no mapa e na etiqueta da lixeira.
                                <br />
                                Ex: ECOMAQ001
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/mapa")}
                            className="text-[10px] font-bold text-green-800 whitespace-nowrap"
                        >
                            Ver no mapa
                        </button>
                    </div>

                    <div className="flex items-center gap-3 bg-[#e2f0dc] border border-[#91a88b] rounded-xl p-3">
                        <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-green-400 to-green-700 text-white flex items-center justify-center text-xl font-bold shadow">
                            2
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-[#294638]">
                                Escaneie o QR code
                            </h3>
                            <p className="text-[10px] leading-tight text-[#64877d]">
                                Aponte a câmera para o QR code da máquina.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#e2f0dc] border border-[#91a88b] rounded-xl p-3">
                        <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-b from-green-400 to-green-700 text-white flex items-center justify-center text-xl font-bold shadow">
                            3
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-[#294638]">
                                Descarte e ganhe pontos
                            </h3>
                            <p className="text-[10px] leading-tight text-[#64877d]">
                                Pese o saco e jogue-o na lixeira para receber seus pontos.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

   
            <div>
                <h2 className="text-sm font-bold text-[#64877d] mb-2">
                    Antes de começar
                </h2>

                <div className="flex items-center gap-3 bg-[#e2f0dc] border border-[#91a88b] rounded-xl px-3 py-3">

                    <img
                        src={sacoImg}
                        alt="Saco de lixo"
                        className="w-9 h-9 object-contain"
                    />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-[#294638]">
                            O saco está bem fechado?
                        </h3>

                        <p className="text-[10px] leading-tight text-[#64877d]">
                            Confirme para liberar o escaneamento.
                        </p>
                    </div>

  
                    <button
                        type="button"
                        onClick={() => setSacoFechado(!sacoFechado)}
                        aria-label="Confirmar que o saco está fechado"
                        aria-pressed={sacoFechado}
                        className={`w-12 h-7 shrink-0 rounded-full p-1 flex items-center transition-colors duration-200 ${
                            sacoFechado ? "bg-green-500" : "bg-[#60877e]"
                        }`}
                    >
                        <span
                            className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                sacoFechado ? "translate-x-5" : "translate-x-0"
                            }`}
                        />
                    </button>

                </div>
            </div>

            <button
                type="button"
                onClick={() => navigate("/mapa")}
                className="w-full flex items-center gap-3 bg-[#e2f0dc] border border-[#91a88b] rounded-xl p-3 text-left hover:bg-[#d8ebd1] transition"
            >
                <img
                    src={mapaImg}
                    alt="Localização"
                    className="w-9 h-9 object-contain"
                />

                <span className="flex-1 text-xs text-[#294638]">
                    Encontre máquinas de reciclagem
                    <br />
                    perto de você!
                </span>

                <span className="text-xs font-bold text-green-800 whitespace-nowrap">
                    Ver mapa
                </span>
            </button>


            <div className="mt-6">
                <button
                    type="button"
                    disabled={!sacoFechado}
                    onClick={() => navigate("/qrcode")}
                    className={`w-full h-14 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200 ${
                        sacoFechado
                            ? "bg-green-500 text-[#173c25] shadow-md hover:bg-green-600"
                            : "bg-green-400/70 text-[#52765c] cursor-not-allowed"
                    }`}
                >
                    <span className="text-lg">▦</span>
                    Escanear QR code
                </button>
            </div>

        </section>
    );
}

export default RegistrarDescarte;
