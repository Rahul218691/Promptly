import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { features } from "@/constants/features"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Promptly
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create stunning forms and surveys with ease. Build multi-step workflows, 
            collect responses, and analyze data - all in one powerful platform.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6 h-auto"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="p-12 text-center bg-primary/5 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of users creating amazing forms every day
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="text-lg px-8 py-6 h-auto"
          >
            Start Building Forms
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Landing