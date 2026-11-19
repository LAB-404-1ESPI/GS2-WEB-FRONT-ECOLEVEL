
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import qrcodeImg from "../assets/imgs/qrcode.png";

function Qrcode() {
    const [confirmado, setConfirmado] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 pb-6">


            <div className="w-full">
                <div className="flex items-center gap-3">
                    <span className="text-4xl text-green-600">♻</span>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#203f32]">
                        Registrar descarte
                    </h1>
                </div>

                <p className="text-sm text-[#294638] mt-1">
                    Escaneie o QR Code da máquina para continuar.
                </p>

                <div className="w-12 h-1 bg-green-600 rounded-full mt-3" />
            </div>

            <div className="w-full max-w-[320px] aspect-square bg-white rounded-2xl border-2 border-gray-300 flex items-center justify-center p-5">

                <img
                    src={qrcodeImg}
                    alt="QR Code da máquina"
                    className="w-full h-full object-contain"
                />

            </div>


            <div className="w-full bg-[#e2f0dc] border border-[#91a88b] rounded-xl p-4 text-center">

                <h2 className="text-sm font-bold text-[#294638]">
                    Código da máquina
                </h2>

                <p className="text-xl font-bold text-green-800 mt-1">
                    ECOMAQ001
                </p>

                <p className="text-xs text-[#64877d] mt-2">
                    Aponte a câmera para o QR Code e confira se está na máquina correta.
                </p>

            </div>


            <button
                type="button"
                onClick={() => setConfirmado(true)}
                className="w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-[#173c25] font-bold text-sm shadow-md transition"
            >
                Confirmar descarte
            </button>


            {confirmado && (
                <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-5">

                    <div className="w-full max-w-sm bg-[#111a13] rounded-xl p-7 text-center shadow-2xl">

                        <h2 className="text-xl font-bold text-[#e2f0dc] mb-3">
                            Descarte confirmado!
                        </h2>

                        <p className="text-sm text-[#e2f0dc] leading-relaxed mb-6">
                            Aguarde a validação feita pela equipe de triagem.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setConfirmado(false);
                                navigate("/");
                            }}
                            className="w-full h-11 rounded-lg bg-green-500 hover:bg-green-600 text-[#173c25] font-bold text-sm transition"
                        >
                            Concluído
                        </button>

                    </div>
                </div>
            )}

        </section>
    );
}

export default Qrcode;
