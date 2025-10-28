import { useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask não detectado", {
        description: "Por favor, instale a extensão MetaMask para continuar.",
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      setIsConnected(true);
      setAddress(accounts[0]);
      
      toast.success("Carteira conectada!", {
        description: `Endereço: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error) {
      toast.error("Erro ao conectar", {
        description: "Não foi possível conectar com a MetaMask.",
      });
    }
  };

  return (
    <Button
      onClick={connectWallet}
      className="relative overflow-hidden bg-gradient-primary hover:scale-105 transition-transform duration-300 shadow-glass hover:shadow-hover"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isConnected ? (
        <span>
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      ) : (
        "Conectar MetaMask"
      )}
    </Button>
  );
}
