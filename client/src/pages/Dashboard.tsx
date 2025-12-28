import { useState, useEffect } from "react";
import { useState as useStateType } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Loader2, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface YearGenreData {
  year: number;
  vestibular: string;
  genres: string[];
  source_type: "prova" | "análise_banca";
  url: string;
  analysis_url?: string;
  notes?: string;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [yearData, setYearData] = useState<Record<string, YearGenreData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<Array<{ name: string; value: number; years: number[] }>>([]);

  // Cores para o gráfico de pizza
  const COLORS = [
    "#3b82f6", // azul
    "#ef4444", // vermelho
    "#10b981", // verde
    "#f59e0b", // âmbar
    "#8b5cf6", // roxo
    "#ec4899", // rosa
    "#14b8a6", // teal
    "#f97316", // laranja
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearResponse = await fetch("/genres-by-year.json");
        const yearJsonData: Record<string, YearGenreData> = await yearResponse.json();
        setYearData(yearJsonData);

        // Calcular frequência de gêneros em todo o período
        const genreFrequency: Record<string, { count: number; years: number[] }> = {};
        Object.values(yearJsonData).forEach((year) => {
          year.genres.forEach((genre) => {
            const normalizedGenre = genre.toLowerCase();
            if (!genreFrequency[normalizedGenre]) {
              genreFrequency[normalizedGenre] = { count: 0, years: [] };
            }
            genreFrequency[normalizedGenre].count += 1;
            if (!genreFrequency[normalizedGenre].years.includes(year.year)) {
              genreFrequency[normalizedGenre].years.push(year.year);
            }
          });
        });

        // Converter para formato do gráfico e ordenar por frequência
        const chartDataArray = Object.entries(genreFrequency)
          .map(([name, data]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value: data.count,
            years: data.years.sort((a, b) => a - b)
          }))
          .sort((a, b) => {
            // Critério 1: Ordena por frequência (maior → menor)
            if (b.value !== a.value) {
              return b.value - a.value;
            }
            
            // Critério 2 (desempate): Se a frequência é igual, ordena pelo ano mais recente
            // Math.max() encontra o ano mais recente de cada gênero
            const anoMaisRecenteA = Math.max(...a.years);
            const anoMaisRecenteB = Math.max(...b.years);
            
            // Retorna a diferença: ano mais recente vem primeiro (ordem decrescente)
            return anoMaisRecenteB - anoMaisRecenteA;
          });

        setChartData(chartDataArray);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!yearData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Erro ao carregar dados</p>
      </div>
    );
  }

  const yearDataArray = Object.values(yearData).sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Desvendando a Redação na UFSC
          </h1>
         
        </div>

        {/* Tabs */}
        <Tabs defaultValue="por-genero" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="por-genero">Por Gênero</TabsTrigger>
            <TabsTrigger value="por-edicao">Por Edição</TabsTrigger>
          </TabsList>

          {/* Aba: Por Gênero */}
          <TabsContent value="por-genero" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequência de Gêneros</CardTitle>
                <CardDescription>
                  Distribuição dos gêneros discursivos solicitados entre a edição de 2009 e a de 2026:
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} ${value === 1 ? 'edição' : 'edições'}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-slate-600">Nenhum dado disponível</p>
                )}
              </CardContent>
            </Card>

            {/* Tabela de frequências */}
            <Card>
              <CardHeader>
                <CardTitle>Ranking de gêneros</CardTitle>
                <CardDescription>
                  Quantas vezes cada gênero foi solicitado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chartData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                        ></div>
                        <span className="font-semibold text-slate-900">{item.name}</span>
                      </div>
                      <Badge variant="secondary">
                        {item.value} {item.value === 1 ? 'edição' : 'edições'} ({item.years.map((year, index) => {
                          // Conta quantas vezes esse gênero específico apareceu nesse ano
                          const count = yearData?.[year]?.genres.filter(
                            (g) => g.toLowerCase() === item.name.toLowerCase()
                          ).length || 1;
                          
                          const yearText = `${year}${count > 1 ? ` (${count}×)` : ''}`;
                          return index < item.years.length - 1 ? `${yearText}, ` : yearText;
                        }).join('')})
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba: Por Edição */}
          <TabsContent value="por-edicao" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Edições do Vestibular</CardTitle>
                <CardDescription>
                  Gêneros solicitados em cada edição (2009-2026):
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {yearDataArray.map((year) => (
                    <Card key={year.year} className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-slate-600" />
                              <h3 className="font-semibold text-slate-900">
                                {year.year}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {year.vestibular}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {year.genres.map((genre, idx) => (
                                <Badge
                                  key={`${genre}-${idx}`}
                                  variant="secondary"
                                  className="capitalize"
                                >
                                  {genre}
                                </Badge>
                              ))}
                            </div>
                            {year.notes && (
                              <p className="text-sm text-slate-600 italic">
                                {year.notes}
                              </p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className={
                              year.source_type === "análise_banca"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-purple-600 hover:bg-purple-700"
                            }
                            asChild
                          >
                            <a
                              href={year.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              {year.source_type === "análise_banca"
                                ? "Ver Análise"
                                : "Ver Prova"}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legenda */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-600"></div>
                    <span>
                      <strong>Azul:</strong> Análise da banca disponível no relatório oficial
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-purple-600"></div>
                    <span>
                      <strong>Roxo:</strong> Apenas a prova disponível (gêneros extraídos da prova)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
