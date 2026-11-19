import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Personalizacao from "./pages/Personalizacao";
import Suporte from "./pages/Suporte";
import Progresso from "./pages/Progresso";
import MainLayout from "./layouts/MainLayout";
import RegistrarDescarte from "./pages/RegistrarDescarte";
import Qrcode from "./pages/Qrcode";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import Missoes from "./pages/Missoes";
import Mapa from "./pages/Mapa";
import Ranking from "./pages/Ranking";
import Reciclagem from "./pages/Reciclagem";
import Recompensas from "./pages/Recompensas";
import Usuario from "./pages/Usuario";
import Configuracoes from "./pages/Configuracoes";

function App() {
    const [usuarioLogado, setUsuarioLogado] = useState(() => {
        return localStorage.getItem("usuarioLogado") === "true";
    });

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>

                <Route
                    path="/login"
                    element={
                        usuarioLogado
                            ? <Navigate to="/" replace />
                            : <Login setUsuarioLogado={setUsuarioLogado} />
                    }
                />

                <Route
                    element={
                        usuarioLogado
                            ? <MainLayout />
                            : <Navigate to="/login" replace />
                    }
                >
                    <Route path="/" element={<Inicio />} />
                    <Route path="/missoes" element={<Missoes />} />
                    <Route path="/mapa" element={<Mapa />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/reciclagem" element={<Reciclagem />} />
                    <Route path="/recompensas" element={<Recompensas />} />
                    <Route path="/registrardescarte" element={<RegistrarDescarte />} />
                    <Route path="/qrcode" element={<Qrcode />} />

                    <Route
                        path="/usuario"
                        element={
                            <Usuario setUsuarioLogado={setUsuarioLogado} />
                        }
                    />

                    <Route path="/personalizacao" element={<Personalizacao />} />
                    <Route path="/suporte" element={<Suporte />} />
                    <Route path="/progresso" element={<Progresso />} />

                    <Route
                        path="/configuracoes"
                        element={
                            <Configuracoes setUsuarioLogado={setUsuarioLogado} />
                        }
                    />
                </Route>


                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
