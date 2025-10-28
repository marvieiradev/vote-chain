import { TrendingUp, Users, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MetricsCardProps {
  totalEth: number;
  totalVotes: number;
  contractAddress: string;
}

export function MetricsCard({ totalEth, totalVotes, contractAddress }: MetricsCardProps) {
  const openEtherscan = () => {
    window.open(`https://etherscan.io/address/${contractAddress}`, "_blank");
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-primary/20 shadow-glass hover:shadow-hover transition-all duration-300">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Métricas da Votação
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Total Arrecadado</span>
            </div>
            <p className="text-4xl font-bold text-primary animate-pulse-glow">
              {totalEth.toFixed(3)} ETH
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Total de Votos</span>
            </div>
            <p className="text-4xl font-bold text-primary">{totalVotes}</p>
          </div>
        </div>

        <Button
          onClick={openEtherscan}
          variant="outline"
          className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Ver Contrato no EtherScan
        </Button>
      </div>
    </Card>
  );
}
