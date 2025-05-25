"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  CheckCircle,
  AlertCircle,
  Package,
  Navigation,
  Star,
} from "lucide-react"

export default function DeliveriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const deliveries = [
    {
      id: "DEL-001",
      orderId: "CMD-1234",
      customer: {
        name: "Marie Kouassi",
        phone: "+241 XX XX XX XX",
        address: "Quartier Nombakélé, Libreville",
      },
      driver: {
        name: "Hassan Mbongo",
        phone: "+241 YY YY YY YY",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
      product: "iPhone 15 Pro",
      status: "in_transit",
      estimatedTime: "15 min",
      distance: "3.2 km",
      fee: 2500,
      createdAt: "2024-01-15 14:30",
    },
    {
      id: "DEL-002",
      orderId: "CMD-1235",
      customer: {
        name: "Jean Baptiste",
        phone: "+241 XX XX XX XX",
        address: "Akanda, Libreville",
      },
      driver: {
        name: "Fatou Diallo",
        phone: "+241 ZZ ZZ ZZ ZZ",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
      product: "Robe Africaine",
      status: "delivered",
      estimatedTime: "Livré",
      distance: "5.8 km",
      fee: 3000,
      createdAt: "2024-01-15 12:15",
    },
    {
      id: "DEL-003",
      orderId: "CMD-1236",
      customer: {
        name: "Paul Nzé",
        phone: "+241 XX XX XX XX",
        address: "Owendo, Libreville",
      },
      driver: {
        name: "Omar Bongo",
        phone: "+241 AA AA AA AA",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4.7,
      },
      product: "Sac à main cuir",
      status: "pending",
      estimatedTime: "En attente",
      distance: "7.1 km",
      fee: 3500,
      createdAt: "2024-01-15 16:45",
    },
    {
      id: "DEL-004",
      orderId: "CMD-1237",
      customer: {
        name: "Sylvie Obame",
        phone: "+241 XX XX XX XX",
        address: "PK5, Libreville",
      },
      driver: null,
      product: "Chaussures Nike",
      status: "searching",
      estimatedTime: "Recherche...",
      distance: "4.5 km",
      fee: 2800,
      createdAt: "2024-01-15 17:20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in_transit":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "searching":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Livré"
      case "in_transit":
        return "En cours"
      case "pending":
        return "En attente"
      case "searching":
        return "Recherche livreur"
      case "cancelled":
        return "Annulé"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "in_transit":
        return <Truck className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "searching":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.product.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Livraisons</h1>
          <p className="text-gray-600 mt-1">Suivez vos livraisons en temps réel</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle livraison
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livraisons aujourd'hui</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.length}</div>
            <p className="text-xs text-muted-foreground">+3 vs hier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.filter((d) => d.status === "in_transit").length}</div>
            <p className="text-xs text-muted-foreground">Temps moyen: 25 min</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveries.filter((d) => d.status === "delivered").length}</div>
            <p className="text-xs text-muted-foreground">Taux de réussite: 98%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus livraison</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deliveries.reduce((sum, d) => sum + d.fee, 0).toLocaleString()} FCFA
            </div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une livraison..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="searching">Recherche livreur</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="in_transit">En cours</SelectItem>
            <SelectItem value="delivered">Livré</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Plus de filtres
        </Button>
      </div>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.map((delivery) => (
          <Card key={delivery.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getStatusColor(delivery.status)}>
                      {getStatusIcon(delivery.status)}
                      <span className="ml-1">{getStatusText(delivery.status)}</span>
                    </Badge>
                    <span className="text-sm text-gray-500">#{delivery.id}</span>
                    <span className="text-sm text-gray-500">Commande #{delivery.orderId}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">CLIENT</h4>
                      <p className="font-medium">{delivery.customer.name}</p>
                      <p className="text-sm text-gray-600">{delivery.customer.phone}</p>
                      <div className="flex items-start mt-1">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{delivery.customer.address}</p>
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">LIVREUR</h4>
                      {delivery.driver ? (
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={delivery.driver.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {delivery.driver.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{delivery.driver.name}</p>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              <span className="text-sm text-gray-600">{delivery.driver.rating}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Recherche en cours...</p>
                      )}
                    </div>

                    {/* Delivery Info */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">LIVRAISON</h4>
                      <p className="font-medium">{delivery.product}</p>
                      <p className="text-sm text-gray-600">
                        {delivery.distance} • {delivery.fee.toLocaleString()} FCFA
                      </p>
                      <p className="text-sm text-gray-600">ETA: {delivery.estimatedTime}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center space-x-2">
                    {delivery.driver && (
                      <>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Navigation className="w-4 h-4" />
                        </Button>
                      </>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MapPin className="mr-2 h-4 w-4" />
                          Voir sur la carte
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Contacter le client
                        </DropdownMenuItem>
                        {delivery.status === "searching" && (
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Assigner un livreur
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Annuler la livraison
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Progress Bar for in-transit deliveries */}
              {delivery.status === "in_transit" && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progression de la livraison</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDeliveries.length === 0 && (
        <div className="text-center py-12">
          <Truck className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune livraison trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Essayez avec d'autres mots-clés" : "Aucune livraison pour le moment"}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Gérez vos livraisons efficacement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Truck className="w-6 h-6 mb-2" />
              Assigner des livreurs
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MapPin className="w-6 h-6 mb-2" />
              Optimiser les routes
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageCircle className="w-6 h-6 mb-2" />
              Notifier les clients
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
