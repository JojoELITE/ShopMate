import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  MessageCircle,
  Camera,
  Brain,
  Zap,
  Plus,
  ArrowRight,
  DollarSign,
  Package,
  Target,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    {
      title: "Ventes du mois",
      value: "127,500 FCFA",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Produits actifs",
      value: "24",
      change: "+3",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Conversations",
      value: "89",
      change: "+23%",
      icon: MessageCircle,
      color: "text-purple-600",
    },
    {
      title: "Taux de conversion",
      value: "34.2%",
      change: "+5.1%",
      icon: Target,
      color: "text-orange-600",
    },
  ]

  const recentActivities = [
    {
      type: "sale",
      message: "Nouvelle vente - Smartphone Samsung",
      amount: "85,000 FCFA",
      time: "Il y a 5 min",
      status: "success",
    },
    {
      type: "message",
      message: "Nouveau message de Marie K.",
      time: "Il y a 12 min",
      status: "pending",
    },
    {
      type: "campaign",
      message: "Campagne Facebook lancée",
      time: "Il y a 1h",
      status: "active",
    },
    {
      type: "delivery",
      message: "Livraison confirmée - Commande #1234",
      time: "Il y a 2h",
      status: "success",
    },
  ]

  const quickActions = [
    {
      title: "Ajouter un produit",
      description: "Filmez et créez une fiche produit",
      icon: Camera,
      href: "/dashboard/products/new",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Créer une campagne",
      description: "Générez une stratégie marketing IA",
      icon: Brain,
      href: "/dashboard/campaigns/new",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Voir les messages",
      description: "Gérez vos conversations clients",
      icon: MessageCircle,
      href: "/dashboard/messages",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Automatiser",
      description: "Configurez vos automatisations",
      icon: Zap,
      href: "/dashboard/automation",
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Bienvenue dans votre espace ShopMate</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            IA Active
          </Badge>
          <Link href="/dashboard/products/new">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau produit
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change} ce mois
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  {activity.amount && <div className="text-sm font-semibold text-green-600">{activity.amount}</div>}
                  <div
                    className={`w-2 h-2 rounded-full ml-3 ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/activity">
              <Button variant="outline" className="w-full mt-4">
                Voir toute l'activité
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Performance des ventes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cette semaine</span>
                <span className="text-lg font-semibold">45,200 FCFA</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Objectif mensuel</span>
                <span className="text-lg font-semibold">150,000 FCFA</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full mt-4">
                Voir les analytics
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
