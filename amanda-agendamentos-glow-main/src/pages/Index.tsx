import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-image.jpeg";

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }).max(100),
  phone: z.string().trim().min(10, { message: "Telefone inválido" }).max(20),
});

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    const message = `*Novo Agendamento - Studio Amanda Simplicio*\n\n*Nome:* ${values.name}\n*Telefone:* ${values.phone}`;
    const whatsappUrl = `https://wa.me/5583996503562?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será direcionado para finalizar seu agendamento.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-accent/30 backdrop-blur-[2px]" />
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
              Studio Amanda Simplicio
            </h1>
            <p className="text-muted-foreground text-lg">Agende seu horário</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Nome Completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Seu nome" 
                        {...field} 
                        className="bg-background/80 border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Telefone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(83) 99999-9999" 
                        {...field}
                        className="bg-background/80 border-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg shadow-lg"
                disabled={isSubmitting}
              >
                Agendar pelo WhatsApp
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Index;
