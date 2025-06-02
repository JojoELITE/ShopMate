'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CreditCard, Phone, QrCode, ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react"

type PaymentMethod = 'mobile_money' | 'card' | 'qr_code';

interface PaymentMethodsProps {
  selectedPlan: {
    name: string;
    price: string;
    period: string;
  } | null;
  onBack: () => void;
  onSuccess: () => void;
}

export function PaymentMethods({ selectedPlan, onBack, onSuccess }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [operator, setOperator] = useState('');

  const handlePayment = (method: PaymentMethod) => {
    setSelectedMethod(method);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Call success after showing success state
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  const handleBack = () => {
    if (selectedMethod && !isProcessing) {
      setSelectedMethod(null);
    } else if (!isProcessing) {
      onBack();
    }
  };

  if (!selectedPlan) return null;

  const PaymentMethodButton = ({ 
    icon: Icon, 
    title, 
    description, 
    method,
    iconColor = "text-blue-600" 
  }: { 
    icon: React.ComponentType<{ className?: string }>,
    title: string,
    description: string,
    method: PaymentMethod,
    iconColor?: string
  }) => (
    <Button
      variant="outline"
      className="w-full h-20 justify-start p-6 text-base hover:border-blue-500 hover:bg-blue-50/50 transition-colors"
      onClick={() => handlePayment(method)}
      type="button"
    >
      <div className={`p-2 rounded-lg ${iconColor.replace('text-', 'bg-')} bg-opacity-10 mr-4`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="text-left">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </Button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-in fade-in">
      <div className="w-full max-w-4xl px-4">
        <Card className="border-0 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="rounded-full text-white hover:bg-white/10 h-9 w-9"
                disabled={isProcessing}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <CardTitle className="text-xl font-semibold text-white">
                  Paiement - {selectedPlan.name}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {!selectedMethod ? 'Sélectionnez un mode de paiement' : 'Finalisez votre paiement'}
                </CardDescription>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mt-2">
              {selectedPlan.price} <span className="text-base font-normal text-blue-100">{selectedPlan.period}</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Paiement réussi !</h3>
                <p className="text-gray-600">Votre abonnement a été activé avec succès.</p>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                <p className="text-gray-600">Traitement de votre paiement...</p>
                <p className="text-sm text-gray-500">Veuillez patienter quelques instants.</p>
              </div>
            ) : !selectedMethod ? (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Sélectionnez un mode de paiement</h3>
                <p className="text-sm text-gray-500 mb-4">Choisissez votre méthode de paiement préférée</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div 
                    onClick={() => handlePayment('mobile_money')}
                    className="group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-purple-100 text-purple-600 group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                          <Phone className="h-6 w-6" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                      </div>
                      <div className="mt-2">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">Mobile Money</h4>
                        <p className="text-sm text-gray-500 mt-2">Orange Money, MTN Mobile Money, etc.</p>
                      </div>
                    </div>
                    <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-tl-full bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div 
                    onClick={() => handlePayment('card')}
                    className="group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="mt-2">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Carte bancaire</h4>
                        <p className="text-sm text-gray-500 mt-2">Visa, Mastercard, etc.</p>
                      </div>
                    </div>
                    <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-tl-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div 
                    onClick={() => handlePayment('qr_code')}
                    className="group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-green-100 text-green-600 group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                          <QrCode className="h-6 w-6" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                      </div>
                      <div className="mt-2">
                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">Paiement par QR Code</h4>
                        <p className="text-sm text-gray-500 mt-2">Scannez et payez en un instant</p>
                      </div>
                    </div>
                    <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-tl-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitPayment} className="space-y-6">
                {selectedMethod === 'mobile_money' && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="operator">Opérateur</Label>
                      <Select 
                        value={operator}
                        onValueChange={setOperator}
                        required
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Sélectionnez un opérateur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="orange">Orange Money</SelectItem>
                          <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                          <SelectItem value="moov">Moov Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Ex: 05 02 03 04 05"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Payer {selectedPlan.price} FCFA
                    </Button>
                  </div>
                )}

                {selectedMethod === 'card' && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Date d'expiration</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          placeholder="MM/AA"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="h-11"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                          <Input
                            id="cvv"
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="h-11 pr-14"
                            required
                          />
                          <div className="absolute right-3 top-3">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Payer {selectedPlan.price} FCFA
                    </Button>
                  </div>
                )}

                {selectedMethod === 'qr_code' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center">
                      <div className="w-56 h-56 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                        <QrCode className="h-24 w-24 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 text-center mb-4">
                        Scannez ce QR code avec votre application mobile pour effectuer le paiement
                      </p>
                      
                      <div className="w-full flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <QrCode className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Montant à payer</div>
                          <div className="text-xl font-bold text-gray-900">{selectedPlan.price} FCFA</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        type="button"
                        onClick={handleSubmitPayment}
                        className="w-full h-11 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        J'ai effectué le paiement
                      </Button>
                      
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setSelectedMethod(null)}
                        className="w-full h-11 text-base"
                      >
                        Choisir un autre moyen
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Paiement sécurisé et crypté</p>
        </div>
      </div>
    </div>
  );
}
