"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageCircle, Package, DollarSign, X } from "lucide-react"

interface Notification {
  id: string
  type: "message" | "order" | "payment" | "system"
  title: string
  description: string
  time: string
  read: boolean
  avatar?: string
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "Nouveau message de Marie Kouassi",
      description: "Je suis intéressée par l'iPhone 15 Pro",
      time: "Il y a 5 min",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      type: "order",
      title: "Nouvelle commande #CMD-1239",
      description: "Commande de 85,000 FCFA reçue",
      time: "Il y a 15 min",
      read: false,
    },
    {
      id: "3",
      type: "payment",
      title: "Paiement confirmé",
      description: "Paiement de 45,000 FCFA via Orange Money",
      time: "Il y a 1h",
      read: true,
    },
    {
      id: "4",
      type: "system",
      title: "Campagne Facebook terminée",
      description: "Votre campagne a généré 12 conversions",
      time: "Il y a 2h",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-5 h-5 text-blue-600" />
      case "order":
        return <Package className="w-5 h-5 text-green-600" />
      case "payment":
        return <DollarSign className="w-5 h-5 text-purple-600" />
      case "system":
        return <Bell className="w-5 h-5 text-orange-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{notifications.filter((n) => !n.read).length} non lues</span>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Tout marquer comme lu
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {notification.avatar ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{notification.title.split(" ")[2]?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                        {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{notification.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
