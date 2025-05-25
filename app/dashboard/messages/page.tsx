"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageCircle, Send, Phone, Video, MoreHorizontal, Bot, CheckCheck, Filter } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Marie Kouassi",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Je suis intéressée par l'iPhone 15 Pro",
      timestamp: "Il y a 5 min",
      unread: 2,
      status: "online",
      platform: "WhatsApp",
    },
    {
      id: 2,
      name: "Jean Baptiste",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Quel est le prix de la robe africaine ?",
      timestamp: "Il y a 15 min",
      unread: 0,
      status: "offline",
      platform: "Facebook",
    },
    {
      id: 3,
      name: "Fatou Diallo",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Merci pour la livraison rapide !",
      timestamp: "Il y a 1h",
      unread: 0,
      status: "online",
      platform: "WhatsApp",
    },
    {
      id: 4,
      name: "Paul Mbongo",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "L'IA a répondu automatiquement",
      timestamp: "Il y a 2h",
      unread: 1,
      status: "offline",
      platform: "Facebook",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "client",
      content: "Bonjour, je suis intéressée par l'iPhone 15 Pro que vous vendez",
      timestamp: "14:30",
      status: "read",
    },
    {
      id: 2,
      sender: "ai",
      content:
        "Bonjour Marie ! Merci pour votre intérêt. L'iPhone 15 Pro est disponible au prix de 850,000 FCFA. Il est neuf et sous garantie. Souhaitez-vous plus d'informations ?",
      timestamp: "14:31",
      status: "read",
    },
    {
      id: 3,
      sender: "client",
      content: "Oui, quelle est la couleur disponible ?",
      timestamp: "14:32",
      status: "read",
    },
    {
      id: 4,
      sender: "ai",
      content:
        "Nous avons le Titane Naturel et le Titane Bleu en stock. Les deux couleurs sont très populaires. Laquelle préférez-vous ?",
      timestamp: "14:33",
      status: "read",
    },
    {
      id: 5,
      sender: "client",
      content: "Le Titane Bleu me plaît. Comment puis-je procéder au paiement ?",
      timestamp: "14:35",
      status: "read",
    },
    {
      id: 6,
      sender: "ai",
      content:
        "Parfait ! Pour le Titane Bleu, vous pouvez payer par Mobile Money ou virement bancaire. Je vous envoie les détails de paiement. La livraison est gratuite à Libreville.",
      timestamp: "14:36",
      status: "delivered",
    },
  ]

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi de message
      setNewMessage("")
    }
  }

  const getPlatformColor = (platform: string) => {
    return platform === "WhatsApp" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Gérez vos conversations clients</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800">
            <Bot className="w-3 h-3 mr-1" />
            IA Active
          </Badge>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                    selectedConversation === conversation.id ? "bg-blue-50 border-blue-500" : "border-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.status === "online" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{conversation.name}</p>
                        <div className="flex items-center space-x-1">
                          <Badge className={`text-xs ${getPlatformColor(conversation.platform)}`}>
                            {conversation.platform}
                          </Badge>
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Marie Kouassi</h3>
                      <p className="text-sm text-gray-500">En ligne • WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "client" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === "client"
                            ? "bg-gray-100 text-gray-900"
                            : message.sender === "ai"
                              ? "bg-blue-500 text-white"
                              : "bg-green-500 text-white"
                        }`}
                      >
                        {message.sender === "ai" && (
                          <div className="flex items-center mb-1">
                            <Bot className="w-3 h-3 mr-1" />
                            <span className="text-xs opacity-75">IA ShopMate</span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs opacity-75">{message.timestamp}</span>
                          {message.sender !== "client" && <CheckCheck className="w-3 h-3 opacity-75" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-32 resize-none"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>L'IA peut répondre automatiquement</span>
                  <span>Entrée pour envoyer</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Sélectionnez une conversation</h3>
                <p className="mt-1 text-sm text-gray-500">Choisissez une conversation pour commencer à discuter</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
