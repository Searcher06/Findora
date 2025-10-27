import { Card, CardTitle, CardDescription } from "@/components/ui/card";
export const ItemCard = () => {
  return (
    <Card className={`w-70`}>
      <CardTitle>Findora</CardTitle>
      <CardDescription className={`font-sans`}>
        Findora is a lost and found app built for university campus
      </CardDescription>
    </Card>
  );
};
