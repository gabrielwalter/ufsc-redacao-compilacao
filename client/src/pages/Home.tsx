
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, BarChart3, Bold } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-red-600" />
            <h1 className="text-xl font-bold text-slate-900">A prova de Redação na UFSC</h1>
          </div>
          <Button onClick={() => navigate("/sobre")} variant="outline" className="text-slate-600 hover:text-slate-900">
            Sobre
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16 md:py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Estude com confiança! 
          </h2>
          <div className="text-lg text-slate-600 mb-8 text-left max-w-2xl mx-auto">
            <ul className="space-y-3 list-disc list-inside">
              <li>Acesse análises completas das provas de Redação dos vestibulares da UFSC a partir de relatórios oficiais da COPERVE (quando disponíveis).</li>
              <li>Prepare-se com o que a banca efetivamente espera para cada gênero já cobrado.</li>
              <li>Saiba quais são os gêneros mais recorrentes na prova e quais mais têm aparecido nas últimas edições, desde 2009.</li>
            </ul>
          </div>
          <Button 
            onClick={() => navigate("/dashboard")} 
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Acessar Painel
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-red-600 mb-3" />
              <CardTitle className="text-lg">Gêneros por Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Visualize quais gêneros do discurso foram mais cobrados nas últimas edições do vestibular.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-red-600 mb-3" />
              <CardTitle className="text-lg">Análises Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Leia os critérios de avaliação específicos para cada gênero diretamente dos relatórios oficiais.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-red-600 mb-3" />
              <CardTitle className="text-lg">Dados Oficiais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Todos os dados foram extraídos das páginas da COPERVE acerca das edições dos vestibulares de 2009 a 2026.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
