import { Button, Html } from "@react-email/components";

interface EmailProps {
  url: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({ url }) => {
  return (
    <Html lang="es">
      <Button href={url}>Haz clic</Button>
    </Html>
  );
};
