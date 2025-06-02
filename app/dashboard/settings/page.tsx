"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, CreditCard, Palette, Globe, Camera, Save, Eye, EyeOff, X } from "lucide-react"

interface SubscriptionPlansModalProps {
  onClose: () => void;
  currentPlan: string;
}

const SubscriptionPlansModal = ({ onClose, currentPlan }: SubscriptionPlansModalProps) => {
  const plans = [
    {
      id: 'basic',
      name: 'Basique',
      price: '9 900',
      period: 'mois',
      description: 'Parfait pour les petits commerces',
      features: ['Jusqu\'à 50 produits', 'Ventes en ligne', 'Rapports de base'],
      isCurrent: currentPlan === 'basic'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '25 000',
      period: 'mois',
      description: 'Pour les boutiques en pleine croissance',
      features: ['Produits illimités', 'Ventes en ligne', 'Rapports avancés', 'Support prioritaire'],
      isCurrent: currentPlan === 'pro'
    },
    {
      id: 'enterprise',
      name: 'Entreprise',
      price: '49 900',
      period: 'mois',
      description: 'Solution complète pour les entreprises',
      features: ['Tout inclus dans Pro', 'Multi-utilisateurs', 'API complète', 'Support 24/7'],
      isCurrent: currentPlan === 'enterprise'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Changer d'abonnement</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`border rounded-xl p-6 relative ${
                  plan.isCurrent 
                    ? 'ring-2 ring-blue-500 border-blue-500' 
                    : 'hover:border-blue-300 hover:shadow-lg'
                } transition-all`}
              >
                {plan.isCurrent && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Votre forfait
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-center mb-6">{plan.description}</p>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">{plan.price} FCFA</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.isCurrent 
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                  disabled={plan.isCurrent}
                >
                  {plan.isCurrent ? 'Forfait actuel' : 'Changer pour ce forfait'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('pro');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showOnlineStatus: true,
    allowMessages: true,
  })

  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérez vos préférences et configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: User, label: "Profil", id: "profile" },
                { icon: Bell, label: "Notifications", id: "notifications" },
                { icon: Shield, label: "Sécurité", id: "security" },
                { icon: CreditCard, label: "Abonnement", id: "subscription" },
                { icon: CreditCard, label: "Facturation", id: "billing" },
                { icon: Palette, label: "Apparence", id: "appearance" },
                { icon: Globe, label: "Langue & Région", id: "locale" },
              ].map((item) => (
                <Button key={item.id} variant="ghost" className="w-full justify-start">
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Informations du profil
              </CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Changer la photo
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue="+241 XX XX XX XX" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Parlez-nous de vous..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Nom de l'entreprise</Label>
                <Input id="business" defaultValue="Mon Commerce" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>Configurez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Notifications par email</Label>
                    <p className="text-sm text-gray-500">Recevez des emails pour les nouvelles commandes</p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notif">Notifications SMS</Label>
                    <p className="text-sm text-gray-500">Recevez des SMS pour les commandes urgentes</p>
                  </div>
                  <Switch
                    id="sms-notif"
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Notifications push</Label>
                    <p className="text-sm text-gray-500">Notifications dans l'application</p>
                  </div>
                  <Switch
                    id="push-notif"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-notif">Emails marketing</Label>
                    <p className="text-sm text-gray-500">Conseils et nouvelles fonctionnalités</p>
                  </div>
                  <Switch
                    id="marketing-notif"
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Sécurité
              </CardTitle>
              <CardDescription>Protégez votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Mot de passe actuel</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Changer le mot de passe</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Authentification à deux facteurs</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Sécurisez votre compte avec 2FA</p>
                    <Badge variant="outline" className="mt-1">
                      Non configuré
                    </Badge>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Clé API</h4>
                <div className="flex items-center space-x-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value="sk-1234567890abcdef"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    Copier
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Utilisez cette clé pour intégrer ShopMate à vos applications</p>
              </div>
            </CardContent>
          </Card>

          {/* Abonnement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Votre abonnement
              </CardTitle>
              <CardDescription>Gérez votre formule d'abonnement actuelle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
                    <p className="text-gray-600">Formule complète avec toutes les fonctionnalités</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-2xl font-bold text-gray-900">25 000 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></div>
                    <div className="text-sm text-green-600 font-medium">Actif</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Fonctionnalités incluses :</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Produits illimités
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Ventes en ligne
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Rapports avancés
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Support prioritaire
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Prochain renouvellement</p>
                      <p className="font-medium">1 Juillet 2025</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full sm:w-auto"
                      onClick={() => setShowSubscriptionPlans(true)}
                    >
                      Changer d'abonnement
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confidentialité */}
          <Card>
            <CardHeader>
              <CardTitle>Confidentialité</CardTitle>
              <CardDescription>Contrôlez la visibilité de vos informations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profile-visible">Profil public</Label>
                  <p className="text-sm text-gray-500">Votre profil est visible par les autres utilisateurs</p>
                </div>
                <Switch
                  id="profile-visible"
                  checked={privacy.profileVisible}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="online-status">Statut en ligne</Label>
                  <p className="text-sm text-gray-500">Afficher quand vous êtes en ligne</p>
                </div>
                <Switch
                  id="online-status"
                  checked={privacy.showOnlineStatus}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, showOnlineStatus: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allow-messages">Messages directs</Label>
                  <p className="text-sm text-gray-500">Autoriser les messages de nouveaux contacts</p>
                </div>
                <Switch
                  id="allow-messages"
                  checked={privacy.allowMessages}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Langue et Région */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Langue et Région
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">🇫🇷 Français</SelectItem>
                      <SelectItem value="en">🇺🇸 English</SelectItem>
                      <SelectItem value="es">🇪🇸 Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="africa/libreville">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/libreville">Africa/Libreville</SelectItem>
                      <SelectItem value="africa/douala">Africa/Douala</SelectItem>
                      <SelectItem value="africa/dakar">Africa/Dakar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Devise</Label>
                <Select defaultValue="xaf">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xaf">FCFA (XAF)</SelectItem>
                    <SelectItem value="eur">Euro (EUR)</SelectItem>
                    <SelectItem value="usd">Dollar US (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="w-4 h-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </div>
      
      {showSubscriptionPlans && (
        <SubscriptionPlansModal 
          onClose={() => setShowSubscriptionPlans(false)} 
          currentPlan={currentPlan}
        />
      )}
    </div>
  )
}
