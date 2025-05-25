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
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  MessageCircle,
  DollarSign,
  Calendar,
  User,
} from "lucide-react"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const orders = [
    {
      id: "CMD-1234",
      customer: {
        name: "Marie Kouassi",
        email: "marie@example.com",
        phone: "+241 XX XX XX XX",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      products: [{ name: "iPhone 15 Pro", quantity: 1, price: 850000 }],
      total: 850000,
      status: "processing",
      paymentStatus: "paid",
      paymentMethod: "Mobile Money",
      createdAt: "2024-01-15 14:30",
      deliveryAddress: "Quartier Nombakélé, Libreville",
      notes: "Livraison urgente demandée",
    },
    {
      id: "CMD-1235",
      customer: {
        name: "Jean Baptiste",
        email: "jean@example.com",
        phone: "+241 YY YY YY YY",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      products: [{ name: "Robe Africaine", quantity: 2, price: 25000 }],
      total: 50000,
      status: "shipped",
      paymentStatus: "paid",
      paymentMethod: "Virement",
      createdAt: "2024-01-15 12:15",
      deliveryAddress: "Akanda, Libreville",
      notes: "",
    },
    {
      id: "CMD-1236",
      customer: {
        name: "Paul Nzé",
        email: "paul@example.com",
        phone: "+241 ZZ ZZ ZZ ZZ",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      products: [
        { name: "Sac à main cuir", quantity: 1, price: 45000 },
        { name: "Chaussures Nike", quantity: 1, price: 75000 },
      ],
      total: 120000,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "En attente",
      createdAt: "2024-01-15 16:45",
      deliveryAddress: "Owendo, Libreville",
      notes: "Client souhaite confirmation avant paiement",
    },
    {
      id: "CMD-1237",
      customer: {
        name: "Sylvie Obame",
        email: "sylvie@example.com",
        phone: "+241 AA AA AA AA",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      products: [{ name: "Montre connectée", quantity: 1, price: 80000 }],
      total: 80000,
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "Orange Money",
      createdAt: "2024-01-14 10:20",
      deliveryAddress: "PK5, Libreville",
      notes: "",
    },
    {
      id: "CMD-1238",
      customer: {
        name: "Michel Ondo",
        email: "michel@example.com",
        phone: "+241 BB BB BB BB",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      products: [{ name: "Casque Bluetooth", quantity: 1, price: 35000 }],
      total: 35000,
      status: "cancelled",
      paymentStatus: "refunded",
      paymentMethod: "MTN Money",
      createdAt: "2024-01-14 08:15",
      deliveryAddress: "Nzeng-Ayong, Libreville",
      notes: "Annulé par le client",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
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
      case "shipped":
        return "Expédié"
      case "processing":
        return "En traitement"
      case "pending":
        return "En attente"
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
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <ShoppingCart className="w-4 h-4" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Payé"
      case "pending":
        return "En attente"
      case "failed":
        return "Échec"
      case "refunded":
        return "Remboursé"
      default:
        return status
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
          <p className="text-gray-600 mt-1">Gérez toutes vos commandes clients</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">À traiter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En traitement</CardTitle>
            <Package className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "processing").length}</div>
            <p className="text-xs text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.filter((o) => o.status === "delivered").length}</div>
            <p className="text-xs text-muted-foreground">Terminées</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders
                .filter((o) => o.paymentStatus === "paid")
                .reduce((sum, o) => sum + o.total, 0)
                .toLocaleString()}{" "}
              FCFA
            </div>
            <p className="text-xs text-muted-foreground">Commandes payées</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une commande..."
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
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="processing">En traitement</SelectItem>
            <SelectItem value="shipped">Expédié</SelectItem>
            <SelectItem value="delivered">Livré</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Plus de filtres
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusText(order.status)}</span>
                    </Badge>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      <DollarSign className="w-3 h-3 mr-1" />
                      {getPaymentStatusText(order.paymentStatus)}
                    </Badge>
                    <span className="text-sm text-gray-500">#{order.id}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-2">CLIENT</h4>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {order.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-gray-600">{order.customer.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Products */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-2">PRODUITS</h4>
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {product.name} x{product.quantity}
                            </span>
                            <span className="font-medium">{product.price.toLocaleString()} FCFA</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-2">DÉTAILS</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-bold text-lg">{order.total.toLocaleString()} FCFA</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paiement:</span>
                          <span>{order.paymentMethod}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{order.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">ADRESSE DE LIVRAISON</h4>
                    <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    {order.notes && (
                      <div className="mt-2">
                        <h4 className="font-medium text-sm text-gray-500 mb-1">NOTES</h4>
                        <p className="text-sm text-gray-600 italic">{order.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    {order.status === "processing" && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Truck className="w-4 h-4 mr-1" />
                        Expédier
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Contacter client
                        </DropdownMenuItem>
                        {order.status === "pending" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirmer commande
                          </DropdownMenuItem>
                        )}
                        {order.status === "processing" && (
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Marquer comme expédié
                          </DropdownMenuItem>
                        )}
                        {order.paymentStatus === "pending" && (
                          <DropdownMenuItem>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Marquer comme payé
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Annuler commande
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

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune commande trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Essayez avec d'autres mots-clés" : "Aucune commande pour le moment"}
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>Gérez vos commandes efficacement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Package className="w-6 h-6 mb-2" />
              Traiter en lot
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Truck className="w-6 h-6 mb-2" />
              Expédier tout
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageCircle className="w-6 h-6 mb-2" />
              Notifier clients
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="w-6 h-6 mb-2" />
              Rappels de paiement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
