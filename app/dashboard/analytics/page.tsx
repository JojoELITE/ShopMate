"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  MessageCircle,
  Target,
  Download,
  Filter,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Chiffre d'affaires",
      value: "2,847,500 FCFA",
      change: "+12.5%",
      changeType: "increase",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Commandes",
      value: "156",
      change: "+8.2%",
      changeType: "increase",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Nouveaux clients",
      value: "89",
      change: "+15.3%",
      changeType: "increase",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Taux de conversion",
      value: "3.4%",
      change: "-2.1%",
      changeType: "decrease",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const salesData = [
    { day: "Lun", sales: 45000, orders: 12 },
    { day: "Mar", sales: 52000, orders: 15 },
    { day: "Mer", sales: 38000, orders: 9 },
    { day: "Jeu", sales: 67000, orders: 18 },
    { day: "Ven", sales: 89000, orders: 24 },
    { day: "Sam", sales: 125000, orders: 32 },
    { day: "Dim", sales: 98000, orders: 28 },
  ]

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 12, revenue: 1020000, growth: "+15%" },
    { name: "Robe Africaine", sales: 8, revenue: 200000, growth: "+8%" },
    { name: "Sac à main cuir", sales: 6, revenue: 270000, growth: "+12%" },
    { name: "Chaussures Nike", sales: 5, revenue: 375000, growth: "+5%" },
    { name: "Montre connectée", sales: 4, revenue: 320000, growth: "+20%" },
  ]

  const channelData = [
    { channel: "WhatsApp", visitors: 1247, conversions: 89, rate: "7.1%" },
    { channel: "Facebook", visitors: 856, conversions: 45, rate: "5.3%" },
    { channel: "Instagram", visitors: 432, conversions: 18, rate: "4.2%" },
    { channel: "Direct", visitors: 234, conversions: 12, rate: "5.1%" },
  ]

  const getChangeIcon = (changeType: string) => {
    return changeType === "increase" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getChangeColor = (changeType: string) => {
    return changeType === "increase" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Analysez les performances de votre boutique</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Dernières 24h</SelectItem>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">90 derniers jours</SelectItem>
              <SelectItem value="1y">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className={`flex items-center text-sm ${getChangeColor(stat.changeType)}`}>
                {getChangeIcon(stat.changeType)}
                <span className="ml-1">{stat.change} vs période précédente</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Évolution des ventes
            </CardTitle>
            <CardDescription>Ventes et commandes par jour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{data.day}</span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${(data.sales / 125000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{data.sales.toLocaleString()} FCFA</p>
                    <p className="text-xs text-gray-500">{data.orders} commandes</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Produits les plus vendus
            </CardTitle>
            <CardDescription>Classement par nombre de ventes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} ventes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue.toLocaleString()} FCFA</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">{product.growth}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Sources de trafic
          </CardTitle>
          <CardDescription>D'où viennent vos visiteurs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channelData.map((channel, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{channel.channel}</h4>
                  <Badge variant="outline">{channel.rate}</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Visiteurs</span>
                    <span className="font-medium">{channel.visitors}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Conversions</span>
                    <span className="font-medium">{channel.conversions}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${(channel.conversions / channel.visitors) * 100 * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Insights clients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Clients fidèles</span>
              <span className="font-medium">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Panier moyen</span>
              <span className="font-medium">18,250 FCFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Temps de réponse moyen</span>
              <span className="font-medium">2.3 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Satisfaction client</span>
              <span className="font-medium">4.8/5</span>
            </div>
          </CardContent>
        </Card>

        {/* Messages Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Messages reçus</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Réponses automatiques</span>
              <span className="font-medium">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Taux de résolution</span>
              <span className="font-medium">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Conversations actives</span>
              <span className="font-medium">156</span>
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Croissance mensuelle</span>
              <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ROI publicitaire</span>
              <Badge className="bg-blue-100 text-blue-800">340%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Taux de rétention</span>
              <Badge className="bg-purple-100 text-purple-800">68%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Score de performance</span>
              <Badge className="bg-orange-100 text-orange-800">A+</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals and Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Objectifs du mois
          </CardTitle>
          <CardDescription>Suivez vos objectifs de vente et de croissance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Chiffre d'affaires mensuel</span>
                <span className="text-sm text-gray-600">2,847,500 / 3,000,000 FCFA</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">95% de l'objectif atteint</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Nouveaux clients</span>
                <span className="text-sm text-gray-600">89 / 100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                  style={{ width: "89%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">89% de l'objectif atteint</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Commandes traitées</span>
                <span className="text-sm text-gray-600">156 / 150</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="text-xs text-green-600 mt-1">Objectif dépassé ! 🎉</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
