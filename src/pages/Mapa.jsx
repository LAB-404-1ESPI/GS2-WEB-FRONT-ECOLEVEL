
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import mapaImg from "../assets/imgs/mapa.png";

const iconeMapa = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function Mapa() {
    const [ecopontos, setEcopontos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    const centro = [-23.5329, -46.7916];

    useEffect(() => {
        const buscarEcopontos = async () => {
            try {
                const consulta = `
                    [out:json][timeout:25];
                    (
                        node["amenity"="recycling"](around:10000,${centro[0]},${centro[1]});
                        way["amenity"="recycling"](around:10000,${centro[0]},${centro[1]});
                    );
                    out center;
                `;

                const resposta = await fetch(
                    "https://overpass-api.de/api/interpreter",
                    {
                        method: "POST",
                        body: consulta,
                    }
                );

                if (!resposta.ok) {
                    throw new Error("Erro ao consultar a API");
                }

                const dados = await resposta.json();

                const pontos = dados.elements
                    .map((item) => ({
                        id: item.id,
                        nome: item.tags?.name || "Ponto de reciclagem",
                        latitude: item.lat ?? item.center?.lat,
                        longitude: item.lon ?? item.center?.lon,
                    }))
                    .filter((item) => item.latitude && item.longitude);

                setEcopontos(pontos);
            } catch (error) {
                console.error(error);
                setErro(true);
            } finally {
                setCarregando(false);
            }
        };

        buscarEcopontos();
    }, []);

    return (
        <section className="w-full space-y-4 pb-48">
            <div>
                <div className="flex items-center gap-3">
                    <img
                        src={mapaImg}
                        alt="Mapa"
                        className="w-10 h-10 object-contain"
                    />

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#203f32]">
                        Mapa
                    </h1>
                </div>

                <p className="text-sm sm:text-base text-[#294638] mt-2">
                    Encontre as Máquinas de coleta mais próximas de você!
                </p>

                <div className="w-12 h-1 bg-green-600 rounded-full mt-3" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-3 space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="font-bold text-[#203f32] text-sm sm:text-base">
                        Pontos de coleta próximos
                    </h2>

                    <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        {ecopontos.length} encontrados
                    </span>
                </div>

                <div className="w-full h-[220px] sm:h-[280px] overflow-hidden rounded-xl">
                    <MapContainer
                        center={centro}
                        zoom={13}
                        scrollWheelZoom={true}
                        className="w-full h-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {ecopontos.map((ponto) => (
                            <Marker
                                key={ponto.id}
                                position={[ponto.latitude, ponto.longitude]}
                                icon={iconeMapa}
                            >
                                <Popup>
                                    <strong>{ponto.nome}</strong>
                                    <br />
                                    Ponto de reciclagem
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                {carregando && (
                    <p className="text-xs text-gray-500 text-center">
                        Buscando pontos de coleta...
                    </p>
                )}

                {erro && (
                    <p className="text-xs text-red-600 text-center">
                        Não foi possível carregar os pontos. Tente novamente mais tarde.
                    </p>
                )}

                {!carregando && !erro && ecopontos.length === 0 && (
                    <p className="text-xs text-gray-500 text-center">
                        Nenhum ponto de reciclagem encontrado nessa região.
                    </p>
                )}
            </div>
        </section>
    );
}

export default Mapa;
