import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/sections/Navbar";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactUs() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // extract data form from
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const message = formData.get("message") as string;
        // Handle form submission here
        console.log("Form submitted", formData, { name, email, phone, message });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="max-w-md mx-auto px-4 py-6 space-y-6">
                {/* Contact Information Cards */}
                <div className="space-y-4">
                    <Card>
                        <CardContent className="flex items-center space-x-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-medium">puspendra@gmail.com</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center space-x-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Phone</p>
                                <p className="font-medium">+91 99890 72434</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="flex items-center space-x-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Address</p>
                                <p className="font-medium">Hydrabad, India</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your full name"
                                    required
                                    className="bg-input-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    required
                                    className="bg-input-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 XXXX XXX XXX"
                                    className="bg-input-background"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your inquiry..."
                                    required
                                    rows={4}
                                    className="bg-input-background resize-none"
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg">
                                <Send className="h-4 w-4 mr-2" />
                                Send Message
                            </Button>

                        </form>
                    </CardContent>
                </Card>

                {/* Additional Info */}
                <Card className="bg-muted/50">
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            We typically respond within 24 hours during business days.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}