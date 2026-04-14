import { Heart, Coffee, Baby, Shirt } from "lucide-react";
import Button from "../ui/Button";
import Card, { CardBody } from "../ui/Card";

interface FundCardProps {
  name: string;
  description: string;
  icon: "heart" | "coffee" | "baby" | "shirt";
  href: string;
}

const icons = {
  heart: Heart,
  coffee: Coffee,
  baby: Baby,
  shirt: Shirt,
};

export default function FundCard({ name, description, icon, href }: FundCardProps) {
  const Icon = icons[icon];

  return (
    <Card>
      <CardBody className="text-center p-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-primary/10 flex items-center justify-center">
          <Icon className="w-8 h-8 text-rose-primary" />
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-3">{name}</h3>
        <p className="text-charcoal-light text-sm leading-relaxed mb-6">{description}</p>
        <Button href={href} variant="outline" size="sm">
          Donate Now
        </Button>
      </CardBody>
    </Card>
  );
}
