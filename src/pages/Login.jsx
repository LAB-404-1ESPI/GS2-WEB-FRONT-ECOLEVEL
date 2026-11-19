
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import background from "../assets/imgs/backgroundfolha.png";
import logo from "../assets/imgs/logo.png";

function Login({ setUsuarioLogado }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState("");

    const [modoCelular, setModoCelular] = useState(() => {
        return localStorage.getItem("modoCelular") === "true";
    });

    function alterarModoCelular(valor) {
        setModoCelular(valor);
        localStorage.setItem("modoCelular", String(valor));
    }

    function entrar(e) {
        e.preventDefault();

        if (
            email.trim() === "ADM@ecolevel.com" &&
            senha === "ecolevel2026"
        ) {
            localStorage.setItem("usuarioLogado", "true");
            setUsuarioLogado(true);
            navigate("/", { replace: true });
        } else {
            setErro("Usuário ou senha incorretos.");
        }
    }

    function entrarComGoogle() {
        setErro("O login com Google ainda não está configurado.");
    }

    return (
        <div className="relative isolate min-h-screen bg-slate-100 md:bg-gray-200 flex flex-col items-center">


            <div
                aria-hidden="true"
                className={`absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat ${
                    modoCelular ? "hidden" : "md:hidden"
                }`}
                style={{ backgroundImage: `url(${background})` }}
            />

            <div className="relative z-10 hidden md:flex items-center justify-center gap-3 py-5">

                <button
                    type="button"
                    onClick={() => alterarModoCelular(false)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition ${
                        !modoCelular
                            ? "bg-green-700 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    <span>🖥️</span>
                    Desktop
                </button>

                <button
                    type="button"
                    onClick={() => alterarModoCelular(true)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition ${
                        modoCelular
                            ? "bg-green-700 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    <span>📱</span>
                    Celular
                </button>

            </div>


            <div
                className={
                    modoCelular
                        ? "phone-preview relative flex flex-col w-[430px] max-w-[calc(100vw-32px)] h-[min(932px,calc(100dvh-80px))] rounded-[38px] border-[8px] border-gray-900 shadow-2xl overflow-hidden [transform:translateZ(0)]"
                        : "app-screen relative z-10 flex flex-col min-h-screen w-full"
                }
                style={
                    modoCelular
                        ? {
                            backgroundImage: `url(${background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                        }
                        : undefined
                }
            >

                <main className="flex-1 w-full min-w-0 overflow-y-auto flex items-center justify-center p-5">

                    <div className="w-full max-w-sm">


                        <div className="flex justify-center mb-6">
                            <img src={logo} alt="EcoLevel" />
                        </div>


                        <div className="w-full p-6 rounded-2xl">

                            <form
                                className="space-y-4"
                                onSubmit={entrar}
                            >
                                <p>Email</p>

                                <input
                                    type="email"
                                    placeholder="Seu e-mail"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErro("");
                                    }}
                                    required
                                    className="w-full rounded-xl p-3 border border-gray-700 bg-[#E2F0DA] outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <p>Senha</p>

                                <div className="relative">

                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        placeholder="Sua senha"
                                        value={senha}
                                        onChange={(e) => {
                                            setSenha(e.target.value);
                                            setErro("");
                                        }}
                                        required
                                        className="bg-[#E2F0DA] w-full rounded-xl p-3 pr-20 border border-gray-700 outline-none focus:ring-2 focus:ring-green-500"
                                    />


                                    <button
                                        type="button"
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600 hover:text-green-700"
                                    >
                                        {mostrarSenha ? "Ocultar" : "Mostrar"}
                                    </button>

                                </div>


                                {erro && (
                                    <p className="text-red-600 text-sm">
                                        {erro}
                                    </p>
                                )}


                                <button
                                    type="submit"
                                    className="w-full bg-green-700 text-white rounded-xl p-3 font-semibold hover:bg-green-800 transition"
                                >
                                    Entrar
                                </button>

                            </form>

                            <p className="text-sm text-gray-500 mt-2">
                                Esqueceu sua senha?{" "}
                                <a
                                    href="#"
                                    className="text-green-700 font-semibold hover:underline"
                                >
                                    Clique aqui
                                </a>
                            </p>

                            <div className="flex items-center gap-3 mt-3 text-gray-500">
                                <span className="h-px flex-1 bg-gray-300" />
                                <span>ou</span>
                                <span className="h-px flex-1 bg-gray-300" />
                            </div>


                            <button
                                type="button"
                                onClick={entrarComGoogle}
                                className="w-full mt-3 bg-white/80 text-gray-700 border border-gray-300 rounded-xl p-3 font-semibold hover:bg-white transition flex items-center justify-center gap-3"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />

                                Entrar com Google
                            </button>

                            <p className="mt-6 text-center text-black">
                                Ainda não tem conta?{" "}
                                <span className="font-semibold text-green-700">
                                    Criar conta
                                </span>
                            </p>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Login;
