
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import background from "../assets/imgs/background.png";

function MainLayout() {
    return (
        <div className="app-shell relative isolate flex w-full flex-col overflow-hidden bg-[#f5f0e6]">


            <div
                aria-hidden="true"
                className="app-background pointer-events-none absolute inset-0 block bg-cover bg-center bg-no-repeat md:hidden"
                style={{ backgroundImage: `url(${background})` }}
            />

            <div className="app-screen relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-hidden">

                <div className="relative z-50 w-full shrink-0">
                    <Header />
                </div>

                {/* Apenas o conteúdo das páginas possui rolagem */}
                <main className="app-scroll mx-auto min-h-0 w-full max-w-7xl min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 pb-32">
                    <Outlet />
                    <Footer />
                </main>

                

                <BottomNav />

            </div>
        </div>
    );
}

export default MainLayout;
