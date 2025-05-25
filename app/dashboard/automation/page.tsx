"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Zap,
  Bot,
  MessageCircle,
  Clock,
  Target,
  Settings,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AutomationPage() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Réponse automatique WhatsApp",
      description: "Répond automatiquement aux nouveaux messages",
      trigger: "Nouveau message",
      action: "Envoyer message de bienvenue",
      status: "active",
      executions: 1247,
      lastRun: "Il y a 5 min",
    },
    {
      id: 2,
      name: "Suivi commande automatique",
      description: "Envoie le statut de livraison aux clients",
      trigger: "Commande expédiée",
      action: "Envoyer notification",
      status: "active",
      executions: 89,
      lastRun: "Il y a 2h",
    },
    {
      id: 3,
      name: "Relance panier abandonné",
      description: "Relance les clients qui ont abandonné leur panier",
      trigger: "Panier abandonné 24h",
      action: "Envoyer message de relance",
      status: "paused",
      executions: 45,
      lastRun: "Il y a 1 jour",
    },
    {
      id: 4,
      name: "Campagne produit populaire",
      description: "Lance une campagne quand un produit devient populaire",
      trigger: "Produit tendance",
      action: "Créer campagne Facebook",
      status: "draft",
      executions: 0,
      lastRun: "Jamais",
    },
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Actif"
      case "paused":
        return "En pause"
      case "draft":
        return "Brouillon"
      default:
        return status
    }
  }

  const triggers = [
    "Nouveau message WhatsApp",
    "Nouvelle commande",
    "Commande expédiée",
    "Panier abandonné",
    "Nouveau client",
    "Produit en rupture",
    "Produit populaire",
    "Horaire programmé",
  ]

  const actions = [
    "Envoyer message WhatsApp",
    "Envoyer email",
    "Créer campagne Facebook",
    "Ajouter à une liste",
    "Notifier l'équipe",
    "Mettre à jour le stock",
    "Générer un rapport",
    "Contacter un livreur",
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automatisation</h1>
          <p className="text-gray-600 mt-1">Automatisez vos tâches répétitives avec l'IA</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle automatisation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automatisations actives</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automations.filter((a) => a.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Sur {automations.length} créées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exécutions ce mois</CardTitle>
            <Bot className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automations.reduce((sum, a) => sum + a.executions, 0)}</div>
            <p className="text-xs text-muted-foreground">+23% vs mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps économisé</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47h</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de succès</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Exécutions réussies</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Automation Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle automatisation</CardTitle>
            <CardDescription>Définissez un déclencheur et une action pour automatiser vos tâches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name">Nom de l'automatisation</Label>
                <Input id="automation-name" placeholder="Ex: Réponse automatique" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="automation-trigger">Déclencheur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un déclencheur" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggers.map((trigger) => (
                      <SelectItem key={trigger} value={trigger.toLowerCase().replace(/\s+/g, "-")}>
                        {trigger}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="automation-action">Action à exécuter</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une action" />
                </SelectTrigger>
                <SelectContent>
                  {actions.map((action) => (
                    <SelectItem key={action} value={action.toLowerCase().replace(/\s+/g, "-")}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="automation-description">Description</Label>
              <Textarea id="automation-description" placeholder="Décrivez ce que fait cette automatisation..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="automation-message">Message personnalisé (optionnel)</Label>
              <Textarea id="automation-message" placeholder="Bonjour {nom}, merci pour votre message..." rows={3} />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="automation-active" />
              <Label htmlFor="automation-active">Activer immédiatement</Label>
            </div>

            <div className="flex space-x-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Créer l'automatisation</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Automations List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mes automatisations</h2>
        {automations.map((automation) => (
          <Card key={automation.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{automation.name}</h3>
                    <Badge className={getStatusColor(automation.status)}>{getStatusText(automation.status)}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{automation.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Déclencheur</p>
                      <p className="font-medium">{automation.trigger}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Action</p>
                      <p className="font-medium">{automation.action}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Dernière exécution</p>
                      <p className="font-medium">{automation.lastRun}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{automation.executions}</p>
                    <p className="text-xs text-gray-500">Exécutions</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {automation.status === "active" ? (
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4" />
                      </Button>
                    ) : automation.status === "paused" ? (
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    ) : null}

                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Configurer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Target className="mr-2 h-4 w-4" />
                          Tester
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bot className="mr-2 h-4 w-4" />
                          Historique
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Modèles d'automatisation</CardTitle>
          <CardDescription>Utilisez ces modèles prêts à l'emploi pour démarrer rapidement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Bienvenue nouveau client",
                description: "Message de bienvenue automatique",
                icon: MessageCircle,
                color: "text-green-600",
              },
              {
                name: "Suivi de commande",
                description: "Notifications de statut automatiques",
                icon: CheckCircle,
                color: "text-blue-600",
              },
              {
                name: "Relance panier",
                description: "Récupération des paniers abandonnés",
                icon: AlertCircle,
                color: "text-orange-600",
              },
              {
                name: "Feedback client",
                description: "Demande d'avis après livraison",
                icon: Target,
                color: "text-purple-600",
              },
              {
                name: "Stock faible",
                description: "Alerte quand le stock est bas",
                icon: Bot,
                color: "text-red-600",
              },
              {
                name: "Campagne automatique",
                description: "Lance des campagnes selon les ventes",
                icon: Zap,
                color: "text-yellow-600",
              },
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <template.icon className={`w-8 h-8 ${template.color}`} />
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Utiliser ce modèle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
