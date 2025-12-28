import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useLocation } from "wouter";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-600" />
            <h1 className="text-xl font-bold text-slate-900">Desvendando a prova de Redação da UFSC</h1>
          </div>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2 text-slate-600" />
            Voltar
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre a aplicação</h2>
            <div className="space-y-4 text-slate-700">
              <p>
                Esta aplicação reúne dados relativos à prova de Redação do vestibular da Universidade Federal de Santa Catarina nas edições de 2009 a 2026.
                Seu objetivo é facilitar o acesso a informações já publicizadas pela própria Comissão Permanente do Vestibular e disponíveis na internet, porém, até então, de forma dispersa. Com isso, almeja-se que o vestibulando gaste menos tempo procurando todas essas informações e invista-o em sua preparação para a prova.
              </p>
              <p>
                Idealizada pelo professor Gabriel, nasceu com o mero intuito de colocar em prática conhecimentos de programação web e análises que tem feito sobre vestibulares enquanto docente de Língua Portuguesa. Está disponível ao público como fonte de consulta. Houve auxílio de IA (Copilot e Claude Sonnet 4.5) na construção da interface gráfica.
              </p>
              <p className="font-bold">
                Não tem qualquer ligação com a Comissão Permanente do Vestibular da Universidade Federal de Santa Catarina. As informações aqui reunidas provêm de <a href="https://coperve.ufsc.br/vestibulares-anteriores/" target="_blank" className="text-blue-600 hover:text-blue-800 underline">páginas</a> no portal da COPERVE, sendo públicas e, portanto, não sigilosas.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8 md:p-12">
            <div className="space-y-2 text-slate-700">
              <p>
                <strong>Contato:</strong>{" "}
                <a href="mailto:gabrielwfuchsberger@gmail.com" className="text-blue-600 hover:text-blue-800 underline">
                  gabrielwfuchsberger@gmail.com
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href="https://github.com/gabrielwalter" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                  github.com/gabrielwalter
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
