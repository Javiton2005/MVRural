import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/button";
import { MapPin, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./villagecard.css"

export interface VillageProps {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  population: number;
  imageUrl: string;
  tags: string[];
}

interface VillageCardProps {
  village: VillageProps;
}

const VillageCard = ({ village }: VillageCardProps) => {
  return (
    <Card className="village-card">
      <div className="image-container">
        <img
          src={village.imageUrl}
          alt={village.name}
          className="village-image"
        />
      </div>
      <CardHeader>
        <div className="header-content">
          <CardTitle>{village.name}</CardTitle>
        </div>
        <CardDescription className="location">
          <MapPin className="h-3.5 w-3.5" />
          {village.location}, {village.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="card-body">
        <p className="description">{village.description}</p>
        <div className="population">
          <Users className="h-4 w-4" />
          <span>Population: {village.population.toLocaleString()}</span>
        </div>
        <div className="tags-container">
          {village.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="tag">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/village/${village.id}`} className="details-link">
          <Button variant="outline" className="details-button">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VillageCard;