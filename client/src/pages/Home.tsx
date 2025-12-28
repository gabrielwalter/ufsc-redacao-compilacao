import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, BarChart3 } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-900">Análise da Redação UFSC</h1>
          </div>
          <Button onClick={() => navigate("/dashboard")} variant="default">
            Acessar Painel
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16 md:py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Compreenda os Critérios da Banca Examinadora
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Acesse uma análise completa dos gêneros discursivos cobrados no Vestibular UFSC desde 2009, 
            com base em relatórios oficiais da COPERVE. Prepare-se com as orientações diretas da banca.
          </p>
          <Button 
            onClick={() => navigate("/dashboard")} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Explorar Análises
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
              <CardTitle className="text-lg">Gêneros por Frequência</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Visualize quais gêneros discursivos foram mais cobrados nas últimas edições do vestibular.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
              <CardTitle className="text-lg">Análises Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Leia os critérios de avaliação específicos para cada gênero, diretamente dos relatórios oficiais.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
              <CardTitle className="text-lg">Dados Oficiais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Todas as informações provêm de relatórios oficiais da COPERVE/UFSC (2009-2025).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Sobre Esta Aplicação</h3>
          <div className="space-y-4 text-slate-700">
            <p>
              Esta aplicação reúne análises oficiais da prova de Redação do Vestibular UFSC, 
              organizadas por gênero discursivo. Os dados foram extraídos de relatórios publicados 
              pela Comissão Permanente do Vestibular (COPERVE) desde 2009.
            </p>
            <p>
              O objetivo é fornecer aos vestibulandos uma visão clara dos critérios de avaliação 
              utilizados pela banca examinadora, permitindo uma preparação mais estratégica e fundamentada.
            </p>
            <p className="text-sm text-slate-600 pt-4 border-t border-slate-200">
              <strong>Fonte de dados:</strong> Relatórios Oficiais da COPERVE/UFSC (2009-2025)
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="container py-8 text-center text-slate-600 text-sm">
          <p>Dados extraídos de relatórios oficiais da COPERVE/UFSC</p>
          <p className="mt-2">© 2025 Análise da Redação UFSC</p>
        </div>
      </footer>
    </div>
  );
}
