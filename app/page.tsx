import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot,
  Brain,
  ImageIcon,
  Megaphone,
  MessageCircle,
  Truck,
  Clock,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">🚀 Assistant IA pour vos ventes</Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          Votre Assistant IA de Vente
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
          Une application intelligente reliée à vos comptes{" "}
          <span className="font-semibold text-green-600">WhatsApp</span> et{" "}
          <span className="font-semibold text-blue-600">Facebook</span>, qui automatise vos ventes de A à Z.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Play className="w-5 h-5 mr-2" />
              Commencer gratuitement
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Voir la démo
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Automatisez vos ventes en 7 étapes</span>
            </div>
          </div>
          <p className="text-lg text-gray-600">
            De la création du produit à la livraison, <span className="font-bold text-purple-600">ShopMate</span> gère
            tout automatiquement.
          </p>
        </div>
      </section>

      {/* Ce que ShopMate fait pour vous */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Ce que ShopMate fait pour vous</h2>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: CheckCircle,
              title: "Crée votre propre e-boutique personnalisée",
              description: "Logo, couleurs, produits - tout est personnalisé selon votre marque",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: MessageCircle,
              title: "Répond automatiquement aux questions des clients",
              description: "Sur WhatsApp, 24h/24 et 7j/7, même quand vous dormez",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: ImageIcon,
              title: "Génère des visuels publicitaires élégants",
              description: "Adaptés à votre boutique et optimisés pour vos réseaux sociaux",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Brain,
              title: "Donne des conseils marketing personnalisés",
              description: "Stratégies adaptées à votre domaine d'activité spécifique",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: Megaphone,
              title: "Lance des campagnes sponsorisées",
              description: "Sur vos réseaux sociaux avec optimisation automatique",
              color: "from-indigo-500 to-purple-500",
            },
            {
              icon: Truck,
              title: "Met en relation directe avec un livreur",
              description: "Une fois la commande validée, livraison organisée automatiquement",
              color: "from-teal-500 to-green-500",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${item.color}`}></div>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Une IA commerciale qui travaille pour vous */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-16 h-16 text-blue-600 mr-4" />
              <h2 className="text-4xl font-bold text-gray-800">Une IA commerciale qui travaille pour vous</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ShopMate est plus qu'une application, c'est un agent intelligent intégré à votre activité
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Bot,
                title: "Automatise les discussions",
                description: "Il automatise les discussions et les réponses à vos clients",
              },
              {
                icon: Clock,
                title: "Traite les commandes 24h/24",
                description: "Il traite les commandes même quand vous dormez",
              },
              {
                icon: Zap,
                title: "Personnalise vos publicités",
                description: "Il personnalise vos publicités et vos messages marketing",
              },
              {
                icon: TrendingUp,
                title: "Conseils marketing experts",
                description: "Il vous conseille en marketing et vous aide à vendre plus efficacement",
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Les avantages pour vous */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">🎯 Les avantages pour vous</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Clock,
              title: "Vous gagnez du temps",
              description: "Automatisation complète de vos processus",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: DollarSign,
              title: "Vous dépensez moins",
              description: "Publicité optimisée et ciblée automatiquement",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Users,
              title: "Vous fidélisez vos clients",
              description: "Communication constante et personnalisée",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: TrendingUp,
              title: "Vous vendez plus facilement",
              description: "Sans être tout le temps en ligne",
              color: "from-orange-500 to-red-500",
            },
          ].map((item, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">🔹 {item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Créez votre image de marque facilement</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "✅ N'ayez plus jamais de client ignoré",
              "✅ Faites de la publicité sans effort",
              "✅ Un outil pro accessible, même aux étudiants",
              "✅ Vendez automatiquement sur WhatsApp",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-lg">{benefit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Prêt à automatiser vos ventes ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'entrepreneurs qui font confiance à ShopMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <ArrowRight className="w-5 h-5 mr-2" />
                Commencer gratuitement
              </Button>
            </Link>
            <Button size="lg" className="border-white text-white hover:text-blue-600">
              Planifier une démo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ShopMate</span>
            </div>
            <p className="text-gray-400">© 2024 ShopMate. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
