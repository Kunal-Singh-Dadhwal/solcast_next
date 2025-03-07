"use client"

import { useState } from "react"
import Image from "next/image"
import { Wallet, CreditCard, Info, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly")
  const [paymentMethod, setPaymentMethod] = useState("crypto")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubscribe = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  return (
    <div className="max-w-5xl mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Subscriptions</h1>
      <p className="text-muted-foreground mb-8">
        Support your favorite creators with cryptocurrency and unlock exclusive content
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="plans" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
              <TabsTrigger value="active">Active Subscriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="space-y-6">
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">Choose a Plan</h2>

                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid gap-4 md:grid-cols-3">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === "monthly" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                    <Label htmlFor="monthly" className="cursor-pointer">
                      <div className="font-medium mb-1">Monthly</div>
                      <div className="text-2xl font-bold mb-1">$9.99</div>
                      <div className="text-sm text-muted-foreground">Billed monthly</div>
                    </Label>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === "quarterly" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="quarterly" id="quarterly" className="sr-only" />
                    <Label htmlFor="quarterly" className="cursor-pointer">
                      <div className="font-medium mb-1">Quarterly</div>
                      <div className="text-2xl font-bold mb-1">$24.99</div>
                      <div className="text-sm text-muted-foreground">$8.33/month, billed quarterly</div>
                    </Label>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === "yearly" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="yearly" id="yearly" className="sr-only" />
                    <Label htmlFor="yearly" className="cursor-pointer">
                      <div className="font-medium mb-1">Yearly</div>
                      <div className="text-2xl font-bold mb-1">$89.99</div>
                      <div className="text-sm text-muted-foreground">$7.50/month, billed yearly</div>
                      <div className="mt-2 text-xs inline-block bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Save 25%
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-4 md:grid-cols-2"
                >
                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "crypto" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="crypto" id="crypto" className="sr-only" />
                    <Label htmlFor="crypto" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="h-5 w-5" />
                        <span className="font-medium">Cryptocurrency</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Pay with ETH, BTC, or other cryptocurrencies
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          ETH
                        </div>
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          BTC
                        </div>
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          USDC
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${paymentMethod === "card" ? "border-primary bg-primary/5" : ""}`}
                  >
                    <RadioGroupItem value="card" id="card" className="sr-only" />
                    <Label htmlFor="card" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Credit Card</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Pay with Visa, Mastercard, or American Express
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
                        <div className="w-8 h-8 bg-red-500 rounded-sm"></div>
                        <div className="w-8 h-8 bg-green-600 rounded-sm"></div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "crypto" && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Decentralized Subscription Benefits</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        By using cryptocurrency, your subscription is stored on the blockchain, giving you true
                        ownership of your subscription NFT. This allows for transferability, privacy, and direct support
                        to creators without intermediaries taking large fees.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto">
                    Subscribe Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Complete Your Subscription</DialogTitle>
                    <DialogDescription>
                      {paymentMethod === "crypto"
                        ? "Connect your wallet to complete the transaction"
                        : "Enter your payment details to subscribe"}
                    </DialogDescription>
                  </DialogHeader>

                  {isSuccess ? (
                    <div className="py-6 flex flex-col items-center justify-center text-center">
                      <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Subscription Successful!</h3>
                      <p className="text-muted-foreground mb-4">
                        Your subscription has been activated and you now have access to premium content.
                      </p>
                      <Button className="w-full">Start Watching</Button>
                    </div>
                  ) : (
                    <>
                      {paymentMethod === "crypto" ? (
                        <div className="space-y-4 py-4">
                          <div className="flex justify-center mb-4">
                            <div className="p-4 border-2 border-dashed rounded-lg">
                              <Image
                                src="/placeholder.svg?height=150&width=150&text=QR+Code"
                                alt="Wallet QR Code"
                                width={150}
                                height={150}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">Send exactly</p>
                            <p className="text-xl font-bold">0.0045 ETH</p>
                            <p className="text-sm text-muted-foreground mt-2">to the address below</p>
                          </div>
                          <div className="flex items-center">
                            <Input
                              value="0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
                              readOnly
                              className="font-mono text-xs"
                            />
                            <Button variant="outline" size="sm" className="ml-2">
                              Copy
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Name on card</Label>
                              <Input id="name" placeholder="John Smith" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="number">Card number</Label>
                              <Input id="number" placeholder="1234 5678 9012 3456" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button onClick={handleSubscribe} disabled={isProcessing} className="w-full">
                          {isProcessing ? "Processing..." : "Complete Subscription"}
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="active">
              <div className="rounded-lg border">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Your Active Subscriptions</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage your current subscriptions to creators</p>
                </div>

                <div className="border-t">
                  {[1, 2].map((sub) => (
                    <div key={sub} className="p-4 border-b last:border-b-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={`/placeholder.svg?height=48&width=48&text=C${sub}`}
                            alt="Channel"
                            width={48}
                            height={48}
                          />
                        </div>
                        <div>
                          <div className="font-medium">Crypto Academy {sub}</div>
                          <div className="text-sm text-muted-foreground">
                            {sub === 1 ? "Monthly" : "Yearly"} subscription • Renews on{" "}
                            {sub === 1 ? "Apr 15, 2025" : "Dec 10, 2025"}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-4 text-center text-sm text-muted-foreground">
                  Your subscriptions are stored on the blockchain and can be verified at any time
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Subscription Benefits</CardTitle>
              <CardDescription>What you get with your subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Ad-Free Viewing</h4>
                  <p className="text-sm text-muted-foreground">Enjoy all content without interruptions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Exclusive Content</h4>
                  <p className="text-sm text-muted-foreground">Access subscriber-only videos and live streams</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Direct Creator Support</h4>
                  <p className="text-sm text-muted-foreground">95% of your subscription goes directly to creators</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Subscription NFT</h4>
                  <p className="text-sm text-muted-foreground">
                    Your subscription is an NFT you truly own and can transfer
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Community Access</h4>
                  <p className="text-sm text-muted-foreground">Join private communities for subscribers</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

