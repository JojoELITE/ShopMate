"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  CreditCard,
  Truck,
  Settings,
  Plus,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Zap,
} from "lucide-react"

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState({
    whatsapp: true,
    facebook: true,
    instagram: false,
    twitter: false,
    email: true,
    payment: false,
    delivery: true,
  })

  const availableIntegrations = [
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Connectez votre compte WhatsApp Business pour automatiser les conversations",
      icon: MessageCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      status: "connected",
      category: "Communication",
    },
    {
      id: "facebook",
      name: "Facebook Pages",
      description: "Gérez vos pages Facebook et lancez des campagnes publicitaires",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      status: "connected",
      category: "Réseaux sociaux",
    },
    {
      id: "instagram",
      name: "Instagram Business",
      description: "Publiez automatiquement sur Instagram et gérez vos DM",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      status: "available",
      category: "Réseaux sociaux",
    },
    {
      id: "twitter",
      name: "Twitter/X",
      description: "Automatisez vos tweets et gérez vos mentions",
      icon: Twitter,
      color: "text-gray-900",
      bgColor: "bg-gray-100",
      status: "available",
      category: "Réseaux sociaux",
    },
    {
      id: "youtube",
      name: "YouTube",
      description: "Publiez vos vidéos produits automatiquement",
      icon: Youtube,
      color: "text-red-600",
      bgColor: "bg-red-100",
      status: "available",
      category: "Réseaux sociaux",
    },
    {
      id: "email",
      name: "Email Marketing",
      description: "Envoyez des campagnes email automatisées",
      icon: Mail,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      status: "connected",
      category: "Marketing",
    },
    {
      id: "payment",
      name: "Mobile Money",
      description: "Acceptez les paiements Orange Money, MTN Money, etc.",
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      status: "available",
      category: "Paiement",
    },
    {
      id: "delivery",
      name: "Réseau de livreurs",
      description: "Connectez-vous aux livreurs locaux pour vos livraisons",
      icon: Truck,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
      status: "connected",
      category: "Livraison",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Connecté
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Erreur
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Plus className="w-3 h-3 mr-1" />
            Disponible
          </Badge>
        )
    }
  }

  const categories = ["Tous", "Communication", "Réseaux sociaux", "Marketing", "Paiement", "Livraison"]
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const filteredIntegrations = availableIntegrations.filter(
    (integration) => selectedCategory === "Tous" || integration.category === selectedCategory,
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intégrations</h1>
          <p className="text-gray-600 mt-1">Connectez ShopMate à vos outils préférés</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-blue-100 text-blue-800">
            <Zap className="w-3 h-3 mr-1" />
            {availableIntegrations.filter((i) => i.status === "connected").length} connectées
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intégrations actives</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {availableIntegrations.filter((i) => i.status === "connected").length}
            </div>
            <p className="text-xs text-muted-foreground">Sur {availableIntegrations.length} disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages automatisés</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes lancées</CardTitle>
            <Zap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réponse</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Réponses automatiques</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg ${integration.bgColor} flex items-center justify-center`}>
                    <integration.icon className={`w-6 h-6 ${integration.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {getStatusBadge(integration.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

              {integration.status === "connected" ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Statut</span>
                    <Badge className="bg-green-100 text-green-800">Actif</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-1" />
                      Configurer
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Connecter
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuration rapide */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration rapide</CardTitle>
          <CardDescription>Configurez rapidement vos intégrations principales</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* WhatsApp */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-medium">WhatsApp Business</h4>
                <p className="text-sm text-gray-600">Numéro: +241 XX XX XX XX</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch checked={integrations.whatsapp} />
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </div>

          {/* Facebook */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Facebook className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-medium">Facebook Pages</h4>
                <p className="text-sm text-gray-600">Page: Mon Commerce</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch checked={integrations.facebook} />
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-8 h-8 text-purple-600" />
              <div>
                <h4 className="font-medium">Email Marketing</h4>
                <p className="text-sm text-gray-600">SMTP configuré</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Switch checked={integrations.email} />
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration API</CardTitle>
          <CardDescription>Intégrez ShopMate à vos applications personnalisées</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-endpoint">Point de terminaison API</Label>
            <Input id="api-endpoint" value="https://api.shopmate.com/v1" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-url">URL Webhook</Label>
            <Input id="webhook-url" placeholder="https://votre-site.com/webhook" />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Tester la connexion</Button>
            <Button>Sauvegarder</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
