import { useState } from "react";
import { CandidateCard } from "@/components/CandidateCard";
import { MetricsCard } from "@/components/MetricsCard";
import { ConnectWallet } from "@/components/ConnectWallet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Trophy, Vote } from "lucide-react";
import candidate1 from "@/assets/candidate-1.jpg";
import candidate2 from "@/assets/candidate-2.jpg";
import candidate3 from "@/assets/candidate-3.jpg";
import candidate4 from "@/assets/candidate-4.jpg";

const initialCandidates = [
  {
    id: 1,
    name: "Maria Silva",
    party: "Partido Progressista",
    image: candidate1,
    votes: 127,
    proposals: [
      "Investimento em educação pública de qualidade",
      "Programa de energia limpa e sustentável",
      "Criação de startups e inovação tecnológica",
      "Melhoria do sistema de saúde universal",
      "Transparência total na gestão pública",
    ],
  },
  {
    id: 2,
    name: "João Santos",
    party: "Partido da Renovação",
    image: candidate2,
    votes: 98,
    proposals: [
      "Redução de impostos para pequenas empresas",
      "Infraestrutura moderna para transporte",
      "Segurança pública com tecnologia",
      "Habitação popular acessível",
      "Descentralização administrativa",
    ],
  },
  {
    id: 3,
    name: "Pedro Costa",
    party: "Partido Digital",
    image: candidate3,
    votes: 156,
    proposals: [
      "Governo digital e blockchain",
      "Internet gratuita para todos",
      "Hub de tecnologia e startups",
      "Educação em programação nas escolas",
      "Participação cidadã via plataforma online",
    ],
  },
  {
    id: 4,
    name: "Ana Oliveira",
    party: "Partido Verde",
    image: candidate4,
    votes: 143,
    proposals: [
      "Políticas ambientais rigorosas",
      "Transporte público elétrico",
      "Economia circular e reciclagem",
      "Proteção de áreas verdes urbanas",
      "Incentivo à agricultura orgânica",
    ],
  },
];

const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

const Index = () => {
  const [candidates, setCandidates] = useState(initialCandidates);

  const handleVote = (candidateId: number) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, votes: candidate.votes + 1 }
          : candidate
      )
    );
  };

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );
  const totalEth = totalVotes * 0.025;

  const rankedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/10 shadow-glass">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Vote className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  VoteChain
                </h1>
                <p className="text-xs text-muted-foreground">
                  Votação Transparente via Blockchain
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ConnectWallet />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Metrics Section */}
        <section className="animate-fade-in">
          <MetricsCard
            totalEth={totalEth}
            totalVotes={totalVotes}
            contractAddress={CONTRACT_ADDRESS}
          />
        </section>

        {/* Ranking Section */}
        <section
          className="space-y-6 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">Ranking dos Candidatos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rankedCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onVote={handleVote}
                rank={index + 1}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>VoteChain - Plataforma de Votação Blockchain</p>
          <p className="mt-2">Transparente, Seguro e Descentralizado</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
