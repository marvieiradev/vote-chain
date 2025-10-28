import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, TrendingUp } from "lucide-react";
import { VoteModal } from "./VoteModal";

interface Candidate {
  id: number;
  name: string;
  party: string;
  image: string;
  votes: number;
  proposals: string[];
}

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidateId: number) => void;
  rank?: number;
}

export function CandidateCard({ candidate, onVote, rank }: CandidateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="group overflow-hidden bg-gradient-card backdrop-blur-xl border-primary/20 shadow-glass hover:shadow-hover transition-all duration-300 hover:scale-[1.02] animate-fade-in">
        <div className="relative">
          {rank && (
            <Badge className="absolute top-4 right-4 z-10 bg-gradient-primary text-white shadow-lg">
              #{rank}
            </Badge>
          )}

          <div className="relative h-64 overflow-hidden">
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-90" />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground">{candidate.party}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary">
              {candidate.votes} votos
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Propostas de Governo:
            </h4>
            <ul className="space-y-2">
              {candidate.proposals.map((proposal, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-foreground/80">{proposal}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-4 bg-gradient-primary hover:scale-105 transition-transform shadow-glass"
          >
            <Vote className="mr-2 h-4 w-4" />
            Votar (0.025 ETH)
          </Button>
        </div>
      </Card>

      <VoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        candidateName={candidate.name}
        candidateId={candidate.id}
        onVoteConfirm={onVote}
      />
    </>
  );
}
