'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, CheckCircle, Zap, Clock, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PaymentMethods } from "../components/payment-methods";
import { useToast } from "@/components/ui/use-toast";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const handlePaymentSuccess = () => {
    setSelectedPlan(null);
    setShowSuccess(true);

    toast({
      title: "Paiement réussi !",
      description: "Créez maintenant votre compte pour accéder à votre espace.",
      variant: "default",
    });

    // Redirection vers la page d'inscription après 2 secondes
    setTimeout(() => {
      router.push('/auth/register');
    }, 2000);
  };
  const plans: Plan[] = [
    {
      name: "Mensuel",
      price: "19 000",
      period: "FCFA/mois",
      description: "Idéal pour les créateurs indépendants",
      features: [
        "Accès à toutes les fonctionnalités de base",
        "Support par email",
        "Rapports mensuels",
        "1 compte administrateur"
      ],
      popular: false,
      cta: "Essayer maintenant"
    },
    {
      name: "Trimestriel",
      price: "45 000",
      period: "FCFA/trimestre",
      description: "Parfait pour les petites équipes",
      features: [
        "Tout dans Mensuel",
        "Support prioritaire",
        "Rapports hebdomadaires",
        "Jusqu'à 3 comptes administrateur",
        "Économisez 5 000 FCFA"
      ],
      popular: true,
      cta: "Choisir ce plan"
    },
    {
      name: "Annuel",
      price: "150 000",
      period: "FCFA/an",
      description: "La meilleure valeur pour les entreprises",
      features: [
        "Tout dans Trimestriel",
        "Support 24/7",
        "Rapports personnalisés",
        "Comptes administrateur illimités",
        "Économisez 78 000 FCFA",
        "Configuration personnalisée"
      ],
      popular: false,
      cta: "Économiser 34%"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {selectedPlan && (
        <PaymentMethods
          selectedPlan={selectedPlan}
          onBack={() => setSelectedPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p>Votre abonnement a été activé avec succès !</p>
        </div>
      )}
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopMate
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Se connecter</Button>
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            Tarifs simples et transparents
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Choisissez votre formule
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des fonctionnalités puissantes à des prix adaptés au marché africain. Pas de frais cachés.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-48 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium py-1 px-4 rounded-full text-center">
                  Le plus populaire
                </div>
              )}
              <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                    {plan.name === "Mensuel" && <Clock className="w-6 h-6 text-blue-500" />}
                    {plan.name === "Trimestriel" && <Zap className="w-6 h-6 text-purple-500" />}
                    {plan.name === "Annuel" && <Calendar className="w-6 h-6 text-green-500" />}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500"> {plan.period}</span>
                    {plan.popular && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Économisez jusqu'à 34%
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full py-6 text-lg ${plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-900 hover:bg-gray-800'}`}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {[
              {
                question: "Puis-je changer de formule à tout moment ?",
                answer: "Oui, vous pouvez passer d'une formule à une autre à tout moment. Le changement sera effectif à la fin de votre période de facturation en cours."
              },
              {
                question: "Y a-t-il un engagement ?",
                answer: "Aucun engagement. Vous pouvez annuler votre abonnement à tout moment sans frais supplémentaires."
              },
              {
                question: "Quels modes de paiement acceptez-vous ?",
                answer: "Nous acceptons les cartes de crédit (Visa, Mastercard, American Express) et les paiements par virement bancaire."
              },
              {
                question: "Proposez-vous une période d'essai ?",
                answer: "Oui, nous offrons un essai gratuit de 14 jours pour tous nos nouveaux utilisateurs, sans carte de crédit requise."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Prêt à booster votre entreprise ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Rejoignez des milliers d'entreprises qui font confiance à notre plateforme.
          </p>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
