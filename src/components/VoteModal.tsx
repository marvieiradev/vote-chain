import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Vote, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  candidateId: number;
  onVoteConfirm: (candidateId: number) => void;
}

export function VoteModal({
  isOpen,
  onClose,
  candidateName,
  candidateId,
  onVoteConfirm,
}: VoteModalProps) {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    setIsVoting(true);
    
    // Simulação de transação
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    onVoteConfirm(candidateId);
    setIsVoting(false);
    onClose();
    
    toast.success("Voto registrado!", {
      description: `Seu voto para ${candidateName} foi confirmado na blockchain.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirmar Voto</DialogTitle>
          <DialogDescription className="text-base">
            Você está prestes a votar em <span className="font-bold text-primary">{candidateName}</span>.
            Esta ação custará <span className="font-bold">0.025 ETH</span> e não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Valor da votação</span>
              <span className="font-bold text-lg">0.025 ETH</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Ao confirmar, uma transação será enviada para a blockchain Ethereum.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isVoting}>
            Cancelar
          </Button>
          <Button
            onClick={handleVote}
            disabled={isVoting}
            className="bg-gradient-primary hover:scale-105 transition-transform"
          >
            {isVoting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Vote className="mr-2 h-4 w-4" />
                Confirmar Voto
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
